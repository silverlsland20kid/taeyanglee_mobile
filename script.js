const root = document.documentElement;
const views = [...document.querySelectorAll("[data-view]")];
const tabs = [...document.querySelectorAll("[data-tab]")];
const panels = [...document.querySelectorAll("[data-panel]")];
const desireWord = document.querySelector("#desire-word");
const desireWords = ["살고", "먹고", "갖고"];
let desireIndex = 0;

function syncViewportHeight() {
  root.style.setProperty("--app-height", `${window.innerHeight}px`);
}

function showView(name) {
  views.forEach((view) => {
    const active = view.dataset.view === name;
    view.hidden = !active;
    view.classList.toggle("is-active", active);
  });
  window.scrollTo({ top: 0, behavior: "auto" });
}

function selectTab(name) {
  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === name;
    tab.classList.toggle("is-selected", selected);
    tab.setAttribute("aria-selected", String(selected));
  });

  panels.forEach((panel) => {
    const selected = panel.dataset.panel === name;
    panel.hidden = !selected;
    panel.classList.toggle("is-active", selected);
  });

  document.querySelector(".profile-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function rotateDesireWord() {
  if (!desireWord) return;
  desireWord.classList.remove("is-entering");
  desireWord.classList.add("is-leaving");

  window.setTimeout(() => {
    desireIndex = (desireIndex + 1) % desireWords.length;
    desireWord.textContent = desireWords[desireIndex];
    desireWord.classList.remove("is-leaving");
    void desireWord.offsetWidth;
    desireWord.classList.add("is-entering");
  }, 420);
}

tabs.forEach((tab) => {
  tab.setAttribute("role", "tab");
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.go));
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => showView("calligraphy"));
});

syncViewportHeight();
window.addEventListener("resize", syncViewportHeight, { passive: true });
window.addEventListener("orientationchange", syncViewportHeight, { passive: true });

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(rotateDesireWord, 2400);
}

requestAnimationFrame(() => root.classList.add("is-ready"));
