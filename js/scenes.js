/* =========================================================
   scenes.js — ilustrações vetoriais autorais por tipo de cenário
   Cada cena devolve uma string SVG que preenche o container
   (viewBox + preserveAspectRatio="slice" = comportamento de capa).
   ========================================================= */

var SCENES = (function () {
  "use strict";

  var SIZE = 'viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"';

  function noronha(id) {
    return (
      '<svg ' + SIZE + '>' +
      '<defs>' +
      '<linearGradient id="' + id + '-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#e9b58a"/><stop offset="0.55" stop-color="#f5d7ae"/><stop offset="1" stop-color="#fbeacd"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-sea" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#6ea49b"/><stop offset="1" stop-color="#4d7f78"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect width="400" height="300" fill="url(#' + id + '-sky)"/>' +
      '<circle cx="312" cy="72" r="46" fill="#f8dcae" opacity="0.45"/>' +
      '<circle cx="312" cy="72" r="24" fill="#fdf3dc"/>' +
      '<path d="M-8 168C38 118 82 116 132 168Z" fill="#4d5a34"/>' +
      '<path d="M-8 172C40 132 84 130 132 172Z" fill="#6b7a4b" opacity="0.85"/>' +
      '<path d="M256 170C302 126 352 124 412 172Z" fill="#4d5a34"/>' +
      '<path d="M256 174C304 140 352 138 412 176Z" fill="#6b7a4b" opacity="0.8"/>' +
      '<rect y="164" width="400" height="76" fill="url(#' + id + '-sea)"/>' +
      '<path d="M0 176c34 4 60-4 96 0s58 6 96 2 62-6 100-2 52 4 108 2" stroke="#e8f2ee" stroke-width="2" fill="none" opacity="0.5"/>' +
      '<path d="M0 200c40 4 66-4 104 0s60 6 98 2 64-6 104-2 50 4 94 2" stroke="#e8f2ee" stroke-width="2" fill="none" opacity="0.34"/>' +
      '<path d="M0 214c118-16 288-16 400 0v86H0Z" fill="#f0dcb8"/>' +
      '<path d="M0 240c120-12 280-12 400 0v60H0Z" fill="#e6cd9f" opacity="0.65"/>' +
      '<path d="M78 236c-2-26 4-44 12-56" stroke="#5c4632" stroke-width="6" stroke-linecap="round" fill="none"/>' +
      '<path d="M90 178c-16-12-30-10-38-2 12 6 26 8 38 8Z" fill="#4d5a34"/>' +
      '<path d="M90 178c14-14 30-14 40-6-12 8-26 12-40 10Z" fill="#6b7a4b"/>' +
      '<path d="M90 176c-8-18-2-32 6-40 4 14 4 28 0 42Z" fill="#4d5a34"/>' +
      '<path d="M92 178c12-6 24-4 32 4-12 4-22 4-32-2Z" fill="#8a9663" opacity="0.9"/>' +
      '<path d="M120 62c6-6 12-6 18 0" stroke="#8a7a66" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M146 50c5-5 10-5 15 0" stroke="#8a7a66" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function jeri(id) {
    return (
      '<svg ' + SIZE + '>' +
      '<defs>' +
      '<linearGradient id="' + id + '-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#e8a877"/><stop offset="0.5" stop-color="#f6cf9e"/><stop offset="1" stop-color="#fce6c4"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-dune" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#f4e0bd"/><stop offset="1" stop-color="#dcbe8c"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect width="400" height="300" fill="url(#' + id + '-sky)"/>' +
      '<circle cx="120" cy="112" r="58" fill="#fbe0b2" opacity="0.5"/>' +
      '<circle cx="120" cy="112" r="30" fill="#fdf0d6"/>' +
      '<path d="M-10 128c60-34 120-30 172 6 40 28 96 26 148-6 34-22 66-24 100-8v180H-10Z" fill="#e9cfa2"/>' +
      '<path d="M-10 166c56-30 116-24 168 8 44 26 100 22 152-10 30-18 62-20 100-6v142H-10Z" fill="url(#' + id + '-dune)"/>' +
      '<ellipse cx="150" cy="206" rx="86" ry="24" fill="#5b8b83"/>' +
      '<ellipse cx="150" cy="203" rx="80" ry="20" fill="#7ba9a1"/>' +
      '<ellipse cx="150" cy="200" rx="52" ry="12" fill="#a9cdc5" opacity="0.7"/>' +
      '<path d="M-10 218c62-20 130-12 190 14 42 18 96 12 150-14 26-12 50-14 80-6v88H-10Z" fill="#d9b884"/>' +
      '<path d="M300 232c-1-20 3-34 9-44" stroke="#5c4632" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<path d="M310 188c-13-10-25-9-32-2 10 5 21 7 32 7Z" fill="#4d5a34"/>' +
      '<path d="M310 188c12-12 25-12 33-5-10 7-21 10-33 9Z" fill="#6b7a4b"/>' +
      '<path d="M310 186c-6-15-1-27 5-34 4 12 3 24 0 35Z" fill="#4d5a34"/>' +
      "</svg>"
    );
  }

  function chapada(id) {
    return (
      '<svg ' + SIZE + '>' +
      '<defs>' +
      '<linearGradient id="' + id + '-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#d9c39a"/><stop offset="1" stop-color="#f3e6cb"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-fall" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dbeae6"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect width="400" height="300" fill="url(#' + id + '-sky)"/>' +
      '<circle cx="88" cy="58" r="52" fill="#fbebc9" opacity="0.55"/>' +
      '<path d="M-10 300V74c34 8 58 32 74 62 18 34 26 72 30 110 2 22 2 40 0 54Z" fill="#8a5a3a"/>' +
      '<path d="M-10 300V104c26 10 44 32 56 58 14 30 20 60 22 92 1 16 1 32 0 46Z" fill="#6f452b"/>' +
      '<path d="M410 300V92c-36 10-62 34-78 66-18 34-26 74-30 112-2 20-2 34 0 30Z" fill="#8a5a3a"/>' +
      '<path d="M410 300V122c-28 12-48 34-60 62-14 32-20 62-22 90-1 14-1 26 0 26Z" fill="#6f452b"/>' +
      '<path d="M180 122h16v98h-16Z" fill="url(#' + id + '-fall)"/>' +
      '<path d="M206 138h11v82h-11Z" fill="url(#' + id + '-fall)" opacity="0.72"/>' +
      '<path d="M162 146h9v74h-9Z" fill="url(#' + id + '-fall)" opacity="0.55"/>' +
      '<ellipse cx="188" cy="234" rx="86" ry="26" fill="#4f7f78"/>' +
      '<ellipse cx="188" cy="230" rx="78" ry="21" fill="#6ea49b"/>' +
      '<ellipse cx="188" cy="226" rx="46" ry="12" fill="#b6d6cf" opacity="0.75"/>' +
      '<path d="M0 246c46-10 96-8 140 4 40 10 82 12 130 4 48-8 90-8 130 4v42H0Z" fill="#7d6b4a"/>' +
      '<path d="M0 268c60-12 120-6 178 10 58 16 140 12 222-8v30H0Z" fill="#5f5138"/>' +
      '    <path d="M118 208c-8-24-2-44 12-58" stroke="#4d5a34" stroke-width="4" stroke-linecap="round" fill="none"/>' +
            '<path d="M130 150c-14-8-26-6-32 0 10 6 22 8 32 6Z" fill="#4d5a34"/>' +
            "</svg>"
          );
        }

  function amazonia(id) {
    return (
      '<svg ' + SIZE + '>' +
      '<defs>' +
      '<linearGradient id="' + id + '-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#2a4736"/><stop offset="0.6" stop-color="#4d7857"/><stop offset="1" stop-color="#8bb38d"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-river" x1="0" y1="0" x2="1" y2="0.8">' +
      '<stop offset="0" stop-color="#14261c"/><stop offset="0.5" stop-color="#1e3b2c"/><stop offset="1" stop-color="#14261c"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-mist" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect width="400" height="300" fill="url(#' + id + '-sky)"/>' +
      '<circle cx="200" cy="110" r="45" fill="#fdeec2" opacity="0.35"/>' +
      // Copa da floresta densa ao fundo
      '<path d="M-20 160c30-18 60-12 90 2s70-15 110-2 80-20 130 5 70-12 110 5v130h-440Z" fill="#1b3826" opacity="0.85"/>' +
      // Névoa matinal amazônica
      '<rect y="125" width="400" height="40" fill="url(#' + id + '-mist)"/>' +
      // Rio Negro serpenteando
      '<path d="M-10 180c100 10 150-15 220 20s110 50 190 35v65H-10Z" fill="url(#' + id + '-river)"/>' +
      '<path d="M20 210c80 8 130-10 180 15s100 35 180 20" stroke="#48785c" stroke-width="2" fill="none" opacity="0.4"/>' +
      // Margem e vegetação frontal (igapó)
      '<path d="M-20 230c60-15 130 5 180 35s120 15 260-10v45h-440Z" fill="#0d1f14"/>' +
      // Vitória-régia flutuando
      '<ellipse cx="140" cy="245" rx="36" ry="12" fill="#2d5e3c" stroke="#1d4028" stroke-width="2"/>' +
      '<ellipse cx="230" cy="265" rx="48" ry="14" fill="#2d5e3c" stroke="#1d4028" stroke-width="2"/>' +
      '<ellipse cx="320" cy="250" rx="30" ry="10" fill="#244d31"/>' +
      // Silhueta de canoa tradicional
      '<path d="M70 215c18 6 36 6 54 0l-2 3c-16 4-34 4-50 0Z" fill="#0a140d"/>' +
      '<path d="M102 210v7" stroke="#0a140d" stroke-width="2" stroke-linecap="round"/>' +
      // Pássaros amazônicos em voo
      '<path d="M110 70c6-5 12-5 18 0" stroke="#d5e8d4" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M132 60c5-4 10-4 15 0" stroke="#d5e8d4" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function foz(id) {
    return (
      '<svg ' + SIZE + '>' +
      '<defs>' +
      '<linearGradient id="' + id + '-sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#4a8ec2"/><stop offset="0.6" stop-color="#8ac7e8"/><stop offset="1" stop-color="#daf0fa"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-cliff" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#3b322a"/><stop offset="1" stop-color="#241e19"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-waterfall" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#eaf6fa"/><stop offset="0.8" stop-color="#ffffff"/><stop offset="1" stop-color="#9dd5e8"/>' +
      "</linearGradient>" +
      '<linearGradient id="' + id + '-rainbow" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0%" stop-color="#ff0000" stop-opacity="0.35"/>' +
      '<stop offset="25%" stop-color="#ffaa00" stop-opacity="0.35"/>' +
      '<stop offset="50%" stop-color="#00ff88" stop-opacity="0.35"/>' +
      '<stop offset="75%" stop-color="#00aaff" stop-opacity="0.35"/>' +
      '<stop offset="100%" stop-color="#aa00ff" stop-opacity="0.35"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect width="400" height="300" fill="url(#' + id + '-sky)"/>' +
      '<circle cx="280" cy="70" r="40" fill="#fffbe6" opacity="0.6"/>' +
      // Paredões rochosos e cânion
      '<path d="M-10 110l90 30 50-20 60 40 80-30 80 20 60-30v180H-10Z" fill="url(#' + id + '-cliff)"/>' +
      // Vegetação subtropical nas bordas dos paredões
      '<path d="M-10 105c30-10 60 5 90-5s70 8 110-4 80 10 130-6 60 6 90-2v25H-10Z" fill="#2d4a2a"/>' +
      // Quedas d'água monumentais (Cataratas)
      '<rect x="40" y="130" width="34" height="110" rx="3" fill="url(#' + id + '-waterfall)"/>' +
      '<rect x="90" y="140" width="48" height="100" rx="4" fill="url(#' + id + '-waterfall)"/>' +
      '<rect x="156" y="125" width="88" height="120" rx="5" fill="url(#' + id + '-waterfall)"/>' +
      '<rect x="260" y="142" width="42" height="100" rx="4" fill="url(#' + id + '-waterfall)"/>' +
      '<rect x="318" y="132" width="55" height="110" rx="4" fill="url(#' + id + '-waterfall)"/>' +
      // Névoa densa na base da garganta
      '<ellipse cx="200" cy="240" rx="190" ry="38" fill="#ffffff" opacity="0.65"/>' +
      '<ellipse cx="200" cy="245" rx="150" ry="25" fill="#cdebf5" opacity="0.45"/>' +
      // Arco-íris sobre a garganta
      '<path d="M110 210 A100 70 0 0 1 290 200" stroke="url(#' + id + '-rainbow)" stroke-width="8" fill="none" stroke-linecap="round"/>' +
      // Rio inferior bravio
      '<path d="M0 248c50 8 100-6 150 4s100 8 150-2 70 6 100 0v50H0Z" fill="#1d546b"/>' +
      '<path d="M0 262c60-4 120 6 180-2s110-4 160 4 40-4 60 0v40H0Z" fill="#143c4d"/>' +
      // Passarela de observação panorâmica
      '<path d="M120 270h160" stroke="#7a5538" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M140 270v15M180 270v15M220 270v15M260 270v15" stroke="#4a321f" stroke-width="2"/>' +
      "</svg>"
    );
  }

  /* ---------------------------------------------------------
     Mapa do Brasil (contorno simplificado) para o mapa interativo
     Projeção simples: 1 grau de longitude/latitude = 10 unidades do viewBox.
     --------------------------------------------------------- */

  // largura com folga à direita para Fernando de Noronha não ficar colado na borda
  var MAPA = { minLon: -74.5, maxLat: 5.8, largura: 445, altura: 400, escala: 10 };

  // Pontos aproximados do contorno [longitude, latitude], no sentido horário a partir do Oiapoque
  var CONTORNO_BRASIL = [
    // Litoral, do Oiapoque ao Chuí
    [-51.6, 4.4], [-51.0, 3.6], [-50.6, 2.4], [-49.9, 1.7], [-50.4, 0.6], [-49.6, -0.1], [-48.4, -0.3],
    [-48.3, -1.0], [-47.4, -0.6], [-46.5, -1.0], [-45.3, -1.5], [-44.6, -2.3], [-44.1, -2.5], [-43.3, -2.4],
    [-42.2, -2.7], [-41.4, -2.9], [-40.5, -2.8], [-39.5, -3.0], [-38.5, -3.7], [-37.4, -4.6], [-36.3, -5.0],
    [-35.3, -5.2], [-35.0, -6.3], [-34.8, -7.2], [-34.9, -8.1], [-35.3, -9.1], [-35.8, -9.7], [-36.4, -10.5],
    [-37.1, -11.0], [-37.8, -12.1], [-38.5, -13.0], [-39.0, -14.0], [-39.0, -15.0], [-39.1, -16.4], [-39.3, -17.7],
    [-39.7, -18.9], [-40.2, -20.0], [-40.9, -21.2], [-41.0, -22.0], [-42.0, -22.95], [-43.2, -23.0], [-44.6, -23.3],
    [-45.5, -23.85], [-46.4, -24.05], [-47.3, -24.6], [-48.0, -25.2], [-48.5, -25.9], [-48.6, -26.8], [-48.5, -27.6],
    [-48.8, -28.6], [-49.7, -29.3], [-50.4, -30.3], [-51.2, -31.2], [-52.1, -32.2], [-52.8, -33.1], [-53.4, -33.75],
    // Fronteira com o Uruguai
    [-53.5, -33.1], [-53.4, -32.6], [-54.2, -31.9], [-55.0, -31.3], [-55.6, -30.85], [-56.4, -30.4], [-57.6, -30.2],
    // Argentina
    [-57.1, -29.75], [-56.0, -28.6], [-55.1, -27.8], [-54.1, -27.2], [-53.7, -26.3], [-53.9, -25.6], [-54.6, -25.6],
    // Paraguai
    [-54.3, -24.1], [-55.3, -23.9], [-55.7, -22.6], [-56.6, -22.2], [-57.9, -22.1], [-58.15, -20.2],
    // Bolívia
    [-57.75, -19.0], [-57.9, -18.0], [-58.4, -16.3], [-60.2, -16.3], [-60.2, -15.1], [-60.4, -13.6], [-61.5, -13.5],
    [-63.0, -12.7], [-64.3, -12.4], [-65.1, -11.9], [-65.35, -10.8], [-65.4, -9.7], [-66.6, -9.8], [-67.2, -10.3],
    [-68.7, -11.0], [-69.6, -10.95],
    // Peru
    [-70.6, -9.6], [-72.2, -10.0], [-73.2, -9.2], [-73.0, -8.3], [-74.0, -7.4], [-73.4, -6.3], [-72.9, -5.2],
    [-71.4, -4.4], [-69.95, -4.25],
    // Colômbia
    [-69.4, -1.15], [-69.6, -0.2], [-70.05, 0.6], [-69.2, 1.1], [-67.9, 1.8], [-66.85, 1.22],
    // Venezuela
    [-66.0, 0.8], [-65.0, 1.0], [-64.1, 1.6], [-64.6, 2.6], [-64.4, 3.8], [-63.0, 4.1], [-61.2, 4.5], [-60.73, 5.2],
    // Guiana, Suriname e Guiana Francesa
    [-60.2, 5.27], [-59.98, 4.5], [-59.6, 3.9], [-59.8, 3.4], [-59.95, 2.6], [-59.6, 1.8], [-59.2, 1.4], [-58.0, 1.5],
    [-56.5, 1.9], [-55.8, 2.1], [-55.0, 2.45], [-54.0, 2.2], [-52.9, 2.2], [-52.5, 2.6], [-51.9, 3.7]
  ];

  function pontoMapa(lon, lat) {
    return {
      x: (lon - MAPA.minLon) * MAPA.escala,
      y: (MAPA.maxLat - lat) * MAPA.escala
    };
  }

  // Posição em % dentro do mapa, usada para colocar os pinos (botões HTML) sobre o SVG
  function projetarMapa(lat, lon) {
    var p = pontoMapa(lon, lat);
    return { x: (p.x / MAPA.largura) * 100, y: (p.y / MAPA.altura) * 100 };
  }

  function mapaBrasil() {
    var d = CONTORNO_BRASIL.map(function (c, i) {
      var p = pontoMapa(c[0], c[1]);
      return (i === 0 ? "M" : "L") + p.x.toFixed(1) + " " + p.y.toFixed(1);
    }).join("") + "Z";

    var equador = pontoMapa(0, 0).y;
    var tropico = pontoMapa(0, -23.44).y;
    var ilha = pontoMapa(-32.42, -3.85);

    return (
      '<svg class="mapa" viewBox="0 0 ' + MAPA.largura + " " + MAPA.altura + '" aria-hidden="true" focusable="false">' +
      '<line class="mapa__linha" x1="0" y1="' + equador + '" x2="' + MAPA.largura + '" y2="' + equador + '"/>' +
      '<line class="mapa__linha" x1="0" y1="' + tropico + '" x2="' + MAPA.largura + '" y2="' + tropico + '"/>' +
      // Legendas posicionadas onde não há território (equador à direita, no oceano; trópico à esquerda)
      '<text class="mapa__legenda" x="' + (MAPA.largura - 6) + '" y="' + (equador - 5) + '" text-anchor="end">Linha do Equador</text>' +
      '<text class="mapa__legenda" x="6" y="' + (tropico - 5) + '">Trópico de Capricórnio</text>' +
      '<path class="mapa__pais" d="' + d + '"/>' +
      '<circle class="mapa__pais" cx="' + ilha.x.toFixed(1) + '" cy="' + ilha.y.toFixed(1) + '" r="2.4"/>' +
      '<text class="mapa__oceano" x="388" y="330" text-anchor="middle">OCEANO</text>' +
      '<text class="mapa__oceano" x="388" y="342" text-anchor="middle">ATLÂNTICO</text>' +
      "</svg>"
    );
  }

  return {
    mapaBrasil: mapaBrasil,
    projetarMapa: projetarMapa,
    noronha: noronha,
    jeri: jeri,
    chapada: chapada,
    amazonia: amazonia,
    foz: foz
  };
})();
