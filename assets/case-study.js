(() => {
  const translations = window.caseStudyTranslations || {};
  const translatable = Array.from(document.querySelectorAll("[data-i18n], [data-i18n-html]"));
  const languageButtons = Array.from(document.querySelectorAll("[data-language]"));

  translatable.forEach((element) => {
    if (element.dataset.i18nHtml) {
      element.dataset.defaultHtml = element.innerHTML;
    } else {
      element.dataset.defaultText = element.textContent;
    }
  });

  const setLanguage = (requestedLanguage) => {
    const language = requestedLanguage === "ru" || requestedLanguage === "uk" ? requestedLanguage : "en";
    document.documentElement.lang = language;

    translatable.forEach((element) => {
      const htmlKey = element.dataset.i18nHtml;
      const textKey = element.dataset.i18n;
      if (htmlKey) {
        element.innerHTML = language === "en" ? element.dataset.defaultHtml : translations[language]?.[htmlKey] || element.dataset.defaultHtml;
      } else {
        element.textContent = language === "en" ? element.dataset.defaultText : translations[language]?.[textKey] || element.dataset.defaultText;
      }
    });

    languageButtons.forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      // Language preference remains session-only when storage is unavailable.
    }
  };

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  let initialLanguage = "en";
  try {
    initialLanguage = localStorage.getItem("portfolio-language") || "en";
  } catch {
    initialLanguage = "en";
  }
  setLanguage(initialLanguage);

  const viewer = document.querySelector("[data-viewer]");
  const viewerTrack = viewer?.querySelector("[data-viewer-track]");
  const viewerCounter = viewer?.querySelector("[data-viewer-counter]");
  const viewerPrevious = viewer?.querySelector("[data-viewer-prev]");
  const viewerNext = viewer?.querySelector("[data-viewer-next]");
  const viewerClose = viewer?.querySelector("[data-viewer-close]");
  let viewerSlides = [];
  let viewerIndex = 0;

  const renderViewer = () => {
    if (!viewerTrack || !viewerCounter) {
      return;
    }
    viewerTrack.style.transform = `translate3d(${-viewerIndex * 100}%, 0, 0)`;
    viewerCounter.textContent = `${viewerIndex + 1} / ${viewerSlides.length}`;
  };

  const closeViewer = () => {
    viewer?.classList.remove("open");
    viewer?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("viewer-open");
  };

  const openViewer = (slides, index) => {
    if (!viewer || !viewerTrack || !slides.length) {
      return;
    }
    viewerSlides = slides;
    viewerIndex = index;
    viewerTrack.innerHTML = "";
    slides.forEach((slide) => {
      const image = document.createElement("img");
      image.className = "viewer-image";
      image.src = slide.currentSrc || slide.src;
      image.alt = slide.alt || "";
      viewerTrack.appendChild(image);
    });
    const multiple = slides.length > 1;
    viewerPrevious.hidden = !multiple;
    viewerNext.hidden = !multiple;
    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("viewer-open");
    renderViewer();
    viewerClose?.focus();
  };

  const changeViewerSlide = (direction) => {
    if (!viewerSlides.length) {
      return;
    }
    viewerIndex = (viewerIndex + direction + viewerSlides.length) % viewerSlides.length;
    renderViewer();
  };

  viewerPrevious?.addEventListener("click", () => changeViewerSlide(-1));
  viewerNext?.addEventListener("click", () => changeViewerSlide(1));
  viewerClose?.addEventListener("click", closeViewer);
  viewer?.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeViewer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!viewer?.classList.contains("open")) {
      return;
    }
    if (event.key === "Escape") {
      closeViewer();
    } else if (event.key === "ArrowLeft") {
      changeViewerSlide(-1);
    } else if (event.key === "ArrowRight") {
      changeViewerSlide(1);
    }
  });

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll("[data-gallery-slide]"));
    const track = gallery.querySelector("[data-gallery-track]");
    const frame = gallery.querySelector("[data-gallery-frame]");
    const counter = gallery.querySelector("[data-gallery-counter]");
    const previous = gallery.querySelector("[data-gallery-prev]");
    const next = gallery.querySelector("[data-gallery-next]");
    let current = 0;

    if (!slides.length || !track || !frame) {
      return;
    }

    const showSlide = (index) => {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translate3d(${-current * 100}%, 0, 0)`;
      if (counter) {
        counter.textContent = `${current + 1} / ${slides.length}`;
      }
    };

    previous?.addEventListener("click", () => showSlide(current - 1));
    next?.addEventListener("click", () => showSlide(current + 1));
    frame.addEventListener("click", () => openViewer(slides, current));
    frame.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openViewer(slides, current);
      }
    });
    showSlide(0);
  });
})();
