import { skills } from "./content/skills.js";
import { history, convertHistoryToHTML } from "./content/history.js";
import { convertBioToHTML } from "./content/bio.js";
import { htmlToElement } from "./utils.js";

/**
 * Bio
 */

const bioElement = document.getElementById("bio");
bioElement.appendChild(htmlToElement(convertBioToHTML()));

/**
 * Work history
 */
const historyElement = document.getElementById("history");
for (let job of history) {
  const html = convertHistoryToHTML(job);
  historyElement.appendChild(htmlToElement(html));
}
