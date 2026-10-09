/*
 * Umar Bashir — Latest Designs gallery
 *
 * Add new image files to a folder named "designs" in the same GitHub
 * repository as index.html, then add their details to the DESIGNS array.
 * Put the newest design first. Commit your changes on GitHub Pages.
 */
(() => {
  "use strict";

  const DESIGNS = [
    {
      title: "Latest Design",
      category: "Graphic Design",
      image: "designs/IMG_20261008_130729_118.jpg",
      description: "A recent design from my portfolio."
    }
    // Copy the object above and add a comma after the previous object
    // when you want to add another design.
  ];

  function addGalleryStyles() {
    if (document.getElementById("latest-designs-styles")) return;
    const style = document.createElement("style");
    style.id = "latest-designs-styles";
    style.textContent = `
      #latest-designs { padding: 72px 0; background: #481D32; color: #fff; border-bottom: 2px solid #D8B4A0; }
      #latest-designs .section-heading { max-width: 650px; margin-bottom: 30px; }
      #latest-designs .eyebrow { color: #D8B4A0; font-size: .8rem; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; }
      #latest-designs h2 { color: #fff; font-size: clamp(1.9rem, 4vw, 2.7rem); line-height: 1.15; margin: 7px 0 10px; }
      #latest-designs .intro { color: #F1E7EC; margin: 0; }
      #latest-designs .latest-designs-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
      #latest-designs .design-card { overflow: hidden; border: 1px solid rgba(216,180,160,.45); border-radius: 18px; background: #5A263E; }
      #latest-designs .design-image-link { display: block; background: #5A263E; }
      #latest-designs .design-card img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
      #latest-designs .design-card-body { padding: 16px 18px 19px; }
      #latest-designs .design-category { display: block; margin-bottom: 6px; color: #D8B4A0; font-size: .78rem; font-weight: 750; letter-spacing: .08em; text-transform: uppercase; }
      #latest-designs .design-card h3 { margin: 0 0 6px; color: #fff; font-size: 1.08rem; }
      #latest-designs .design-card p { margin: 0; color: #F1E7EC; font-size: .92rem; line-height: 1.6; }
      #latest-designs .missing-image { padding: 22px; color: #481D32; background: #F7F0E8; overflow-wrap: anywhere; }
      #latest-designs a:focus-visible { outline: 3px solid #D8B4A0; outline-offset: 3px; }
      @media (max-width: 780px) { #latest-designs { padding: 52px 0; } #latest-designs .latest-designs-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (max-width: 520px) { #latest-designs .latest-designs-grid { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);
  }

  function renderGallery() {
    if (document.getElementById("latest-designs")) return;
    const portfolio = document.getElementById("portfolio");
    if (!portfolio) {
      console.warn("Latest Designs: the page needs an element with id='portfolio'.");
      return;
    }

    const section = document.createElement("section");
    section.id = "latest-designs";
    section.className = "section";
    section.setAttribute("aria-labelledby", "latest-designs-title");

    const container = document.createElement("div");
    container.className = "container";

    const headingWrap = document.createElement("div");
    headingWrap.className = "section-heading";
    const eyebrow = document.createElement("div");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "Fresh work";
    const heading = document.createElement("h2");
    heading.id = "latest-designs-title";
    heading.textContent = "Latest Designs";
    const intro = document.createElement("p");
    intro.className = "intro";
    intro.textContent = "A selection of my newest creative work.";
    headingWrap.append(eyebrow, heading, intro);

    const grid = document.createElement("div");
    grid.className = "latest-designs-grid";

    DESIGNS.forEach((design) => {
      const card = document.createElement("article");
      card.className = "design-card";

      const link = document.createElement("a");
      link.className = "design-image-link";
      link.href = design.image;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `Open ${design.title || "design"} image in a new tab`);

      const img = document.createElement("img");
      img.src = design.image;
      img.alt = design.title || "Portfolio design";
      img.loading = "lazy";
      img.onerror = () => {
        const missing = document.createElement("div");
        missing.className = "missing-image";
        missing.textContent = `Image not found: ${design.image}. Check the filename and folder.`;
        link.replaceWith(missing);
      };
      link.appendChild(img);

      const body = document.createElement("div");
      body.className = "design-card-body";
      const category = document.createElement("span");
      category.className = "design-category";
      category.textContent = design.category || "Design";
      const title = document.createElement("h3");
      title.textContent = design.title || "Untitled design";
      const description = document.createElement("p");
      description.textContent = design.description || "";

      body.append(category, title, description);
      card.append(link, body);
      grid.appendChild(card);
    });

    container.append(headingWrap, grid);
    section.appendChild(container);
    portfolio.insertAdjacentElement("afterend", section);
  }

  function init() {
    addGalleryStyles();
    renderGallery();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
