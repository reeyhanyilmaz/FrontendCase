import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

export default async function decorate(block) {
  const footerMeta = getMetadata("footer");
  block.textContent = "";

  // load footer fragment
  const footerPath = footerMeta.footer || "/footer";
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement("div");
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  const sectionDiv = document.querySelector("footer .section");
  sectionDiv.parentElement.classList.add("footer-section-parent");
}
