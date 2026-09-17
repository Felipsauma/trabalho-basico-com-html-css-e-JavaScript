/* =========================================================
   data.js — Dados estruturados da agência Pé na Estrada
   Fornece os dados de destinos, diferenciais, roteiro e depoimentos.
   ========================================================= */

var DATA = (function () {
  "use strict";

  // Ícones SVG reusáveis para os diferenciais
  var ICONS = {
    curadoria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    guias: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    suporte: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    preco: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
  };

  // Cenas adicionais reusando a assinatura viewBox de 400x300
  var SIZE = 'viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"';

  function lencoisSvg(id) {
    return (
      '<svg ' + SIZE + '>' +
      '<defs>' +
      '<linearGradient id="' + id + '-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#7fc1e3"/><stop offset="0.6" stop-color="#bce3f7"/><stop offset="1" stop-color="#ebf7fd"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-lagoon" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#0e999c"/><stop offset="1" stop-color="#1b5a7a"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect width="400" height="300" fill="url(#' + id + '-sky)"/>' +
      '<circle cx="280" cy="80" r="40" fill="#fffef7" opacity="0.6"/>' +
      // Dunas de areia branca sobrepostas com lagoas esmeraldas entre elas
      '<path d="M-20 180c80-40 160-20 220 10s120 10 220-40v150h-440Z" fill="#faf9f2"/>' +
      '<ellipse cx="140" cy="220" rx="90" ry="24" fill="url(#' + id + '-lagoon)"/>' +
      '<ellipse cx="140" cy="216" rx="84" ry="18" fill="#3ac2c4" opacity="0.4"/>' +
      '<path d="M-20 220c60-30 120-10 180 15s120 15 260-25v90h-440Z" fill="#f4f2e6"/>' +
      '<ellipse cx="300" cy="265" rx="70" ry="18" fill="url(#' + id + '-lagoon)"/>' +
      '<path d="M-20 260c80-25 150-10 210 10s110 5 230-30v60h-440Z" fill="#eae8d8"/>' +
      "</svg>"
    );
  }

  function serraSvg(id) {
    return (
      '<svg ' + SIZE + '>' +
      '<defs>' +
      '<linearGradient id="' + id + '-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#3d2c48"/><stop offset="0.6" stop-color="#694a6e"/><stop offset="1" stop-color="#93688b"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-mountain" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#2d4232"/><stop offset="1" stop-color="#18241a"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect width="400" height="300" fill="url(#' + id + '-sky)"/>' +
      '<circle cx="320" cy="90" r="30" fill="#fbebc9" opacity="0.4"/>' +
      // Montanhas serranas no horizonte
      '<path d="M-20 210L60 140l80 50 100-70 120 80 80-40v140h-440Z" fill="#243427" opacity="0.85"/>' +
      '<path d="M-20 240l100-50 120 60 110-40 110 50v80h-440Z" fill="url(#' + id + '-mountain)"/>' +
      // Pinheiros Araucária clássicos da Serra Gaúcha
      '<g transform="translate(60, 160)" fill="#162018">' +
      '<rect x="14" y="10" width="4" height="40"/>' +
      '<path d="M0 16c8-10 24-10 32 0-8 6-24 6-32 0Z"/>' +
      '<path d="M2 10c6-8 20-8 28 0-6 5-22 5-28 0Z"/>' +
      '<path d="M6 4c4-6 16-6 20 0-4 4-16 4-20 0Z"/>' +
      '</g>' +
      '<g transform="translate(300, 180)" fill="#101812">' +
      '<rect x="11" y="8" width="3" height="30"/>' +
      '<path d="M0 13c6-8 18-8 25 0-6 5-19 5-25 0Z"/>' +
      '<path d="M2 8c4-6 15-6 21 0-5 4-16 4-21 0Z"/>' +
      '</g>' +
      "</svg>"
    );
  }

  function rioSvg(id) {
    return (
      '<svg ' + SIZE + '>' +
      '<defs>' +
      '<linearGradient id="' + id + '-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#fa709a"/><stop offset="1" stop-color="#fee140"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-sea" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#103a5c"/><stop offset="1" stop-color="#0c253d"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect width="400" height="300" fill="url(#' + id + '-sky)"/>' +
      '<circle cx="200" cy="120" r="48" fill="#ffffff" opacity="0.3"/>' +
      // Pão de Açúcar e Morro da Urca silhouettes
      '<path d="M120 220c20-60 60-120 100-120s70 80 80 120Z" fill="#322247"/>' +
      '<path d="M250 220c15-40 45-70 75-70s55 50 65 70Z" fill="#241935" opacity="0.9"/>' +
      '<path d="M-10 220c30-20 60-30 90-20s50 20 70 20Z" fill="#322247"/>' +
      // Mar e ondas
      '<rect y="210" width="410" height="90" fill="url(#' + id + '-sea)"/>' +
      '<path d="M0 222c40-4 70 4 110 0s80-8 120 0 60 8 100 0 60-4 80 0v80H0Z" fill="#0d2e4a" opacity="0.6"/>' +
      '<path d="M0 240c30-3 60 3 90 0s70-6 100 0 50 6 90 0 60-3 130 0v60H0Z" fill="#0a2238" opacity="0.8"/>' +
      "</svg>"
    );
  }

  // Coleção completa de Destinos
  var DESTINOS = [
    {
      id: "noronha",
      nome: "Fernando de Noronha",
      estado: "PE",
      categoria: "praia",
      dias: "5 dias",
      preco: "5.890",
      nota: "4.9",
      avaliacoes: 124,
      tags: ["Preservação", "Mergulho", "Pôr do Sol"],
      descricao: "Um santuário ecológico de águas cristalinas, lar de golfinhos e tartarugas marinhas. Praias eleitas as mais belas do planeta com controle diário de visitantes.",
      getSvg: function (id) {
        return typeof SCENES !== "undefined" && SCENES.noronha ? SCENES.noronha(id) : "";
      }
    },
    {
      id: "chapada",
      nome: "Chapada Diamantina",
      estado: "BA",
      categoria: "aventura",
      dias: "7 dias",
      preco: "4.290",
      nota: "4.8",
      avaliacoes: 98,
      tags: ["Trilhas", "Cachoeiras", "Grutas"],
      descricao: "O paraíso nacional das trilhas e ecoturismo. Cachoeiras gigantescas de água avermelhada, grutas subterrâneas fascinantes e o pôr do sol inesquecível no Pai Inácio.",
      getSvg: function (id) {
        return typeof SCENES !== "undefined" && SCENES.chapada ? SCENES.chapada(id) : "";
      }
    },
    {
      id: "jeri",
      nome: "Jericoacoara",
      estado: "CE",
      categoria: "praia",
      dias: "4 dias",
      preco: "3.150",
      nota: "4.7",
      avaliacoes: 85,
      tags: ["Kitesurf", "Dunas", "Vila de Charme"],
      descricao: "Uma charmosa vila de pescadores pé na areia cercada por dunas móveis e lagoas ideais para relaxar nas redes flutuantes. Paraíso dos ventos e do kitesurf.",
      getSvg: function (id) {
        return typeof SCENES !== "undefined" && SCENES.jeri ? SCENES.jeri(id) : "";
      }
    },
    {
      id: "lencois",
      nome: "Lençóis Maranhenses",
      estado: "MA",
      categoria: "aventura",
      dias: "5 dias",
      preco: "3.850",
      nota: "4.9",
      avaliacoes: 112,
      tags: ["Lagoas", "Dunas Alvas", "Ecoturismo"],
      descricao: "Um impressionante deserto de areias branquíssimas pontilhado por milhares de lagoas sazonais de água doce e azulada formadas pelas chuvas do primeiro semestre.",
      getSvg: lencoisSvg
    },
    {
      id: "serra",
      nome: "Serra Gaúcha",
      estado: "RS",
      categoria: "serra",
      dias: "5 dias",
      preco: "2.980",
      nota: "4.9",
      avaliacoes: 142,
      tags: ["Gastronomia", "Enoturismo", "Clima de Serra"],
      descricao: "Charme, cultura e o melhor da gastronomia de herança italiana e alemã. Rotas vinícolas repletas de vinícolas premiadas, flores exuberantes e hospedagens coloniais.",
      getSvg: serraSvg
    },
    {
      id: "rio",
      nome: "Rio de Janeiro",
      estado: "RJ",
      categoria: "cultura",
      dias: "4 dias",
      preco: "2.450",
      nota: "4.8",
      avaliacoes: 215,
      tags: ["Samba & Bossa", "História", "Praias Urbanas"],
      descricao: "A espetacular fusão entre mata atlântica, praias icônicas e vida cultural vibrante. Vivencie a herança histórica do centro antigo ao samba de raiz da Lapa.",
      getSvg: rioSvg
    }
  ];

  // Diferenciais / Por que a Pé na Estrada
  var FEATURE_GRID = [
    {
      titulo: "Curadoria Humana",
      descricao: "Nossos consultores visitam pessoalmente cada pousada, restaurante e atrativo antes de indicá-lo para você.",
      icon: ICONS.curadoria
    },
    {
      titulo: "Guias Credenciados Nativos",
      descricao: "Trabalhamos exclusivamente com guias locais regulamentados e apaixonados por compartilhar suas raízes.",
      icon: ICONS.guias
    },
    {
      titulo: "Suporte 24/7 de Verdade",
      descricao: "Atendimento humano direto pelo WhatsApp com o mesmo especialista que montou seu roteiro, do embarque ao retorno.",
      icon: ICONS.suporte
    },
    {
      titulo: "Preço Justo e Sem Surpresas",
      descricao: "Sem taxas adicionais de conveniência ou surpresas no checkout. Valores transparentes de ponta a ponta.",
      icon: ICONS.preco
    }
  ];

  // Acordeão do Roteiro da Chapada Diamantina
  var ROTEIRO_ACCORDION = [
    {
      day: "D1",
      title: "Chegada em Lençóis & Boas-Vindas",
      content: "Recepção no aeroporto ou rodoviária de Lençóis e traslado direto para sua pousada. À noite, desfrutaremos de um briefing acolhedor com nosso guia local nativo para alinhar os detalhes da expedição, seguido por um delicioso jantar de massas e petiscos regionais."
    },
    {
      day: "D2",
      title: "Cachoeira da Fumaça & Pai Inácio",
      content: "Iniciamos a aventura com o trekking de 12 km (ida e volta) até o topo da majestosa Cachoeira da Fumaça, uma das maiores quedas livres do Brasil com 340 metros. No retorno, subiremos o Morro do Pai Inácio para contemplar o pôr do sol mais espetacular da região."
    },
    {
      day: "D3",
      title: "Gruta da Pratinha & Gruta Azul",
      content: "Dia focado em relaxamento e banho em águas azuis-turquesa de pureza incrível. Faremos flutuação de máscara e snorkel no interior da gruta e visitaremos a vizinha Gruta Azul, onde o sol penetra criando um espelho de luz inacreditável."
    },
    {
      day: "D4",
      title: "Poço Encantado & Poço Azul",
      content: "Exploraremos os poços subterrâneos mais famosos do Brasil. No Poço Encantado, contemplaremos o majestoso facho de luz solar de cor azul neon. No Poço Azul, entraremos em suas águas mornas e translúcidas para uma flutuação inesquecível."
    },
    {
      day: "D5",
      title: "Expedição Cachoeira do Buracão",
      content: "Uma jornada rumo ao sul do Parque Nacional para visitar a monumental Cachoeira do Buracão. Caminharemos por um cânion estreito e nadaremos rio acima com colete até a queda d'água circular de 85 metros de altura. Uma experiência visceral."
    },
    {
      day: "D6",
      title: "Águas Claras & Vale dos Três Picos",
      content: "Trekking de nível moderado por vales floridos até o poço de Águas Claras, uma piscina natural perfeita aos pés do imponente Três Picos. Local ideal para piquenique e banhos refrescantes em meio à natureza preservada."
    },
    {
      day: "D7",
      title: "Café Regional & Despedida",
      content: "Manhã livre para passear pelas ruas históricas de calçamento de pedra de Lençóis, adquirir lembranças, artesanato e saborear o café cultivado na própria Chapada. Traslado final ao aeroporto ou rodoviária para encerramento de nossos serviços."
    }
  ];

  // Depoimentos dos Viajantes
  var DEPOIMENTOS = [
    {
      quote: "A viagem à Chapada Diamantina foi a melhor experiência que já tive no Brasil. A pousada em Lençóis era charmosa, e nosso guia local, o seu Agenor, conhecia cada pedra e lenda da região. O suporte via WhatsApp funcionou de forma fantástica quando meu voo atrasou.",
      name: "Mariana Silva",
      location: "São Paulo / SP",
      initials: "MS"
    },
    {
      quote: "Jericoacoara foi inesquecível! A curadoria da Pé na Estrada fez toda a diferença: ficamos numa pousada boutique maravilhosa à beira-mar e fizemos passeios de buggy incríveis por caminhos alternativos que os turistas comuns nem conhecem. Atendimento humano impecável.",
      name: "Roberto Mendes",
      location: "Curitiba / PR",
      initials: "RM"
    },
    {
      quote: "Noronha já é mágica, mas com o roteiro autoral deles ficou inacreditável. Os mergulhos agendados, as trilhas controladas e as recomendações gastronômicas economizaram muito tempo de planejamento. Sentimos um respeito enorme pela preservação local.",
      name: "Letícia Costa",
      location: "Belo Horizonte / MG",
      initials: "LC"
    },
    {
      quote: "Fizemos a Serra Gaúcha fora do circuito comercial e foi espetacular. Almoços em vinícolas artesanais familiares de pequenos produtores, rotas rurais lindíssimas e hospedagem com lareira deliciosa. O atendimento da Pé na Estrada é extremamente atencioso.",
      name: "Carlos Eduardo",
      location: "Porto Alegre / RS",
      initials: "CE"
    }
  ];

  return {
    DESTINOS: DESTINOS,
    FEATURE_GRID: FEATURE_GRID,
    ROTEIRO_ACCORDION: ROTEIRO_ACCORDION,
    DEPOIMENTOS: DEPOIMENTOS
  };
})();
