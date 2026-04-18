// background.js — service worker

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_PANEL" });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  if (msg.type === "NAVIGATE") {
    chrome.tabs.update(sender.tab.id, { url: msg.url });
  }

  if (msg.type === "GET_URLS") {
    chrome.storage.sync.get("urls", (data) => {
      sendResponse({ urls: data.urls || defaultUrls() });
    });
    return true; // async
  }

  if (msg.type === "SET_DEMO") {
    chrome.storage.session.set({ demoActive: !!msg.on });
  }

  if (msg.type === "GET_DEMO") {
    chrome.storage.session.get("demoActive", (data) => {
      sendResponse({ on: !!data.demoActive });
    });
    return true; // async
  }

  if (msg.type === "SAVE_PRE_RUN_URL") {
    chrome.storage.session.set({ preRunUrl: msg.url });
  }

  if (msg.type === "GET_PRE_RUN_URL") {
    chrome.storage.session.get("preRunUrl", (data) => {
      chrome.storage.session.remove("preRunUrl");
      sendResponse({ url: data.preRunUrl || null });
    });
    return true; // async
  }

});

function defaultUrls() {
  return [
    "https://hotglue.me/",
    "https://ilsebouwman.hotglue.me/",
    "https://noiserr.hotglue.me/",
    "https://veravoegelin.hotglue.me/",
    "https://kerttuli.hotglue.me/",
    "https://takataka-dasresearch.hotglue.me/",
    "https://mtc2016.hotglue.me/",
    "https://senteovento.hotglue.me/",
    "https://remihuang.hotglue.me/",
    "https://xmasmountain.hotglue.me/",
    "https://julianaporfirio.hotglue.me/",
    "https://sorry.hotglue.me/",
    "https://hannahandjorgenclub.hotglue.me/",
    "https://xavieralmeida.hotglue.me/",
    "https://maryivanova.hotglue.me/",
    "https://marwan.hotglue.me/",
    "https://kchlo.hotglue.me/",
    "https://palindrom.hotglue.me/",
    "https://krisvangendt.hotglue.me/",
    "https://mariamkvir.hotglue.me/",
    "https://lolososo.hotglue.me/",
    "https://louisbackhouse.hotglue.me/",
    "https://webparcelle.hotglue.me/",
    "https://lnewton.hotglue.me/",
    "https://metodologiascreativas.hotglue.me/",
    "https://monteverita.hotglue.me/",
    "https://zhengtine.hotglue.me/",
    "https://raisamaudit.hotglue.me/",
    "https://matweller.hotglue.me/",
    "https://onefieldfallow.hotglue.me/",
    "https://pinkgames.hotglue.me/",
    "https://ufoostrava.hotglue.me/",
    "https://trahumante.hotglue.me/",
    "https://viktoriamonhor.hotglue.me/"
  ];
}
