/* =====================================================
   File: content.js
   Purpose:
     - Runs in the context of web pages (content script).
     - Handles element selection/deselection by user.
     - Collects scraped data and communicates with popup.
   Notes:
     - Uses .ds-highlight class from content.css for UI.
     - Single-click = select element.
     - Double-click = deselect element.
   ===================================================== */


/* ------------------------------
   State Variables
   ------------------------------ */
let selecting = false;                 // Whether scraper mode is active
let scrapedData = [];                  // Stores {tag, text} objects of selected elements
let selectedElements = new Map();      // Map to keep track of unique elements (key → element)


/* ------------------------------
   Helper Functions
   ------------------------------ */

/**
 * Generates a unique key for an element.
 * Combines tagName + trimmed innerText.
 * Ensures duplicate text nodes are not selected twice.
 */
const getKey = (el) => el.tagName + "-" + (el.innerText || "").trim();


/* ------------------------------
   Event Listeners
   ------------------------------ */

/**
 * SINGLE CLICK = Select element
 * - Prevents default behavior
 * - Highlights element with .ds-highlight
 * - Stores data in scrapedData
 */
document.addEventListener("click", (e) => {
  if (!selecting) return; // Only active in selection mode
  e.preventDefault();
  e.stopPropagation();

  const el = e.target;
  const tag = el.tagName;
  const text = (el.innerText || "").trim();
  const key = getKey(el);

  if (text && !selectedElements.has(key)) {
    scrapedData.push({ tag, text });
    selectedElements.set(key, el);
    el.classList.add("ds-highlight"); // Visual feedback
  }
});

/**
 * DOUBLE CLICK = Deselect element
 * - Removes highlight
 * - Removes from scrapedData
 */
document.addEventListener("dblclick", (e) => {
  if (!selecting) return;
  e.preventDefault();
  e.stopPropagation();

  const el = e.target;
  const key = getKey(el);

  if (selectedElements.has(key)) {
    scrapedData = scrapedData.filter((d) => d.tag + "-" + d.text !== key);
    el.classList.remove("ds-highlight");
    selectedElements.delete(key);
  }
});


/* ------------------------------
   Message Handling (from popup.js)
   ------------------------------ */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  
  if (msg.action === "toggleScraper") {
    // Enable or disable selection mode
    selecting = !selecting;
    sendResponse({ active: selecting });
  }

  if (msg.action === "getData") {
    // Return collected scraped data
    sendResponse(scrapedData);
  }

  if (msg.action === "clearData") {
    // Clear all selections and reset state
    scrapedData = [];
    selectedElements.forEach((el) => el.classList.remove("ds-highlight"));
    selectedElements.clear();
    sendResponse({ success: true });
  }

  if (msg.action === "getStatus") {
    // Report current scraper status
    sendResponse({ active: selecting });
  }
});
