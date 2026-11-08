# expatriation-static

Scripts chargés par www.expatriation.io et www.expat-ukraine.com (`ukr/`), servis par jsDelivr depuis les tags de ce dépôt :

    https://cdn.jsdelivr.net/gh/MayaDaren/expatriation-static@<tag>/<chemin>

Ils étaient servis par app.expatriation.io (Vercel) jusqu'au 08/11/2026. La suspension du compte Vercel le 06/11 a fait disparaître le bandeau de consentement, GA4 et les bandes de www.

## Règles

- **Un tag publié ne change jamais.** Webflow fige un hash SRI (`integrity="sha384-..."`) pour chaque script. Un fichier modifié sous le même tag serait refusé par le navigateur, et la surface disparaîtrait sans bruit.
- Pour changer un fichier : commit, nouveau tag (`v1.0.1`, ...), calcul du hash (`openssl dgst -sha384 -binary <fichier> | base64`), nouvelle version du script enregistré dans Webflow avec la nouvelle URL et le nouveau hash, puis publication.
- `tarteaucitron/` charge `lang/`, `css/` et `tarteaucitron.services.js` depuis son propre dossier : garder l'arborescence.
- Source d'origine : `public/js/` et `public/tarteaucitron/` d'expatriation-app (commit 3be205f) ; `ukr/ukrbilanband6.js` vient de `public/js/` d'accompagnement-expatriation-astro (tag v1.1.0, 08/11/2026). Ces copies dans l'app et dans accompagnement ne sont plus chargées par www ni par expat-ukraine.
