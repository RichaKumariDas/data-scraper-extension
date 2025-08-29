let selecting = false;
let scrapedData = [];
let selectedElements = new Map();

const getKey = (el) => el.tagName + "-" + Date.now() + "-" + Math.random();

document.addEventListener("click", (e) => {
  if (!selecting) return;
  e.stopPropagation();

  const el = e.target;
  const tag = el.tagName;
  const text = (el.innerText || "").trim();
  const key = getKey(el);

  if (text && !selectedElements.has(key)) {
    scrapedData.push({ tag, text });
    selectedElements.set(key, el);
    el.classList.add("ds-highlight");
  }
}, true);

document.addEventListener("dblclick", (e) => {
  if (!selecting) return;
  e.stopPropagation();

  const el = e.target;
  for (let [key, node] of selectedElements.entries()) {
    if (node === el) {
      scrapedData = scrapedData.filter((d) => d.text !== el.innerText.trim());
      el.classList.remove("ds-highlight");
      selectedElements.delete(key);
    }
  }
}, true);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "toggleScraper") {
    selecting = !selecting;
    sendResponse({ active: selecting });
  }
  if (msg.action === "getData") {
    sendResponse(scrapedData);
  }
  if (msg.action === "clearData") {
    scrapedData = [];
    selectedElements.forEach((el) => el.classList.remove("ds-highlight"));
    selectedElements.clear();
    sendResponse({ success: true });
  }
  if (msg.action === "getStatus") {
    sendResponse({ active: selecting });
  }
});
