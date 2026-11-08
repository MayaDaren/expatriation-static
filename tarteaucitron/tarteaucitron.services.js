/* EXPATRIATION.IO: minimal Tarteaucitron services file.
   Analytics-only posture (CLAUDE.md): ships ONLY the Google Analytics (GA4)
   'gtag' service, derived from tarteaucitronjs 1.34.0
   tarteaucitron.services.js. No advertising, social, or other trackers are
   vendored. gtag.js loads exclusively after explicit consent.
   DIVERGENCE FROM UPSTREAM: this service only injects gtag.js. The dataLayer
   queue, the gtag() stub and the js/config commands live in BaseLayout's
   inert head snippet, so page events queued before consent are drained in
   order (config first) when this script loads. Do not re-add config here:
   it would double-count page_view. */
tarteaucitron.services = tarteaucitron.services || {};

tarteaucitron.services.gtag = {
    "key": "gtag",
    "type": "analytic",
    "name": "Google Analytics (GA4)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gtagUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.gtagUa === undefined) {
            return;
        }

        var customDomain = "www.googletagmanager.com";
        if (tarteaucitron.user.gtagCustomDomain !== undefined && tarteaucitron.user.gtagCustomDomain !== "") {
            customDomain = tarteaucitron.user.gtagCustomDomain;
        }

        /* Injection only: dataLayer, the gtag() stub and js/config are queued
           by BaseLayout's inert head snippet; gtag.js drains that queue. */
        tarteaucitron.addScript('https://' + customDomain + '/gtag/js?id=' + tarteaucitron.user.gtagUa);
    },
    "fallback": function () {
        if (tarteaucitron.parameters.googleConsentMode === true) {
            if (tarteaucitron.parameters.softConsentMode === false) {
                this.js();
            }
        }
    }
};

