(() => {
  const supportedLocales = ["en", "ru", "uk"];
  const storageKey = "portfolio-locale";
  const translations = window.PORTFOLIO_TRANSLATIONS || {};
  const textElements = Array.from(document.querySelectorAll("[data-i18n]"));
  const htmlElements = Array.from(document.querySelectorAll("[data-i18n-html]"));
  const defaultText = new Map(textElements.map((element) => [element, element.textContent]));
  const defaultHtml = new Map(htmlElements.map((element) => [element, element.innerHTML]));
  const uiLabels = {
    en: { previous: "Previous image", next: "Next image", close: "Close image viewer", open: "Open image viewer", top: "Back to top" },
    ru: { previous: "Предыдущее изображение", next: "Следующее изображение", close: "Закрыть просмотр", open: "Открыть изображение", top: "Вернуться наверх" },
    uk: { previous: "Попереднє зображення", next: "Наступне зображення", close: "Закрити перегляд", open: "Відкрити зображення", top: "Повернутися нагору" }
  };
  let currentLocale = "en";

  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.type = "button";
  backToTop.innerHTML = "<span aria-hidden=\"true\">↑</span>";
  document.body.appendChild(backToTop);

  const viewer = document.createElement("div");
  viewer.className = "image-viewer";
  viewer.setAttribute("aria-hidden", "true");
  viewer.innerHTML = `
    <div class="viewer-dialog" role="dialog" aria-modal="true">
      <button class="viewer-close" type="button" data-viewer-close>×</button>
      <button class="viewer-nav viewer-prev" type="button" data-viewer-prev>‹</button>
      <div class="viewer-viewport"><div class="viewer-track" data-viewer-track></div></div>
      <button class="viewer-nav viewer-next" type="button" data-viewer-next>›</button>
      <span class="viewer-counter" data-viewer-counter></span>
    </div>`;
  document.body.appendChild(viewer);

  const viewerTrack = viewer.querySelector("[data-viewer-track]");
  const viewerCounter = viewer.querySelector("[data-viewer-counter]");
  const viewerPrevious = viewer.querySelector("[data-viewer-prev]");
  const viewerNext = viewer.querySelector("[data-viewer-next]");
  const viewerClose = viewer.querySelector("[data-viewer-close]");
  let viewerSlides = [];
  let viewerIndex = 0;
  let viewerTouchStart = null;
  let returnFocus = null;

  function updateUiLabels() {
    const labels = uiLabels[currentLocale];
    backToTop.setAttribute("aria-label", labels.top);
    viewerClose.setAttribute("aria-label", labels.close);
    viewerPrevious.setAttribute("aria-label", labels.previous);
    viewerNext.setAttribute("aria-label", labels.next);
    document.querySelectorAll("[data-gallery-prev]").forEach((button) => button.setAttribute("aria-label", labels.previous));
    document.querySelectorAll("[data-gallery-next]").forEach((button) => button.setAttribute("aria-label", labels.next));
    document.querySelectorAll("[data-gallery-frame]").forEach((frame) => frame.setAttribute("aria-label", labels.open));
  }

  function applyLocale(locale) {
    currentLocale = supportedLocales.includes(locale) ? locale : "en";
    const dictionary = translations[currentLocale] || {};
    document.documentElement.lang = currentLocale;

    textElements.forEach((element) => {
      element.textContent = currentLocale === "en" ? defaultText.get(element) : dictionary[element.dataset.i18n] ?? defaultText.get(element);
    });
    htmlElements.forEach((element) => {
      element.innerHTML = currentLocale === "en" ? defaultHtml.get(element) : dictionary[element.dataset.i18nHtml] ?? defaultHtml.get(element);
    });
    document.querySelectorAll("[data-locale]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.locale === currentLocale));
    });
    updateUiLabels();
    try { localStorage.setItem(storageKey, currentLocale); } catch (_) { /* Preference storage is optional. */ }
  }

  function renderViewer() {
    viewerTrack.style.transform = `translate3d(${-viewerIndex * 100}%, 0, 0)`;
    viewerCounter.textContent = `${viewerIndex + 1} / ${viewerSlides.length}`;
  }

  function changeViewerSlide(direction) {
    if (!viewerSlides.length) return;
    viewerIndex = (viewerIndex + direction + viewerSlides.length) % viewerSlides.length;
    renderViewer();
  }

  function closeViewer() {
    viewer.classList.remove("open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("viewer-open");
    returnFocus?.focus();
  }

  function openViewer(slides, index, trigger) {
    if (!slides.length) return;
    viewerSlides = slides;
    viewerIndex = index;
    returnFocus = trigger;
    viewerTrack.replaceChildren(...slides.map((slide) => {
      const image = document.createElement("img");
      image.className = "viewer-image";
      image.src = slide.currentSrc || slide.src;
      image.alt = slide.alt || "";
      return image;
    }));
    const hasMultipleSlides = slides.length > 1;
    viewerPrevious.hidden = !hasMultipleSlides;
    viewerNext.hidden = !hasMultipleSlides;
    viewerCounter.hidden = !hasMultipleSlides;
    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("viewer-open");
    renderViewer();
    viewerClose.focus();
  }

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll("[data-gallery-slide]"));
    const track = gallery.querySelector("[data-gallery-track]");
    const frame = gallery.querySelector("[data-gallery-frame]");
    const previous = gallery.querySelector("[data-gallery-prev]");
    const next = gallery.querySelector("[data-gallery-next]");
    const counter = gallery.querySelector("[data-gallery-counter]");
    const dotsRoot = gallery.querySelector("[data-gallery-dots]");
    let current = 0;
    let touchStart = null;
    if (!slides.length || !track || !frame) return;

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.className = "gallery-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `${index + 1}`);
      dot.addEventListener("click", (event) => { event.stopPropagation(); showSlide(index); });
      dotsRoot?.appendChild(dot);
      return dot;
    });

    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translate3d(${-current * 100}%, 0, 0)`;
      if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
      dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === current));
    }

    const hasMultipleSlides = slides.length > 1;
    if (previous) previous.hidden = !hasMultipleSlides;
    if (next) next.hidden = !hasMultipleSlides;
    if (counter) counter.hidden = !hasMultipleSlides;
    if (dotsRoot) dotsRoot.hidden = !hasMultipleSlides;
    previous?.addEventListener("click", (event) => { event.stopPropagation(); showSlide(current - 1); });
    next?.addEventListener("click", (event) => { event.stopPropagation(); showSlide(current + 1); });
    frame.addEventListener("click", () => openViewer(slides, current, frame));
    frame.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" && hasMultipleSlides) { event.preventDefault(); showSlide(current - 1); }
      else if (event.key === "ArrowRight" && hasMultipleSlides) { event.preventDefault(); showSlide(current + 1); }
      else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openViewer(slides, current, frame); }
    });
    frame.addEventListener("pointerdown", (event) => { touchStart = event.clientX; });
    frame.addEventListener("pointerup", (event) => {
      if (touchStart === null || Math.abs(event.clientX - touchStart) < 44) { touchStart = null; return; }
      showSlide(current + (event.clientX < touchStart ? 1 : -1));
      touchStart = null;
    });
    showSlide(0);
  });

  viewerPrevious.addEventListener("click", () => changeViewerSlide(-1));
  viewerNext.addEventListener("click", () => changeViewerSlide(1));
  viewerClose.addEventListener("click", closeViewer);
  viewer.addEventListener("click", (event) => { if (event.target === viewer) closeViewer(); });
  viewer.addEventListener("pointerdown", (event) => { viewerTouchStart = event.clientX; });
  viewer.addEventListener("pointerup", (event) => {
    if (viewerTouchStart !== null && Math.abs(event.clientX - viewerTouchStart) >= 44) changeViewerSlide(event.clientX < viewerTouchStart ? 1 : -1);
    viewerTouchStart = null;
  });
  document.addEventListener("keydown", (event) => {
    if (!viewer.classList.contains("open")) return;
    if (event.key === "Escape") closeViewer();
    else if (event.key === "ArrowLeft") changeViewerSlide(-1);
    else if (event.key === "ArrowRight") changeViewerSlide(1);
  });

  document.querySelectorAll("[data-locale]").forEach((button) => button.addEventListener("click", () => applyLocale(button.dataset.locale)));
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  const updateScrollUi = () => {
    document.querySelector(".site-header")?.classList.toggle("scrolled", window.scrollY > 8);
    backToTop.classList.toggle("visible", window.scrollY > 560);
  };
  window.addEventListener("scroll", updateScrollUi, { passive: true });

  let initialLocale = "en";
  try {
    const savedLocale = localStorage.getItem(storageKey);
    if (supportedLocales.includes(savedLocale)) initialLocale = savedLocale;
  } catch (_) { /* Keep English default. */ }
  applyLocale(initialLocale);
  updateScrollUi();
})();
