# 🧭 Plataforma Pé na Estrada — Viagens Autorais pelo Brasil

> Uma plataforma web avançada, interativa e autoral para agência de turismo desenvolvida com **HTML5, CSS3 e JavaScript Vanilla puros**, sem dependências externas pesadas.

![Pé na Estrada Preview](images/hero.jpg)

---

## ✨ Destaques & Recursos Avançados

- **🌓 Suporte Nativo a Modo Escuro & Claro (Dark / Light Mode)**:
  - Alternador fluido no cabeçalho e menu lateral (drawer mobile);
  - Paleta noturna terrosa desenhada especialmente para contraste visual e conforto;
  - Persistência no `localStorage` e detecção automática de `prefers-color-scheme`.
- **🔍 Busca Multidimensional, Filtros & Ordenação em Tempo Real**:
  - Busca instantânea por texto (nome, atrações, estado ou bioma);
  - Slider interativo de faixa de orçamento máximo (com atualização de valores em tempo real);
  - Ordenação rápida: *Mais Recomendados (Nota)*, *Menor Preço*, *Maior Preço* e *Menor Duração (Dias)*;
  - Filtro por categorias com chips acessíveis (Praia, Serra, Aventura, Cultura);
  - Contador de resultados ao vivo e botão de limpeza instantânea de filtros.
- **🗺️ Modal Imersivo do Roteiro & Simulador de Orçamento em Tempo Real**:
  - Exibição de banner SVG em alta resolução, galeria, o que está incluso e o que não inclui;
  - Itinerário detalhado dia a dia da expedição;
  - **Calculadora Financeira Interativa**:
    - Ajuste dinâmico do número de viajantes com cálculo de desconto de grupo (8% para 4 ou mais pessoas);
    - Seleção de categoria de hospedagem (*Pousada Familiar*, *Pousada Charme*, *Suíte Luxo*);
    - Adicionais opcionais customizados (mergulhos, voos panorâmicos, experiências gastronômicas);
    - Cálculo matemático exato com parcelamento em até 10x sem juros no cartão ou 5% de desconto à vista via PIX;
    - Ação de envio da simulação direto para o formulário de contato com todos os campos pré-preenchidos;
    - Salvamento da simulação na conta do viajante.
- **⚖️ Comparador Lado a Lado de Roteiros**:
  - Seleção de até 3 destinos para comparar simultaneamente;
  - Barra de ancoragem inferior flutuante (*Dock*) com contagem e chips removíveis;
  - Modal comparativo em grade exibindo investimento, custo médio diário, nível de esforço físico, melhor época e destaques.
- **🎨 8 Ilustrações Vetoriais Autorais em SVG Puro**:
  - Noronha, Jericoacoara, Chapada Diamantina, Lençóis Maranhenses, Serra Gaúcha, Rio de Janeiro e os novos destinos: **Amazônia & Rio Negro (AM)** e **Foz do Iguaçu (PR)**.
- **👤 Painel do Viajante & Área de Membros (Dashboard)**:
  - Histórico de simulações e propostas salvas pelo usuário com reativação em 1 clique;
  - Gestão de Roteiros Favoritos;
  - Formulário de Preferências de Viagem (estilo, ritmo e restrições alimentares);
  - Sistema de login, cadastro, recuperação de senha, conta de demonstração e login social simulado.
- **❓ FAQ Interativo com Acordeão Acessível**:
  - Dúvidas frequentes sobre logística, cancelamentos, grupos, pagamentos e passagens aéreas.
- **⚡ Refinamento de Usabilidade & Performance**:
  - Barra de progresso de leitura superior (*Scroll Indicator*);
  - Máscara dinâmica de telefone e WhatsApp `(00) 00000-0000`;
  - Compartilhamento de roteiros via Web Share API com cópia para área de transferência;
  - Notificações Toast contextuais (sucesso, aviso, erro e informação).

---

## 📂 Estrutura de Arquivos

```text
├── css/
│   ├── base.css          # Reset, tokens de cores (Light/Dark mode), tipografia e utilitários
│   ├── components.css    # Botões, simulador, comparador, chips, cards, modais e formulários
│   ├── footer.css        # Estilos do rodapé
│   ├── header.css        # Cabeçalho fixo, navegação e drawer mobile
│   ├── hero.css          # Seção hero e barra de busca rápida
│   ├── responsive.css    # Breakpoints para tablets, celulares e bottom sheets
│   └── sections.css      # Ajustes de seções split, FAQ e formulário de contato
├── images/
│   └── hero.jpg          # Imagem de capa do hero
├── js/
│   ├── data.js           # Dados estruturados de 8 destinos, opcionais, FAQ e depoimentos
│   ├── main.js           # Interatividade completa: temas, filtros, simulador, comparador e auth
│   └── scenes.js         # Ilustrações vetoriais autorais em SVG
├── .gitignore            # Arquivos e pastas ignorados pelo Git
├── index.html            # Estrutura principal da aplicação
└── README.md             # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Como o projeto utiliza tecnologias web nativas, não é necessário instalar dependências como Node.js ou rodar comandos de build.

1. Clone o repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/SEU-USUARIO/trabalho-basico-de-css-html-e-javascript.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd trabalho-basico-de-css-html-e-javascript
   ```
3. Abra o arquivo `index.html` diretamente no seu navegador, ou utilize o Live Server no VS Code.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântica estrita, ARIA accessibility, elementos nativos `<dialog>`, `<aside>`, Open Graph.
- **CSS3**: CSS Custom Properties (Design Tokens para temas Claro e Escuro), CSS Grid, Flexbox, Keyframe animations, Backdrop-filter.
- **JavaScript (ES6+)**: LocalStorage API, Dialog API, Web Share API, Clipboard API, Touch gestures, DOM reactive state.
- **Tipografia**: Google Fonts (*Fraunces* e *Inter*).

---

## 📄 Licença

Este projeto é disponibilizado sob a licença [MIT](LICENSE).

