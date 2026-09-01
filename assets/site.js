(() => {
  const supportedLocales = ["en", "ru", "uk"];
  const storageKey = "portfolio-locale";
  const translations = window.PORTFOLIO_TRANSLATIONS || {};

  function applyLocale(locale) {
    const nextLocale = supportedLocales.includes(locale) ? locale : "en";
    const dictionary = translations[nextLocale] || {};

    document.documentElement.lang = nextLocale;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (typeof value === "string") element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = dictionary[element.dataset.i18nHtml];
      if (typeof value === "string") element.innerHTML = value;
    });
    document.querySelectorAll("[data-locale]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.locale === nextLocale));
    });

    try { localStorage.setItem(storageKey, nextLocale); } catch (_) { /* Preference storage is optional. */ }
  }

  let initialLocale = "en";
  try {
    const savedLocale = localStorage.getItem(storageKey);
    if (supportedLocales.includes(savedLocale)) initialLocale = savedLocale;
  } catch (_) { /* Keep English default. */ }

  document.querySelectorAll("[data-locale]").forEach((button) => {
    button.addEventListener("click", () => applyLocale(button.dataset.locale));
  });

  const header = document.querySelector(".site-header");
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
  applyLocale(initialLocale);
})();
