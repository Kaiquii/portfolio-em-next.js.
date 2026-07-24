import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import {
  getGithubConfig,
  type GithubConfig,
} from "../../config/github";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ContributionDay = {
  date: string;
  contributionCount: number | null;
  level: number;
};

type ContributionWeek = {
  firstDay: string;
  contributionDays: ContributionDay[];
};

type ContributionCalendar = {
  selectedYear: number;
  totalContributions: number | null;
  weeks: ContributionWeek[];
  years: number[];
};

const contributionLevel: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const graphqlQuery = `
  query ContributionCalendar(
    $login: String!
    $from: DateTime
    $countFrom: DateTime
    $to: DateTime
  ) {
    user(login: $login) {
      allContributions: contributionsCollection {
        contributionYears
      }
      displayContributions: contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      selectedContributions: contributionsCollection(
        from: $countFrom
        to: $to
      ) {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const getDateRange = (selectedYear: number, isRollingPeriod: boolean) => {
  if (!isRollingPeriod) {
    return {
      countFrom: `${selectedYear}-01-01`,
      from: `${selectedYear}-01-01T00:00:00Z`,
      to: `${selectedYear}-12-31T23:59:59Z`,
    };
  }

  const today = new Date();
  const countFrom = new Date(
    Date.UTC(
      today.getUTCFullYear() - 1,
      today.getUTCMonth(),
      today.getUTCDate(),
    ),
  );
  const from = new Date(countFrom);
  from.setUTCDate(from.getUTCDate() - from.getUTCDay());
  const to = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      23,
      59,
      59,
    ),
  );

  return {
    countFrom: countFrom.toISOString().slice(0, 10),
    from: from.toISOString(),
    to: to.toISOString(),
  };
};

const calculateTotalContributions = (
  weeks: ContributionWeek[],
  from: string,
  to: string,
  fallback: number | null,
) => {
  const days = weeks
    .flatMap((week) => week.contributionDays)
    .filter((day) => day.date >= from && day.date <= to);

  if (days.some((day) => day.contributionCount === null)) return fallback;

  return days.reduce(
    (total, day) => total + (day.contributionCount ?? 0),
    0,
  );
};

const normalizeYears = (years: number[]) => {
  const currentYear = new Date().getFullYear();
  const validYears = years.filter(
    (year) => Number.isInteger(year) && year >= 2008 && year <= currentYear,
  );
  const earliestYear = Math.min(currentYear - 4, ...validYears);

  return Array.from(
    { length: currentYear - earliestYear + 1 },
    (_, index) => currentYear - index,
  );
};

async function requestFromGraphql(
  token: string,
  selectedYear: number,
  isRollingPeriod: boolean,
  config: GithubConfig,
): Promise<ContributionCalendar> {
  const range = getDateRange(selectedYear, isRollingPeriod);
  const response = await axios.post(
    `${config.apiUrl}/graphql`,
    {
      query: graphqlQuery,
      variables: {
        login: config.username,
        countFrom: `${range.countFrom}T00:00:00Z`,
        from: range.from,
        to: range.to,
      },
    },
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-kaiqui",
      },
      timeout: 15_000,
    },
  );

  const payload = response.data;
  const user = payload?.data?.user;
  const displayCalendar =
    user?.displayContributions?.contributionCalendar;
  const selectedCalendar =
    user?.selectedContributions?.contributionCalendar;

  if (!displayCalendar?.weeks || !selectedCalendar?.weeks) {
    throw new Error("Calendário de contribuições não encontrado");
  }

  const years = normalizeYears(
    user?.allContributions?.contributionYears ?? [],
  );
  const selectedDays = new Map<
    string,
    {
      date: string;
      contributionCount: number;
      contributionLevel: string;
    }
  >(
    selectedCalendar.weeks.flatMap(
      (week: {
        contributionDays: Array<{
          date: string;
          contributionCount: number;
          contributionLevel: string;
        }>;
      }) =>
        week.contributionDays.map(
          (day: {
            date: string;
            contributionCount: number;
            contributionLevel: string;
          }) => [day.date, day] as const,
        ),
    ),
  );
  const weeks = displayCalendar.weeks.map(
    (week: {
      firstDay: string;
      contributionDays: Array<{
        date: string;
        contributionCount: number;
        contributionLevel: string;
      }>;
    }) => ({
      firstDay: week.firstDay,
      contributionDays: week.contributionDays.map((day) => {
        const selectedDay = selectedDays.get(day.date);
        const contributionCount =
          selectedDay?.contributionCount ?? day.contributionCount;
        const contributionLevelName =
          selectedDay?.contributionLevel ?? day.contributionLevel;

        return {
          date: day.date,
          contributionCount,
          level: contributionLevel[contributionLevelName] ?? 0,
        };
      }),
    }),
  );

  return {
    selectedYear,
    totalContributions: selectedCalendar.totalContributions,
    years,
    weeks,
  };
}

const getAttribute = (tag: string, attribute: string) => {
  const match = tag.match(
    new RegExp(`${attribute}=(?:"([^"]*)"|'([^']*)')`, "i"),
  );
  return match?.[1] ?? match?.[2];
};

