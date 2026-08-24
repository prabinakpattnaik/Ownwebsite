import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from '../utils/constants';

// Native, dependency-free per-page SEO. Directly upserts the document title,
// canonical link, and OG/Twitter/robots meta into <head> on route change.
// (react-helmet-async v2 does not commit reliably under React 18 StrictMode,
// so we manage these tags ourselves — works in both dev and production builds.)

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const PageSEO = ({ title, description, image, noindex = false }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | Intelligent Connectivity Solutions`;
    const desc = description || SITE_DESCRIPTION;
    const ogImage = image || OG_IMAGE;

    document.title = fullTitle;
    upsertMeta('name', 'description', desc);
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);

    const robotsEl = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else if (robotsEl) {
      robotsEl.parentNode.removeChild(robotsEl);
    }
  }, [pathname, title, description, image, noindex]);

  return null;
};

export default PageSEO;
