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

        return {
          noronha: noronha,
          jeri: jeri,
          chapada: chapada
        };
      })();
