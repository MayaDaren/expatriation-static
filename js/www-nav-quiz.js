/*
 * www-nav-quiz : ajoute « Quiz ville » et « Quiz culturel » au menu
 * « Outils et guides » du header www.expatriation.io (et a sa copie mobile).
 *
 * Le header www est du markup Designer statique ; la recette maison pour le
 * faire evoluer sans session Designer est un script heberge ici, enregistre
 * sur le site Webflow avec hash SRI (meme motif que www-comparer-corridor).
 *
 * Mecanique : cloner le lien « Profils pays » (app.expatriation.io/fr/culture/
 * countries) present dans chaque menu, pour heriter des classes Webflow, puis
 * inserer les deux liens quiz a sa suite. Idempotent par conteneur
 * (data-quiz-nav), rejoue apres chargement pour couvrir le menu mobile
 * construit dynamiquement par wwwnavmobile1.
 */
(function () {
  'use strict';

  var ITEMS = [
    { href: 'https://app.expatriation.io/fr/quiz', label: 'Quiz ville' },
    { href: 'https://app.expatriation.io/fr/culture/quiz', label: 'Quiz culturel' }
  ];

  function inject() {
    var refs = document.querySelectorAll('a[href*="app.expatriation.io/fr/culture/countries"]');
    for (var i = 0; i < refs.length; i++) {
      var ref = refs[i];
      var container = ref.parentElement;
      if (!container) continue;
      // n'agir que dans un menu, jamais dans le corps d'une page
      if (!ref.closest('nav, .w-dropdown-list, .w-nav')) continue;
      if (container.querySelector('a[data-quiz-nav]')) continue;
      // insertion apres la reference : parcourir a l'envers pour finir
      // dans l'ordre Quiz ville puis Quiz culturel
      for (var j = ITEMS.length - 1; j >= 0; j--) {
        var a = ref.cloneNode(true);
        a.textContent = ITEMS[j].label;
        a.href = ITEMS[j].href;
        a.setAttribute('data-quiz-nav', '1');
        a.removeAttribute('id');
        a.removeAttribute('aria-current');
        a.classList.remove('w--current');
        ref.insertAdjacentElement('afterend', a);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
  window.addEventListener('load', inject);
  setTimeout(inject, 1200);
})();
