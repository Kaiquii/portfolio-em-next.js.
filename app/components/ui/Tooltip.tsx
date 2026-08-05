"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  delay?: number;
  disabled?: boolean;
  tooltipClassName?: string;
  as?: "div" | "span";
};

type TooltipPosition = {
  arrowOffset: number;
  connectorDirection: "left" | "right";
  left: number;
  side: "top" | "bottom";
  top: number;
};

type TruncatedTextTooltipProps = {
  content: string;
  className?: string;
  id?: string;
  linesClassName: string;
  renderText?: (content: string) => ReactNode;
  renderTooltipContent?: (content: string) => ReactNode;
  tooltipClassName?: string;
};

type OverflowItemsTooltipProps = {
  className?: string;
  items: string[];
  separator?: string;
  tooltipClassName?: string;
  triggerClassName: string;
  visibleItems?: number;
};

const defaultTooltipClassName =
  "pointer-events-none fixed z-50 rounded-lg border border-pink-400/30 bg-white/95 px-3 py-2.5 text-xs leading-relaxed text-gray-700 shadow-[0_16px_35px_rgba(12,12,12,0.2)] backdrop-blur-md dark:bg-[linear-gradient(135deg,rgba(31,16,31,0.98),rgba(17,18,22,0.98))] dark:text-gray-100 dark:shadow-[0_16px_35px_rgba(0,0,0,0.45)]";

function TooltipConnector({
  direction,
  offset,
  side,
}: {
  direction: TooltipPosition["connectorDirection"];
  offset: number;
  side: TooltipPosition["side"];
}) {
  const pointsRight = direction === "right";
  const path =
    side === "top"
      ? pointsRight
        ? "M 3 2 C 4 17, 20 23, 40 23"
        : "M 45 2 C 44 17, 28 23, 8 23"
      : pointsRight
        ? "M 3 26 C 4 11, 20 5, 40 5"
        : "M 45 26 C 44 11, 28 5, 8 5";
  const endpointX = pointsRight ? 40 : 8;
  const endpointY = side === "top" ? 23 : 5;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 28"
      className={`absolute h-7 w-12 overflow-visible text-pink-400 drop-shadow-[0_0_6px_rgba(244,114,182,0.65)] ${side === "top" ? "-bottom-7" : "-top-7"}`}
      style={{ left: offset - endpointX }}
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.18"
      />
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx={endpointX} cy={endpointY} r="3.5" fill="currentColor" opacity="0.22" />
      <circle cx={endpointX} cy={endpointY} r="1.8" fill="currentColor" />
    </svg>
  );
}

export function Tooltip({
  children,
  content,
  className = "",
  delay = 450,
  disabled = false,
  tooltipClassName = "",
  as: Component = "span",
}: TooltipProps) {
  const tooltipId = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setIsVisible(false);
    setPosition(null);
  };

  const showTooltipWithDelay = (element: HTMLElement) => {
    if (disabled) return;
    setTriggerElement(element);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const updatePosition = useCallback(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip || !triggerElement) return;

    const viewportPadding = 12;
    const gap = 20;
    const trigger = triggerElement.getBoundingClientRect();
    const tooltipBounds = tooltip.getBoundingClientRect();
    const header = document.querySelector<HTMLElement>(
      '[data-tooltip-boundary="top"]',
    );
    const minimumTop = Math.max(
      viewportPadding,
      (header?.getBoundingClientRect().bottom ?? 0) + viewportPadding,
    );
    const canShowAbove = trigger.top - tooltipBounds.height - gap >= minimumTop;
    const canShowBelow =
      window.innerHeight - trigger.bottom - gap >= viewportPadding;
    const side = canShowAbove || !canShowBelow ? "top" : "bottom";
    const top =
      side === "top"
        ? Math.max(minimumTop, trigger.top - tooltipBounds.height - gap)
        : Math.max(
            minimumTop,
            Math.min(
              window.innerHeight - tooltipBounds.height - viewportPadding,
              trigger.bottom + gap,
            ),
          );
    const left = Math.min(
      Math.max(viewportPadding, trigger.left + 8),
      window.innerWidth - tooltipBounds.width - viewportPadding,
    );
    const arrowOffset = Math.min(
      Math.max(8, trigger.left + trigger.width / 2 - left),
      tooltipBounds.width - 8,
    );
    const connectorDirection =
      arrowOffset >= tooltipBounds.width / 2 ? "right" : "left";

    setPosition({ arrowOffset, connectorDirection, left, side, top });
  }, [triggerElement]);

  useLayoutEffect(() => {
    if (isVisible) updatePosition();
  }, [isVisible, updatePosition]);

  useEffect(() => {
    if (!isVisible) return;

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isVisible, updatePosition]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const tooltip =
    !disabled && isVisible && typeof document !== "undefined"
      ? createPortal(
          <span
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={`${defaultTooltipClassName} ${tooltipClassName}`.trim()}
            style={
              position
                ? ({ left: position.left, top: position.top } satisfies CSSProperties)
                : { left: 0, top: 0, visibility: "hidden" }
            }
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-3 top-0 h-px bg-linear-to-r from-transparent via-pink-400 to-transparent"
            />
            {content}
            {position && (
              <TooltipConnector
                direction={position.connectorDirection}
                offset={position.arrowOffset}
                side={position.side}
              />
            )}
          </span>,
          document.body,
        )
      : null;

  return (
    <>
      <Component
        className={`${className} ${disabled ? "" : "cursor-help"}`.trim()}
        tabIndex={disabled ? -1 : 0}
        aria-describedby={isVisible ? tooltipId : undefined}
        onMouseEnter={(event) => showTooltipWithDelay(event.currentTarget)}
        onMouseLeave={hideTooltip}
        onFocus={(event) => {
          if (disabled) return;
          setTriggerElement(event.currentTarget);
          setIsVisible(true);
        }}
        onBlur={hideTooltip}
      >
        {children}
      </Component>
      {tooltip}
    </>
  );
}

export function TruncatedTextTooltip({
  content,
  className = "",
  id,
  linesClassName,
  renderText,
  renderTooltipContent,
  tooltipClassName,
}: TruncatedTextTooltipProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const measure = () => {
      setIsTruncated(element.scrollHeight > element.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [content]);

  return (
    <Tooltip
      as="div"
      disabled={!isTruncated}
      className={className}
      tooltipClassName={tooltipClassName}
      content={renderTooltipContent?.(content) ?? content}
    >
      <p ref={textRef} id={id} className={linesClassName}>
        {renderText?.(content) ?? content}
      </p>
    </Tooltip>
  );
}

export function OverflowItemsTooltip({
  className = "",
  items,
  separator = " • ",
  tooltipClassName,
  triggerClassName,
  visibleItems = 2,
}: OverflowItemsTooltipProps) {
  const hiddenItems = items.slice(visibleItems);

  if (hiddenItems.length === 0) return null;

  return (
    <Tooltip
      className={className}
      tooltipClassName={tooltipClassName}
      content={hiddenItems.join(separator)}
    >
      <span className={triggerClassName}>+{hiddenItems.length}</span>
    </Tooltip>
  );
}
