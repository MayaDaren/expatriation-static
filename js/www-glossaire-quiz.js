/*
 * www-glossaire-quiz : rend la question « Testez-vous » sur les pages du
 * glossaire www (les 49 termes portent une question a choix multiple dans
 * leurs champs CMS quiz-*, redigee en aout 2026 et jamais rendue faute de
 * session Designer). Les donnees viennent de l'app, qui lit Webflow cote
 * serveur : GET app.expatriation.io/api/glossaire-quiz?slug=<terme>.
 *
 * Le bloc s'insere avant le bandeau disclaimer, dans une section qui reutilise
 * les classes de mise en page de la page. Apres la reponse : explication et
 * liens vers les quiz de l'app (entree d'entonnoir). Typographie maison, pas
 * de point d'exclamation, apostrophes typographiques, NBSP avant : et ?.
 */
(function () {
  'use strict';

  var m = window.location.pathname.match(/^\/glossaire\/([a-z0-9-]{2,80})$/);
  if (!m) return;
  var slug = m[1];
  var NB = '\u00A0'; // jamais le caractere tape : il ne survit pas a toutes les chaines d'edition

  function el(tag, style, text) {
    var e = document.createElement(tag);
    if (style) e.setAttribute('style', style);
    if (text) e.textContent = text;
    return e;
  }

  function render(q) {
    if (document.querySelector('[data-glossaire-quiz]')) return;
    var anchor = document.querySelector('section.disclaimer-bandeau') ||
      document.querySelector('section.footer');
    if (!anchor) return;

    var section = el('section', '');
    section.className = 'section fafafa';
    section.setAttribute('data-glossaire-quiz', '1');
    var container = el('div', '');
    container.className = 'w-layout-blockcontainer container _1-4 w-container';
    section.appendChild(container);

    var card = el('div', 'background:#ffffff;border:1px solid #e5e1d8;border-top:3px solid #af9646;border-radius:12px;padding:28px 26px;margin:8px 0;');
    container.appendChild(card);

    card.appendChild(el('p', 'font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#af9646;margin:0 0 10px;', 'Testez-vous'));
    card.appendChild(el('h3', "font-family:'Times New Roman',Times,serif;font-size:21px;font-weight:400;color:#131b2a;line-height:1.35;margin:0 0 18px;", q.question));

    var letters = ['a', 'b', 'c', 'd'];
    var buttons = [];
    var answered = false;

    var feedback = el('div', 'display:none;margin-top:16px;');
    var verdict = el('p', 'font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;margin:0 0 8px;');
    var explanation = el('p', 'font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#555;line-height:1.6;margin:0 0 14px;', q.explanation);
    var links = el('p', 'font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#555;margin:0;');
    links.appendChild(document.createTextNode('Pour aller plus loin' + NB + ': '));
    var linkStyle = 'color:#8a6d2f;text-decoration:underline;text-underline-offset:2px;';
    var a1 = el('a', linkStyle, 'Quiz ville');
    a1.href = 'https://app.expatriation.io/fr/quiz';
    a1.target = '_blank';
    a1.rel = 'noopener';
    var a2 = el('a', linkStyle, 'Quiz culturel');
    a2.href = 'https://app.expatriation.io/fr/culture/quiz';
    a2.target = '_blank';
    a2.rel = 'noopener';
    links.appendChild(a1);
    links.appendChild(document.createTextNode(' · '));
    links.appendChild(a2);
    feedback.appendChild(verdict);
    feedback.appendChild(explanation);
    feedback.appendChild(links);

    letters.forEach(function (letter) {
      if (!q.options[letter]) return;
      var btn = el('button', 'display:block;width:100%;text-align:left;background:#ffffff;border:1px solid #ddd8cc;border-radius:8px;padding:11px 14px;margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#131b2a;cursor:pointer;transition:border-color .2s;');
      btn.textContent = letter.toUpperCase() + '. ' + q.options[letter];
      btn.addEventListener('mouseenter', function () { if (!answered) btn.style.borderColor = '#af9646'; });
      btn.addEventListener('mouseleave', function () { if (!answered) btn.style.borderColor = '#ddd8cc'; });
      btn.addEventListener('click', function () {
        if (answered) return;
        answered = true;
        var ok = letter === q.correct;
        buttons.forEach(function (b) {
          b.btn.style.cursor = 'default';
          b.btn.style.color = '#8b8b8b';
          if (b.letter === q.correct) {
            b.btn.style.borderColor = '#1f7a4d';
            b.btn.style.color = '#131b2a';
            b.btn.style.background = '#f2f8f4';
          } else if (b.letter === letter) {
            b.btn.style.borderColor = '#a03a2e';
          }
        });
        verdict.textContent = ok ? 'Bonne réponse.' : 'La bonne réponse était ' + q.correct.toUpperCase() + '.';
        verdict.style.color = ok ? '#1f7a4d' : '#a03a2e';
        feedback.style.display = 'block';
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'glossary_quiz_answer', {
            event_category: 'engagement',
            term: slug,
            correct: ok,
          });
        }
      });
      card.appendChild(btn);
      buttons.push({ letter: letter, btn: btn });
    });

    card.appendChild(feedback);
    anchor.parentNode.insertBefore(section, anchor);
  }

  function init() {
    fetch('https://app.expatriation.io/api/glossaire-quiz?slug=' + encodeURIComponent(slug))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (q) { if (q && q.question && q.correct) render(q); })
      .catch(function () { /* jamais bloquant */ });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
