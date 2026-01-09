# Code & Cook 🍳

> Onde o código encontra o sabor. Um projeto de receitas desenvolvido para explorar o ecossistema React.

![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)

## 💻 Sobre o Projeto

O **Code & Cook** é uma aplicação web de busca e visualização de receitas culinárias. O objetivo principal deste projeto foi aprofundar conhecimentos em **React.js**, **React Router**, **Hooks** e, principalmente, o **consumo e tratamento de APIs externas**.

A aplicação consome a API pública [TheMealDB](https://www.themealdb.com/).

## ⚙️ Funcionalidades

- 🔍 **Busca Inteligente:** Pesquisa de receitas por nome (aceita termos em português).
- 📂 **Categorias:** Filtragem por categorias (Massas, Carnes, Vegetarianos, etc.) com navegação estilo app no mobile.
- 📃 **Detalhes da Receita:** Exibição de foto, ingredientes, medidas e modo de preparo.
- 🎲 **Surpreenda-me:** Botão que busca uma receita aleatória.
- 📱 **Design Responsivo:** Layout totalmente adaptável para Mobile e Desktop.
- 🎨 **UI Dinâmica:** Animações de carregamento (LottieFiles), tratamento de imagens e feedback visual de erros.

## 🧠 O Grande Desafio: Internacionalização e Estratégia

Um dos maiores desafios técnicos deste projeto foi a limitação da API **TheMealDB**, que fornece dados **apenas em inglês**.

Para melhorar a UX (Experiência do Usuário) para brasileiros, implementei uma camada de serviço de tradução que atua em dois momentos:
1.  **Na Busca:** Traduz o termo digitado em português para inglês antes de consultar a API.
2.  **Na Vitrine:** Traduz os títulos das receitas para facilitar a identificação visual nos cards.

### ⚖️ Decisão de Arquitetura (Trade-off)

Como utilizo serviços de tradução gratuitos (API MyMemory) que possuem limites de requisição (*Rate Limiting*), foi necessário tomar uma decisão estratégica sobre o escopo da tradução:

* **O que é traduzido:** Termos de busca e Títulos das receitas (foco na descoberta/discovery).
* **O que é mantido em Inglês:** Lista de ingredientes e Modo de preparo.

**Por que?** Traduzir blocos grandes de texto (como as instruções de preparo) consumiria a cota da API de tradução quase instantaneamente, inviabilizando o uso do app. Optei por manter a integridade dos dados originais nestes campos, garantindo que o usuário sempre tenha acesso à receita técnica correta, mesmo que precise traduzir o passo a passo externamente.

### 🛡️ Tratamento de Erros e Graceful Degradation

Desenvolvi uma estratégia de **Graceful Degradation** (Degradação Graciosa) para casos onde a API de tradução falhe ou atinja o limite:

- **Cenário Ideal:** O usuário busca em PT-BR -> O sistema traduz -> A busca ocorre -> Os resultados aparecem em PT-BR.
- **Cenário de Limite/Erro:** Se a API de tradução falhar:
    1. O sistema **não quebra**.
    2. O termo original é utilizado na busca automaticamente.
    3. Um **aviso amigável (UI Warning)** é exibido ao usuário, sugerindo a busca pelo termo em inglês (ex: "Pie", "Cake").
    
Isso garante que, mesmo com falhas em serviços externos, o usuário continue conseguindo utilizar a aplicação.

## 🛠️ Tecnologias Utilizadas

- **React.js** (useState, useEffect, Custom Hooks)
- **React Router Dom** (Navegação SPA)
- **CSS3** (Variables, Flexbox, Grid, Media Queries, Glassmorphism)
- **Fetch API** (Consumo assíncrono e tratamento de promessas)
- **Lottie React** (Animações vetoriais JSON)

## 🚀 Como rodar o projeto

```bash
# Clone este repositório
$ git clone [https://github.com/SEU_USER/Code-e-Cook.git](https://github.com/SEU_USER/Code-e-Cook.git)

# Acesse a pasta do projeto no terminal/cmd
$ cd Code-e-Cook

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start
```

## 👨‍💻 Autor

Desenvolvido por Miguel Magalhães

[Linkedin](https://www.linkedin.com/in/miguel-magalh%C3%A3es-ads/)

[Github](https://github.com/Miguel-Magalhaes)