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
      duracaoDias: 5,
      preco: "5.890",
      precoNum: 5890,
      nota: "4.9",
      avaliacoes: 124,
      esforco: "Moderado",
      melhorEpoca: "Agosto a Fevereiro",
      mesesIdeais: [1, 2, 8, 9, 10, 11, 12],
      coordenadas: { lat: -3.85, lon: -32.42 },
      levar: [
        "Máscara e snorkel próprios",
        "Bolsa estanque para o celular",
        "Comprovante de pagamento da TPA no celular"
      ],
      tags: ["Preservação", "Mergulho", "Pôr do Sol"],
      descricao: "Um santuário ecológico de águas cristalinas, lar de golfinhos e tartarugas marinhas. Praias eleitas as mais belas do planeta com controle diário de visitantes.",
      inclusos: [
        "Traslado privativo aeroporto / pousada",
        "Passeio Ilhatur em 4x4 exclusivo com guia credenciado",
        "Passeio de barco pelo Mar de Dentro",
        "Hospedagem com café da manhã regional",
        "Seguro viagem e condutor credenciado ICMBio"
      ],
      naoInclusos: [
        "Taxa de Preservação Ambiental (TPA)",
        "Ingresso do Parque Nacional Marinho",
        "Passagens aéreas"
      ],
      opcionais: [
        { id: "batismo", nome: "Mergulho de Batismo com cilindro e instrutor", preco: 580 },
        { id: "canoa", nome: "Canoa Havaiana ao amanhecer com golfinhos", preco: 240 },
        { id: "degustacao", nome: "Jantar degustação no Festival Gastronômico", preco: 320 }
      ],
      hospedagens: { standard: 0, boutique: 780, luxo: 1950 },
      itinerario: [
        { dia: "D1", titulo: "Chegada na Ilha e Pôr do Sol no Boldró", desc: "Boas-vindas personalizadas, check-in na pousada e fim de tarde icônico no Forte do Boldró com vista para o Morro do Pico e Dois Irmãos." },
        { dia: "D2", titulo: "Circuito Ilhatur 4x4 Completo", desc: "Sancho, Baía dos Porcos, Cacimba do Padre, Mirante dos Golfinhos e banho de mar nas piscinas naturais do Sueste." },
        { dia: "D3", titulo: "Trilha Histórica & Snorkel na Praia do Porto", desc: "Visita guiada pela Vila dos Remédios, Forte de Nossa Senhora e mergulho de observação com tartarugas e raias." },
        { dia: "D4", titulo: "Navegação Contemplativa & Entardecer no Mar", desc: "Passeio de barco acompanhando o balé dos golfinhos rotadores e parada de snorkel em águas azul-turquesa." },
        { dia: "D5", titulo: "Manhã Livre de Charme & Despedida", desc: "Tempo livre para fotos e artesanato local, seguido por transfer assistido ao aeroporto." }
      ],
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
      duracaoDias: 7,
      preco: "4.290",
      precoNum: 4290,
      nota: "4.8",
      avaliacoes: 98,
      esforco: "Intenso",
      melhorEpoca: "Maio a Outubro",
      mesesIdeais: [5, 6, 7, 8, 9, 10],
      coordenadas: { lat: -12.56, lon: -41.39 },
      levar: [
        "Bastão de caminhada para a trilha da Fumaça",
        "Roupas de secagem rápida",
        "Saco estanque para os banhos de cachoeira"
      ],
      tags: ["Trilhas", "Cachoeiras", "Grutas"],
      descricao: "O paraíso nacional das trilhas e ecoturismo. Cachoeiras gigantescas de água avermelhada, grutas subterrâneas fascinantes e o pôr do sol inesquecível no Pai Inácio.",
      inclusos: [
        "Hospedagem com café em pousadas familiares de Lençóis",
        "Guia nativo credenciado em todas as expedições",
        "Transporte 4x4 de apoio para acesso aos atrativos",
        "Lanches de trilha energéticos e seguro ecoturismo"
      ],
      naoInclusos: [
        "Bebidas alcoólicas e jantares livres",
        "Passagens aéreas ou rodoviárias até Lençóis"
      ],
      opcionais: [
        { id: "buracao_rapel", nome: "Flutuação e rapel na Gruta da Pratinha", preco: 190 },
        { id: "degustacao_cafe", nome: "Tour sensorial de cafés premiados da Chapada", preco: 180 },
        { id: "transfer_salvador", nome: "Transfer privativo Salvador ⇄ Lençóis", preco: 450 }
      ],
      hospedagens: { standard: 0, boutique: 480, luxo: 1200 },
      itinerario: [
        { dia: "D1", titulo: "Chegada em Lençóis & Boas-Vindas", desc: "Recepção e traslado para a pousada, alinhamento técnico com guia nativo e jantar regional de boas-vindas." },
        { dia: "D2", titulo: "Cachoeira da Fumaça & Pai Inácio", desc: "Trekking clássico até a queda livre de 340m e contemplação do pôr do sol inesquecível no Morro do Pai Inácio." },
        { dia: "D3", titulo: "Gruta da Pratinha & Gruta Azul", desc: "Flutuação com máscara em águas subterrâneas azuis e espelho de luz natural nas cavernas calcárias." },
        { dia: "D4", titulo: "Poço Encantado & Poço Azul", desc: "Contemplação do facho solar azul-neon no Poço Encantado e mergulho refrescante nas águas cristalinas do Poço Azul." },
        { dia: "D5", titulo: "Expedição Cachoeira do Buracão", desc: "Caminhada pelo cânion sinuoso e nado pelo rio estreito até a fantástica queda d'água de 85 metros." },
        { dia: "D6", titulo: "Águas Claras & Três Picos", desc: "Trilha leve por vales floridos e banho em piscina natural aos pés do majestoso maciço dos Três Picos." },
        { dia: "D7", titulo: "Manhã Cultural em Lençóis & Retorno", desc: "Passeio pelo calçamento de pedra do centro histórico, café artesanal e traslado para retorno." }
      ],
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
      duracaoDias: 4,
      preco: "3.150",
      precoNum: 3150,
      nota: "4.7",
      avaliacoes: 85,
      esforco: "Leve",
      melhorEpoca: "Julho a Dezembro",
      mesesIdeais: [7, 8, 9, 10, 11, 12],
      coordenadas: { lat: -2.79, lon: -40.51 },
      levar: [
        "Corta-vento leve (venta muito no segundo semestre)",
        "Sandália que possa molhar nas lagoas",
        "Lenço ou bandana para o vento com areia"
      ],
      tags: ["Kitesurf", "Dunas", "Vila de Charme"],
      descricao: "Uma charmosa vila de pescadores pé na areia cercada por dunas móveis e lagoas ideais para relaxar nas redes flutuantes. Paraíso dos ventos e do kitesurf.",
      inclusos: [
        "Traslado em 4x4 pelas dunas (Fortaleza ou Cruz ⇄ Jeri)",
        "Passeios exclusivos de buggy Litoral Leste e Oeste",
        "Pousada charmosa com café da manhã tropical",
        "Seguro viagem e acompanhamento de guia"
      ],
      naoInclusos: [
        "Taxa de Turismo Sustentável municipal",
        "Almoços e jantares livres"
      ],
      opcionais: [
        { id: "kitesurf", nome: "Aula VIP de introdução ao Kitesurf (2h)", preco: 420 },
        { id: "catamara_sunset", nome: "Passeio de Catamarã com espumante no pôr do sol", preco: 210 },
        { id: "buraco_azul_vip", nome: "Acesso à cabana lounge no Buraco Azul", preco: 150 }
      ],
      hospedagens: { standard: 0, boutique: 420, luxo: 990 },
      itinerario: [
        { dia: "D1", titulo: "Travessia das Dunas & Pôr do Sol Dourado", desc: "Chegada eletrizante em 4x4 pelas dunas e celebração do entardecer na icônica Duna do Pôr do Sol." },
        { dia: "D2", titulo: "Litoral Leste: Lagoa do Paraíso & Pedra Furada", desc: "Dia nas redes flutuantes da lagoa de água doce e caminhada ecológica até o monumento da Pedra Furada." },
        { dia: "D3", titulo: "Litoral Oeste: Mangue Seco & Tatajuba", desc: "Travessia de balsa artesanal, observação de cavalos-marinhos e descida de esquibunda nas dunas de Tatajuba." },
        { dia: "D4", titulo: "Manhã de Charme & Despedida da Vila", desc: "Caminhada pelas vielas de areia sem postes de luz, compras de artesanato e transfer de volta." }
      ],
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
      duracaoDias: 5,
      preco: "3.850",
      precoNum: 3850,
      nota: "4.9",
      avaliacoes: 112,
      esforco: "Moderado",
      melhorEpoca: "Junho a Setembro",
      mesesIdeais: [6, 7, 8, 9],
      coordenadas: { lat: -2.75, lon: -42.82 },
      levar: [
        "Sandália tipo papete para as dunas quentes",
        "Bolsa estanque para celular e documentos",
        "Boné com proteção para a nuca"
      ],
      tags: ["Lagoas", "Dunas Alvas", "Ecoturismo"],
      descricao: "Um impressionante deserto de areias branquíssimas pontilhado por milhares de lagoas sazonais de água doce e azulada formadas pelas chuvas do primeiro semestre.",
      inclusos: [
        "Traslados terrestres climatizados São Luís ⇄ Barreirinhas",
        "Expedições 4x4 jardineira no Parque Nacional",
        "Navegação em lancha voadeira pelo Rio Preguiças",
        "Pousadas selecionadas em Barreirinhas e Atins com café",
        "Guias locais experientes e seguro de viagem"
      ],
      naoInclusos: [
        "Passagens até São Luís",
        "Refeições não especificadas"
      ],
      opcionais: [
        { id: "sobrevoo_dunas", nome: "Sobrevoo panorâmico de monomotor sobre as dunas", preco: 620 },
        { id: "caiaque_preguicas", nome: "Expedição de caiaque pelo Rio Preguiças", preco: 180 },
        { id: "jantar_camarao", nome: "Jantar especial do camarão grelhado no Canto do Atins", preco: 160 }
      ],
      hospedagens: { standard: 0, boutique: 520, luxo: 1150 },
      itinerario: [
        { dia: "D1", titulo: "São Luís para Barreirinhas & Circuito Lagoa Azul", desc: "Chegada em Barreirinhas, travessia de balsa e primeira contemplação das lagoas cristalinas ao pôr do sol." },
        { dia: "D2", titulo: "Circuito Lagoa Bonita & Vista Panorâmica", desc: "Ascensão da duna de 30 metros com vista infinita para o deserto branco e banhos revigorantes." },
        { dia: "D3", titulo: "Navegação no Rio Preguiças até Atins", desc: "Passeio de lancha rápida com paradas nos macacos de Vassouras, Farol de Mandacaru e ponta de Caburé." },
        { dia: "D4", titulo: "Lagoas Secretas do Atins & Praias Fluviais", desc: "A atmosfera pacata e rústica de Atins, kitesurf e lagoas quase desertas com almoço regional." },
        { dia: "D5", titulo: "Retorno a Barreirinhas e São Luís", desc: "Travessia fluvial e retorno rodoviário confortável ao aeroporto de São Luís." }
      ],
      getSvg: lencoisSvg
    },
    {
      id: "serra",
      nome: "Serra Gaúcha",
      estado: "RS",
      categoria: "serra",
      dias: "5 dias",
      duracaoDias: 5,
      preco: "2.980",
      precoNum: 2980,
      nota: "4.9",
      avaliacoes: 142,
      esforco: "Leve",
      melhorEpoca: "Abril a Outubro (frio/vindima) ou Dezembro",
      mesesIdeais: [4, 5, 6, 7, 8, 9, 10, 12],
      coordenadas: { lat: -29.38, lon: -50.87 },
      levar: [
        "Espaço na mala para vinhos, queijos e chocolates",
        "Guarda-chuva compacto",
        "Calçado de sola firme para os cânions"
      ],
      tags: ["Gastronomia", "Enoturismo", "Clima de Serra"],
      descricao: "Charme, cultura e o melhor da gastronomia de herança italiana e alemã. Rotas vinícolas repletas de vinícolas premiadas, flores exuberantes e hospedagens coloniais.",
      inclusos: [
        "Hospedagem colonial com lareira em Gramado ou Canela",
        "Transporte privativo climatizado durante os passeios",
        "Degustação guiada em vinícolas boutique do Vale dos Vinhedos",
        "Café da manhã colonial artesanal e ingressos selecionados"
      ],
      naoInclusos: [
        "Passagens aéreas até Porto Alegre",
        "Almoços livres e consumos extras"
      ],
      opcionais: [
        { id: "sequencia_fondue", nome: "Jantar com sequência tradicional de fondue suíço", preco: 180 },
        { id: "tour_cervejas", nome: "Rota das microcervejarias artesanais com harmonização", preco: 220 },
        { id: "pisa_uva", nome: "Experiência de Vindima com pisa da uva e música", preco: 280 }
      ],
      hospedagens: { standard: 0, boutique: 420, luxo: 920 },
      itinerario: [
        { dia: "D1", titulo: "Porto Alegre à Serra & Boas-Vindas", desc: "Subida da serra pela Rota Romântica, check-in na pousada com lareira e primeiro café colonial." },
        { dia: "D2", titulo: "Vale dos Vinhedos & Bento Gonçalves", desc: "Imersão nas vinícolas pioneiras de espumantes finos com degustação conduzida por sommeliers." },
        { dia: "D3", titulo: "Canela & Cânions da Ferradura", desc: "Paisagens imponentes do Parque da Ferradura, Cascata do Caracol e parada em chocolateria tradicional." },
        { dia: "D4", titulo: "Caminhos de Pedra & Tradição dos Imigrantes", desc: "Patrimônio histórico vivo: moinhos do século XIX, queijarias coloniais e cantinas familiares." },
        { dia: "D5", titulo: "Compras de Charme em Gramado & Retorno", desc: "Manhã livre na Rua Coberta e traslado suave de volta ao aeroporto Salgado Filho." }
      ],
      getSvg: serraSvg
    },
    {
      id: "rio",
      nome: "Rio de Janeiro",
      estado: "RJ",
      categoria: "cultura",
      dias: "4 dias",
      duracaoDias: 4,
      preco: "2.450",
      precoNum: 2450,
      nota: "4.8",
      avaliacoes: 215,
      esforco: "Leve",
      melhorEpoca: "Ano inteiro (especial de Maio a Novembro)",
      mesesIdeais: [5, 6, 7, 8, 9, 10, 11],
      coordenadas: { lat: -22.91, lon: -43.2 },
      levar: [
        "Canga e roupa de banho para Ipanema e o Arpoador",
        "Cópia digital dos documentos no celular",
        "Roupa leve para a roda de samba"
      ],
      tags: ["Samba & Bossa", "História", "Praias Urbanas"],
      descricao: "A espetacular fusão entre mata atlântica, praias icônicas e vida cultural vibrante. Vivencie a herança histórica do centro antigo ao samba de raiz da Lapa.",
      inclusos: [
        "Hospedagem boutique em Santa Teresa ou na orla de Ipanema",
        "Ingressos antecipados com hora marcada para Cristo e Pão de Açúcar",
        "Walking tour cultural histórico pelo Centro e Pequena África",
        "Transporte privativo nos passeios programados com guia credenciado"
      ],
      naoInclusos: [
        "Refeições noturnas e bebidas alcoólicas",
        "Passagens aéreas até o Rio"
      ],
      opcionais: [
        { id: "samba_lapa", nome: "Noite de roda de samba com guia local na Lapa", preco: 160 },
        { id: "asa_delta", nome: "Voo duplo panorâmico de asa-delta na Pedra Bonita", preco: 680 },
        { id: "veleiro_baia", nome: "Passeio privativo de veleiro pela Baía de Guanabara", preco: 310 }
      ],
      hospedagens: { standard: 0, boutique: 380, luxo: 890 },
      itinerario: [
        { dia: "D1", titulo: "Chegada Carioca & Boemia de Santa Teresa", desc: "Recepção, subida de bondinho histórico e vista dos ateliês e casarões coloniais do bairro." },
        { dia: "D2", titulo: "Maravilhas da Cidade: Corcovado & Bondinho", desc: "Acesso matinal sem filas ao Cristo Redentor e Pão de Açúcar com vista panorâmica de 360°." },
        { dia: "D3", titulo: "Pequena África, Real Gabinete & Samba", desc: "Cais do Valongo, MAR, Confeitaria Colombo e imersão musical em roda de samba de raiz." },
        { dia: "D4", titulo: "Praias Icônicas & Pôr do Sol no Arpoador", desc: "Água de coco na praia de Ipanema, calçadão e traslado planejado para embarque." }
      ],
      getSvg: rioSvg
    },
    {
      id: "amazonia",
      nome: "Amazônia & Rio Negro",
      estado: "AM",
      categoria: "aventura",
      dias: "6 dias",
      duracaoDias: 6,
      preco: "4.680",
      precoNum: 4680,
      nota: "4.9",
      avaliacoes: 76,
      esforco: "Moderado",
      melhorEpoca: "Julho a Dezembro (praias fluviais) ou Março a Junho (cheia)",
      mesesIdeais: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      coordenadas: { lat: -2.9, lon: -60.6 },
      levar: [
        "Roupas de manga longa em cores claras",
        "Comprovante de vacina contra febre amarela",
        "Binóculo para observar aves e botos"
      ],
      tags: ["Floresta Tropical", "Botos Cor-de-Rosa", "Ecolodge de Selva"],
      descricao: "Uma imersão sensorial na maior floresta do planeta. Hospedagem em ecolodge sustentável no Rio Negro, canoagem em igapós espelhados, contemplação de botos e vivência comunitária.",
      inclusos: [
        "Traslados fluviais e terrestres a partir de Manaus",
        "Hospedagem em ecolodge de selva sustentável com pensão completa",
        "Guias nativos mateiros e biólogos de campo",
        "Passeios diurnos e focagens noturnas de canoa"
      ],
      naoInclusos: [
        "Passagens aéreas até Manaus (MAO)",
        "Bebidas alcoólicas"
      ],
      opcionais: [
        { id: "hidroaviao", nome: "Voo panorâmico de hidroavião sobre Anavilhanas", preco: 890 },
        { id: "pernoite_selva", nome: "Acampamento de sobrevivência com pernoite em rede", preco: 380 },
        { id: "teatro_amazonas", nome: "City tour histórico com visita ao Teatro Amazonas", preco: 180 }
      ],
      hospedagens: { standard: 0, boutique: 620, luxo: 1480 },
      itinerario: [
        { dia: "D1", titulo: "Navegação pelo Rio Negro & Boas-Vindas", desc: "Saída de Manaus, travessia pelas águas escuras do Rio Negro e recepção no lodge com banquete regional." },
        { dia: "D2", titulo: "Trekking Pedagógico & Botânica Amazônica", desc: "Caminhada interpretativa: árvores milenares como a sumaúma, cipós e remédios da floresta." },
        { dia: "D3", titulo: "Igapós Inundados & Pôr do Sol Espelhado", desc: "Remada silenciosa em canoas tradicionais pelo labirinto de árvores alagadas e observação de fauna." },
        { dia: "D4", titulo: "Botos Cor-de-Rosa & Comunidade Ribeirinha", desc: "Avistamento responsável e respeito aos hábitos dos botos, seguido de oficina de farinha de mandioca." },
        { dia: "D5", titulo: "Pesca Esportiva de Piranha & Focagem Noturna", desc: "Prática artesanal com varinha de bambu e expedição noturna silenciosa com lanterna pelos igarapés." },
        { dia: "D6", titulo: "Encontro das Águas & Despedida", desc: "Navegação contemplando o encontro dos rios Negro e Solimões sem se misturar, e retorno a Manaus." }
      ],
      getSvg: function (id) {
        return typeof SCENES !== "undefined" && SCENES.amazonia ? SCENES.amazonia(id) : "";
      }
    },
    {
      id: "foz",
      nome: "Foz do Iguaçu",
      estado: "PR",
      categoria: "aventura",
      dias: "4 dias",
      duracaoDias: 4,
      preco: "2.890",
      precoNum: 2890,
      nota: "4.9",
      avaliacoes: 163,
      esforco: "Leve",
      melhorEpoca: "Março a Maio ou Setembro a Novembro",
      mesesIdeais: [3, 4, 5, 9, 10, 11],
      coordenadas: { lat: -25.54, lon: -54.58 },
      levar: [
        "Capa de chuva para a passarela da Garganta do Diabo",
        "RG em bom estado ou passaporte, caso vá ao lado argentino",
        "Roupa extra para o Macuco Safari (você vai se molhar!)"
      ],
      tags: ["Cataratas Monumentais", "Biodiversidade", "Tríplice Fronteira"],
      descricao: "A força majestosa das Cataratas do Iguaçu, uma das Novas 7 Maravilhas da Natureza. Passarelas sobre as quedas, safari de barco nas correntezas do cânion e imersão no Parque das Aves.",
      inclusos: [
        "Traslado privativo aeroporto ⇄ hotel",
        "Ingressos com acesso prioritário às Cataratas e Parque das Aves",
        "Aventura náutica Macuco Safari sob as quedas d'água",
        "Guia credenciado em todos os passeios e seguro viagem"
      ],
      naoInclusos: [
        "Passagens aéreas até Foz do Iguaçu",
        "Almoços e despesas em Puerto Iguazú / Ciudad del Este"
      ],
      opcionais: [
        { id: "cataratas_argentina", nome: "Excursão de dia inteiro ao Parque Nacional Iguazú (Argentina)", preco: 320 },
        { id: "voo_helicoptero", nome: "Sobrevoo de helicóptero sobre a Garganta do Diabo", preco: 650 },
        { id: "luau_cataratas", nome: "Passeio noturno Luau das Cataratas em noites de lua cheia", preco: 240 }
      ],
      hospedagens: { standard: 0, boutique: 360, luxo: 1100 },
      itinerario: [
        { dia: "D1", titulo: "Chegada a Foz & Marco das Três Fronteiras", desc: "Check-in no hotel e entardecer cultural no Marco das Três Fronteiras com vista para o encontro dos rios Iguaçu e Paraná." },
        { dia: "D2", titulo: "Cataratas Brasileiras & Aventura Macuco Safari", desc: "Passarela panorâmica em frente à Garganta do Diabo e banho inesquecível de barco sob as quedas." },
        { dia: "D3", titulo: "Parque das Aves & Usina de Itaipu Panorâmica", desc: "Viveiros de imersão com araras e tucanos resgatados, seguido da grandiosidade da engenharia de Itaipu." },
        { dia: "D4", titulo: "Manhã Gastronômica na Fronteira & Retorno", desc: "Tempo para adquirir vinhos artesanais e azeites, seguido por transfer assistido ao aeroporto." }
      ],
      getSvg: function (id) {
        return typeof SCENES !== "undefined" && SCENES.foz ? SCENES.foz(id) : "";
      }
    }
  ];

  // Perguntas Frequentes (FAQ)
  var FAQ = [
    {
      pergunta: "Como funcionam as viagens autorais em grupo ou privativas?",
      resposta: "Nossos roteiros são desenhados para grupos enxutos (média de 6 a 12 viajantes), o que garante respeito às comunidades locais e acesso a recantos que grandes ônibus de turismo não alcançam. Você também pode solicitar a adaptação de qualquer roteiro para um formato 100% privativo para sua família ou grupo de amigos."
    },
    {
      pergunta: "Posso viajar sozinho(a) nos roteiros da Pé na Estrada?",
      resposta: "Com certeza! Cerca de 40% dos nossos viajantes embarcam desacompanhados. Você pode optar por quarto individual privativo ou solicitar a partilha de acomodação dupla com outro viajante do mesmo gênero para economizar."
    },
    {
      pergunta: "Qual é a política de cancelamento e remarcação?",
      resposta: "Sabemos que planos podem mudar. Oferecemos remarcação 100% gratuita para outra data em até 15 dias antes do embarque. Em caso de cancelamento formal, seguimos as diretrizes da Embratur e do Código de Defesa do Consumidor com processos ágeis e sem burocracia oculta."
    },
    {
      pergunta: "Quais são as formas de pagamento disponíveis?",
      resposta: "Facilitamos sua jornada com parcelamento em até 10x sem juros no cartão de crédito, ou desconto especial de 5% à vista via PIX ou transferência. Também disponibilizamos plano de pagamento programado com entrada e parcelas via boleto bancário quitadas até a data da viagem."
    },
    {
      pergunta: "O que acontece se as condições climáticas mudarem durante o roteiro?",
      resposta: "Nossos guias locais nativos acompanham a meteorologia diariamente. Caso uma cachoeira ou travessia marítima não apresente condições seguras, ativamos rotas e atrativos alternativos de mesmo nível, preservando sempre sua segurança e o encanto da viagem."
    },
    {
      pergunta: "Vocês cuidam da compra das passagens aéreas?",
      resposta: "Nossa expertise principal é a curadoria terrestre em cada destino (pousadas selecionadas, guias nativos, logística e experiências). No entanto, nossa equipe orienta os melhores voos e horários para coincidir com os traslados, podendo incluir a emissão aérea no seu pacote sob consulta."
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

  // Itens sugeridos para a mala ("O que levar"): base comum + itens por categoria.
  // Cada destino ainda tem a sua própria lista em "levar".
  var CHECKLIST = {
    essenciais: [
      "Documento oficial com foto",
      "Cartão de crédito e um pouco de dinheiro em espécie",
      "Carregador de celular e bateria portátil",
      "Remédios de uso pessoal",
      "Garrafa de água reutilizável"
    ],
    praia: [
      "Protetor solar (de preferência biodegradável)",
      "Roupas de banho",
      "Chapéu ou boné e óculos de sol",
      "Chinelo e canga",
      "Camiseta com proteção UV"
    ],
    aventura: [
      "Tênis ou bota de trilha já amaciados",
      "Mochila pequena para os passeios (20 a 30 litros)",
      "Repelente de insetos",
      "Capa de chuva leve",
      "Lanterna de cabeça"
    ],
    serra: [
      "Casaco pesado e segunda pele",
      "Cachecol, luvas e gorro",
      "Calçado fechado e confortável",
      "Hidratante labial e para a pele"
    ],
    cultura: [
      "Tênis confortável para caminhar",
      "Uma roupa mais arrumada para a noite",
      "Bolsa transversal ou pochete antifurto",
      "Protetor solar e óculos de sol"
    ]
  };

  // Perguntas do quiz "Qual viagem combina com você?"
  // Os valores de cada opção são usados no cálculo de compatibilidade (main.js, seção do quiz).
  var QUIZ = [
    {
      id: "cenario",
      pergunta: "Que paisagem faz seu coração bater mais forte?",
      opcoes: [
        { valor: "praia", titulo: "Praia e mar", desc: "Águas cristalinas e pé na areia" },
        { valor: "serra", titulo: "Serra e friozinho", desc: "Lareira, vinho e montanhas" },
        { valor: "aventura", titulo: "Natureza selvagem", desc: "Trilhas, cachoeiras e bichos" },
        { valor: "cultura", titulo: "Cidade e cultura", desc: "História, música e boa comida" }
      ]
    },
    {
      id: "ritmo",
      pergunta: "Qual ritmo de viagem combina com você?",
      opcoes: [
        { valor: "Leve", titulo: "Tranquilo", desc: "Descansar também é programa" },
        { valor: "Moderado", titulo: "Equilibrado", desc: "Passeio de manhã, tarde livre" },
        { valor: "Intenso", titulo: "Intenso", desc: "Quero aproveitar cada minuto" }
      ]
    },
    {
      id: "orcamento",
      pergunta: "Quanto você quer investir por pessoa?",
      ajuda: "Valor do roteiro em terra, sem as passagens aéreas.",
      opcoes: [
        { valor: "0-3000", titulo: "Até R$ 3.000", desc: "Viagem econômica e bem planejada" },
        { valor: "3000-4500", titulo: "De R$ 3.000 a R$ 4.500", desc: "Conforto na medida certa" },
        { valor: "4500-99999", titulo: "Acima de R$ 4.500", desc: "Uma experiência especial" },
        { valor: "", titulo: "Tanto faz", desc: "O destino importa mais que o preço" }
      ]
    },
    {
      id: "dias",
      pergunta: "Quantos dias você tem para viajar?",
      opcoes: [
        { valor: "1-4", titulo: "Até 4 dias", desc: "Um feriado prolongado" },
        { valor: "5-6", titulo: "5 ou 6 dias", desc: "Quase uma semana" },
        { valor: "7-30", titulo: "7 dias ou mais", desc: "Uma semana inteira (ou mais!)" }
      ]
    },
    {
      id: "epoca",
      pergunta: "Quando você pretende ir?",
      opcoes: [
        { valor: "12,1,2,3", titulo: "Dezembro a março", desc: "Verão e férias de começo de ano" },
        { valor: "4,5,6", titulo: "Abril a junho", desc: "Outono, fora da alta temporada" },
        { valor: "7,8,9", titulo: "Julho a setembro", desc: "Inverno e férias de julho" },
        { valor: "10,11", titulo: "Outubro ou novembro", desc: "Primavera e feriados prolongados" },
        { valor: "", titulo: "Ainda não sei", desc: "Quero ir na melhor época" }
      ]
    }
  ];

  // Ofertas da temporada: o desconto vale até o fim do mês corrente (contagem regressiva na página)
  var OFERTAS = [
    { destinoId: "lencois", desconto: 18, vagas: 4, saida: "Saídas em novembro", selo: "Mais procurada" },
    { destinoId: "serra", desconto: 12, vagas: 6, saida: "Temporada de vinhos" },
    { destinoId: "foz", desconto: 10, vagas: 3, saida: "Feriados prolongados" }
  ];

  // Artigos do "Diário de bordo" (blog da agência)
  var ARTIGOS = [
    {
      id: "noronha-primeira-vez",
      destinoId: "noronha",
      categoria: "Guia",
      titulo: "Noronha pela primeira vez: o que ninguém te conta",
      resumo: "Taxas, melhor época para mergulho e como escolher a pousada certa sem estourar o orçamento.",
      leitura: 6,
      data: "18 set 2026",
      autor: "Lívia Prado",
      corpo: [
        { h: "As taxas vêm antes da praia" },
        { p: "Quem vai a Noronha paga duas contas que não aparecem no preço da passagem: a Taxa de Preservação Ambiental (TPA), cobrada por dia de permanência, e o ingresso do Parque Nacional Marinho, válido por 10 dias. Vale pagar as duas antes do embarque para não perder tempo na fila do aeroporto." },
        { h: "Agosto a fevereiro: mar de piscina" },
        { p: "É a janela de água mais calma e transparente, com visibilidade que passa dos 30 metros. Entre março e julho chove mais e o mar de fora fica agitado, mas a ilha fica mais vazia e as pousadas, mais baratas." },
        { h: "Pousada: localização vale mais que luxo" },
        { p: "Ficar perto da Vila dos Remédios ou do Boldró resolve metade da logística. A ilha é pequena, mas o buggy alugado custa caro e o ônibus passa de 30 em 30 minutos." },
        { dica: "Reserve o Sancho para o fim da tarde: a escadaria fica livre e a luz é a mais bonita do dia." }
      ]
    },
    {
      id: "chapada-trilhas",
      destinoId: "chapada",
      categoria: "Aventura",
      titulo: "5 trilhas da Chapada Diamantina para todos os níveis",
      resumo: "Do Poço Azul ao Vale do Pati: um guia honesto de esforço, duração e quando contratar guia.",
      leitura: 8,
      data: "02 set 2026",
      autor: "Caio Nunes",
      corpo: [
        { p: "A Chapada tem trilha para quem nunca calçou uma bota e para quem quer passar três dias sem sinal de celular. O segredo é escolher pelo esforço, não pela foto mais bonita do Instagram." },
        { h: "Leves (até 2 horas)" },
        { p: "Poço do Diabo, Ribeirão do Meio e a subida do Morro do Pai Inácio. Caminhos bem marcados, com sombra e ótimos para o primeiro dia de adaptação." },
        { h: "Moderadas (meio dia)" },
        { p: "Cachoeira do Sossego e Gruta da Lapa Doce. Exigem pedras escorregadias e alguma subida, então guia local é obrigatório e muito bem-vindo." },
        { h: "Intensas (dia inteiro ou mais)" },
        { p: "Cachoeira da Fumaça por baixo e a travessia do Vale do Pati. São experiências marcantes, mas pedem preparo físico e planejamento de água e comida." },
        { dica: "Leve meia de trilha extra: atravessar rio é parte do caminho e pé molhado o dia inteiro dá bolha." }
      ]
    },
    {
      id: "serra-inverno",
      destinoId: "serra",
      categoria: "Gastronomia",
      titulo: "Serra Gaúcha no inverno: roteiro de vinhos, fondue e lareira",
      resumo: "Como dividir os dias entre Gramado, Canela e o Vale dos Vinhedos sem passar o tempo na estrada.",
      leitura: 5,
      data: "21 ago 2026",
      autor: "Lívia Prado",
      corpo: [
        { p: "Julho é alta temporada e as filas do Snowland ou do Lago Negro provam isso. Ainda assim dá para fugir da multidão com um roteiro que começa cedo e aproveita as vinícolas no meio da semana." },
        { h: "Base em Gramado, passeios em Bento" },
        { p: "Gramado tem as melhores pousadas e restaurantes, mas o Vale dos Vinhedos fica a 1h30. Reserve um dia inteiro para ele, com motorista, e escolha duas vinícolas de porte diferente: uma grande e uma familiar." },
        { h: "Fondue sem armadilha" },
        { p: "As sequências de fondue são tradição, mas os rodízios de beira de avenida são caros e mornos. Prefira as casas em ruas laterais, com reserva antecipada." },
        { dica: "Setembro e outubro têm as mesmas paisagens, metade das filas e as hortênsias começando a florir." }
      ]
    },
    {
      id: "amazonia-rio-negro",
      destinoId: "amazonia",
      categoria: "Natureza",
      titulo: "Amazônia sem clichê: como é dormir num lodge no Rio Negro",
      resumo: "Rotina na selva, o que levar e por que o Rio Negro tem menos mosquitos do que você imagina.",
      leitura: 7,
      data: "05 ago 2026",
      autor: "Caio Nunes",
      corpo: [
        { p: "A primeira surpresa é o silêncio: a 3 horas de barco de Manaus, o barulho que domina é o da floresta. A segunda é a água escura do Rio Negro, ácida o bastante para afastar boa parte dos mosquitos." },
        { h: "Um dia típico no lodge" },
        { p: "Acordar às 5h para ver os botos, café regional, caminhada com guia ribeirinho, almoço com peixe do dia, descanso na rede e focagem de jacarés depois do anoitecer." },
        { h: "Cheia ou seca?" },
        { p: "Na cheia (maio a julho) a canoa entra pela floresta alagada, os igapós. Na seca (setembro a dezembro) surgem praias de areia branca no meio do rio. As duas épocas valem a viagem." },
        { dica: "Roupa de manga comprida e clara protege do sol e dos insetos melhor que qualquer repelente." }
      ]
    }
  ];

  // Textos das políticas abertas pelos links do rodapé
  var POLITICAS = {
    privacidade: {
      titulo: "Política de privacidade",
      secoes: [
        { h: "Quais dados coletamos", p: "Nome, e-mail, telefone e as preferências de viagem que você informa nos formulários. Não pedimos documentos nem dados de cartão pelo site." },
        { h: "Para que usamos", p: "Para montar e enviar os roteiros que você pediu, responder às suas dúvidas e, se você autorizar, mandar a nossa newsletter mensal." },
        { h: "Onde ficam guardados", p: "Nesta versão de demonstração, tudo fica apenas no seu navegador (localStorage). Você pode apagar a qualquer momento limpando os dados do site." },
        { h: "Seus direitos (LGPD)", p: "Você pode pedir acesso, correção ou exclusão dos seus dados escrevendo para oi@penaestrada.com.br. Respondemos em até 15 dias." }
      ]
    },
    termos: {
      titulo: "Termos de uso",
      secoes: [
        { h: "Sobre os valores", p: "Os preços exibidos são por pessoa, em acomodação dupla, sem passagens aéreas. O valor final é confirmado pelo consultor no orçamento." },
        { h: "Disponibilidade", p: "Roteiros, hospedagens e passeios dependem de disponibilidade no momento da reserva e podem mudar por condições climáticas ou decisões dos órgãos ambientais." },
        { h: "Conteúdo do site", p: "Textos, ilustrações e roteiros são autorais da Pé na Estrada. Compartilhar é bem-vindo; copiar para uso comercial, não." }
      ]
    },
    cancelamento: {
      titulo: "Política de cancelamento",
      secoes: [
        { h: "Remarcação gratuita", p: "Você pode remarcar sem custo até 15 dias antes do embarque, uma vez por reserva, para qualquer data dentro de 12 meses." },
        { h: "Cancelamento com reembolso", p: "Até 30 dias antes: reembolso de 90%. De 29 a 15 dias: 70%. Com menos de 15 dias, o valor vira crédito para uma nova viagem." },
        { h: "Quando nós cancelamos", p: "Se o roteiro for cancelado por clima ou por decisão da agência, você escolhe entre reembolso integral ou remarcação com prioridade." }
      ]
    }
  };

  return {
    OFERTAS: OFERTAS,
    ARTIGOS: ARTIGOS,
    POLITICAS: POLITICAS,
    DESTINOS: DESTINOS,
    FEATURE_GRID: FEATURE_GRID,
    ROTEIRO_ACCORDION: ROTEIRO_ACCORDION,
    DEPOIMENTOS: DEPOIMENTOS,
    FAQ: FAQ,
    CHECKLIST: CHECKLIST,
    QUIZ: QUIZ
  };
})();