const getWeekStart = (date: string) => {
  const day = new Date(`${date}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() - day.getUTCDay());
  return day.toISOString().slice(0, 10);
};

const parseContributionCount = (text?: string) => {
  if (!text) return undefined;
  if (/no contributions/i.test(text)) return 0;

  const countMatch = text.match(/([\d,.]+)\s+contributions?/i);
  return countMatch
    ? Number(countMatch[1].replace(/[,\.]/g, ""))
    : undefined;
};

const extractTooltipCounts = (html: string) => {
  const counts = new Map<string, number>();
  const tooltipPattern =
    /<tool-tip\b[^>]*(?:for|data-for)=(?:"([^"]+)"|'([^']+)')[^>]*>([\s\S]*?)<\/tool-tip>/gi;

  for (const match of html.matchAll(tooltipPattern)) {
    const target = match[1] ?? match[2];
    const text = match[3].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const count = parseContributionCount(text);

    if (count !== undefined) counts.set(target, count);
  }

  return counts;
};

const getFallbackYears = (html: string) => {
  const parsedYears = [
    ...Array.from(html.matchAll(/data-year=(?:"(\d{4})"|'(\d{4})')/g)).map(
      (match) => Number(match[1] ?? match[2]),
    ),
    ...Array.from(html.matchAll(/[?&]from=(\d{4})-/g)).map((match) =>
      Number(match[1]),
    ),
  ];

  return normalizeYears(parsedYears);
};

async function requestPublicCalendar(
  selectedYear: number,
  isRollingPeriod: boolean,
  config: GithubConfig,
): Promise<ContributionCalendar> {
  const range = getDateRange(selectedYear, isRollingPeriod);
  const query = `?from=${range.countFrom}&to=${range.to.slice(0, 10)}`;
  const response = await axios.get<string>(
    `${config.webUrl}/users/${config.username}/contributions${query}`,
    {
      headers: {
        Accept: "text/html",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "portfolio-kaiqui",
      },
      responseType: "text",
      timeout: 15_000,
    },
  );

  const html = response.data;
  const dayTags =
    html.match(/<[^>]+data-date=(?:"[^"]+"|'[^']+')[^>]*>/g) ?? [];
  const tooltipCounts = extractTooltipCounts(html);
  const weeks = new Map<string, Map<string, ContributionDay>>();

  for (const tag of dayTags) {
    const date = getAttribute(tag, "data-date");
    const rawLevel = getAttribute(tag, "data-level");
    const rawCount = getAttribute(tag, "data-count");
    const dayId = getAttribute(tag, "id");
    const accessibleCount = parseContributionCount(
      getAttribute(tag, "aria-label") ??
        getAttribute(tag, "data-tooltip") ??
        getAttribute(tag, "data-tooltip-text"),
    );

    if (!date || rawLevel === undefined) continue;

    const weekStart = getWeekStart(date);
    const days = weeks.get(weekStart) ?? new Map<string, ContributionDay>();
    const level = Number(rawLevel);
    const tooltipCount = dayId ? tooltipCounts.get(dayId) : undefined;
    const contributionCount =
      rawCount !== undefined
        ? Number(rawCount)
        : tooltipCount !== undefined
          ? tooltipCount
          : accessibleCount !== undefined
            ? accessibleCount
          : level === 0
            ? 0
            : null;

    days.set(date, { date, contributionCount, level });
    weeks.set(weekStart, days);
  }

  if (weeks.size === 0) {
    throw new Error("Calendário público não encontrado");
  }

  const totalMatch = html.match(/([\d,.]+)\s+contributions?/i);
  const normalizedWeeks = Array.from(weeks.entries())
    .sort(([firstDayA], [firstDayB]) =>
      firstDayA.localeCompare(firstDayB),
    )
    .map(([firstDay, contributionDays]) => ({
      firstDay,
      contributionDays: Array.from(contributionDays.values()).sort((a, b) =>
        a.date.localeCompare(b.date),
      ),
    }));
  const fallbackTotal = totalMatch
    ? Number(totalMatch[1].replace(/[,\.]/g, ""))
    : null;

  return {
    selectedYear,
    totalContributions: isRollingPeriod
      ? calculateTotalContributions(
          normalizedWeeks,
          range.countFrom,
          range.to.slice(0, 10),
          fallbackTotal,
        )
      : fallbackTotal,
    years: getFallbackYears(html),
    weeks: normalizedWeeks,
  };
}

export async function GET(request: NextRequest) {
  const currentYear = new Date().getFullYear();
  const requestedYearParam = request.nextUrl.searchParams.get("year");
  const requestedYear = Number(requestedYearParam);
  const hasSelectedYear =
    requestedYearParam !== null &&
    Number.isInteger(requestedYear) &&
    requestedYear >= 2008 &&
    requestedYear <= currentYear;
  const selectedYear = hasSelectedYear ? requestedYear : currentYear;
  const isRollingPeriod = !hasSelectedYear;

  try {
    const token = process.env.GITHUB_TOKEN;
    const config = getGithubConfig();
    const calendar = token
      ? await requestFromGraphql(
          token,
          selectedYear,
          isRollingPeriod,
          config,
        ).catch(() =>
          requestPublicCalendar(selectedYear, isRollingPeriod, config),
        )
      : await requestPublicCalendar(selectedYear, isRollingPeriod, config);

    return NextResponse.json(calendar, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Erro ao carregar contribuições do GitHub:", error);
    return NextResponse.json(
      { error: "Não foi possível carregar as contribuições agora." },
      { status: 503 },
    );
  }
}
