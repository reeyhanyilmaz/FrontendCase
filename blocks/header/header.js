import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia("(min-width: 900px)");

function toggleMenu(nav, forceExpanded = null) {
  //aria-expanded="true open hamburger
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute("aria-expanded") === "true";
  const button = nav.querySelector(".nav-hamburger button");
  document.body.style.overflowY = expanded || isDesktop.matches ? "" : "hidden";
  nav.setAttribute("aria-expanded", expanded ? "false" : "true");
  button.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
}

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta).pathname : "/nav";
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  const nav = document.createElement("nav");
  nav.id = "nav";
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  console.log("fragment :>> ", fragment);

  const classes = ["brand", "sections"];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // hamburger for mobile
  const navSections = nav.querySelector(".nav-sections");
  const hamburger = document.createElement("div");
  hamburger.classList.add("nav-hamburger");
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener("click", () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute("aria-expanded", "false");
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener("change", () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement("div");
  navWrapper.className = "nav-wrapper";
  navWrapper.append(nav);
  block.append(navWrapper);
}
