function getImages() {
  let imgUrls = [];

  document.querySelectorAll("img").forEach((img) => {
    imgUrls.push(img.src);
  });

  chrome.storage.local.clear();

  chrome.storage.local.set({ key: imgUrls }).then(() => {
    console.log("Value is set");
  });
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        function: getImages,
      })
      .then(() => {
        chrome.tabs.create({ url: `index.html` });
      });
  }
});
