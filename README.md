# 🧭 Pé na Estrada — Viagens Autorais pelo Brasil

> Uma landing page moderna, autoral e interativa para agência de turismo e expedições sob medida pelo Brasil.

![Pé na Estrada Preview](images/hero.jpg)

---

## ✨ Destaques do Projeto

- **🎨 Ilustrações Vetoriais Autorais**: Todas as ilustrações de destinos (Noronha, Jericoacoara, Chapada Diamantina, Lençóis Maranhenses, Serra Gaúcha e Rio de Janeiro) foram desenhadas em SVG vetorial puro, leves e responsivas.
- **🔐 Sistema Completo de Autenticação**:
  - Modal com abas para **Login**, **Cadastro** e **Recuperação de Senha**;
  - Medidor de força de senha em tempo real;
  - Alternador de visibilidade de senha;
  - Suporte a persistência via `localStorage` e `sessionStorage`;
  - Login social simulado (Google e Apple);
  - Conta de demonstração com preenchimento em 1 clique (Mariana Silva).
- **❤️ Roteiros Salvos (Favoritos)**:
  - Botão de favoritar em cada card com animação suave de coração;
  - Modal exclusivo com listagem dos destinos salvos pelo viajante logado;
  - Atalho de planejamento direto a partir dos favoritos.
- **🔔 Notificações Toast Flutuantes**: Feedback imediato para ações do usuário (login, logout, favoritar, solicitação de roteiros).
- **📱 Responsividade Impecável**: Adaptado para celulares, tablets e desktops (menu lateral drawer, slider com gestos touch/swipe).
- **📋 Roteiro Interativo**: Acordeão dia a dia com a programação completa da Chapada Diamantina.
- **⚡ Zero Dependências Pesadas**: Construído com HTML5 semântico, CSS3 modular com Design Tokens e JavaScript Vanilla puro.

---

## 📂 Estrutura de Arquivos

```text
├── css/
│   ├── base.css          # Reset, tokens de cores, tipografia e utilitários
│   ├── components.css    # Botões, cards, acordeão, slider, modais e formulários
│   ├── footer.css        # Estilos do rodapé
│   ├── header.css        # Cabeçalho fixo, navegação e drawer mobile
│   ├── hero.css          # Seção hero e barra de busca rápida
│   ├── responsive.css    # Breakpoints para tablets e celulares
│   └── sections.css      # Ajustes de seções split e formulário de contato
├── images/
│   └── hero.jpg          # Imagem de capa do hero
├── js/
│   ├── data.js           # Dados estruturados de destinos, diferenciais e depoimentos
│   ├── main.js           # Interatividade, estado de autenticação, favoritos e UI
│   └── scenes.js         # Ilustrações vetoriais em SVG
├── .gitignore            # Arquivos e pastas ignorados pelo Git
├── index.html            # Estrutura principal da página
└── README.md             # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Como o projeto utiliza tecnologias web nativas, não é necessário instalar dependências ou rodar comandos de build.

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/pe-na-estrada.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd pe-na-estrada
   ```
3. Abra o arquivo `index.html` diretamente no seu navegador, ou utilize extensões como o **Live Server** no VS Code.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** (Semântica acessível com ARIA, tags de diálogo nativo `<dialog>`, Open Graph)
- **CSS3** (CSS Variables, Flexbox, CSS Grid, Glassmorphism/Backdrop-filter, Keyframe animations)
- **JavaScript (ES6+)** (LocalStorage API, Dialog API, Touch events, DOM manipulation)
- **Google Fonts** (*Fraunces* para títulos elegantes e *Inter* para leitura nítida)

---

## 📄 Licença

Este projeto é disponibilizado sob a licença [MIT](LICENSE).
