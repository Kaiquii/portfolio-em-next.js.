# Como Rodar Este Projeto (Guia para Iniciantes)

Este guia foi feito para ajudar você a visualizar este projeto no seu computador, mesmo que não tenha experiência técnica prévia. Siga os passos abaixo com calma.

---

## Passo 1: Instalar as Ferramentas Necessárias

Antes de começar, seu computador precisa de um programa chamado **Node.js**. Ele é o "motor" que faz o projeto funcionar.

1. Acesse o site oficial: [nodejs.org](https://nodejs.org).
2. Baixe a versão recomendada (geralmente marcada como **LTS** - Long Term Support).
3. Instale como qualquer outro programa (clicando em "Next" ou "Próximo" até terminar).

> **Como saber se funcionou?**
> Abra o terminal do seu computador (No Windows chame de "Prompt de Comando" ou "PowerShell"; no Mac/Linux chame de "Terminal") e digite:
> `node -v`
> Se aparecerem números (ex: `v18.17.0`), está tudo pronto!

---

## Passo 2: Baixar o Projeto

Se você recebeu este projeto como um arquivo compactado (.zip):
1. Descompacte (extraia) a pasta em um local de fácil acesso, como sua **Área de Trabalho**.

Se você vai baixar via código (Git) e não sabe como, recomendo usar a opção de **Download ZIP** no botão verde "Code" aqui na página do repositório.

---

## Passo 3: Preparar o Ambiente

Agora vamos instalar as "peças" que compõem o projeto (chamadas de dependências).

1. Abra o **Terminal** ou **Prompt de Comando**.
2. Você precisa "entrar" na pasta do projeto pelo terminal.
   * Digite `cd` e dê um espaço.
   * Arraste a pasta do projeto para dentro da janela do terminal. O caminho será preenchido automaticamente.
   * Aperte **Enter**.
3. Agora que o terminal está apontando para a pasta correta, digite o seguinte comando e aperte **Enter**:

   ```bash
   npm install
4. Como Rodar o Projeto (Atenção aqui!), agora vamos ligar o servidor. No mesmo terminal, digite exatamente este comando e aperte Enter:
    
    ```bash
    npm run dev
