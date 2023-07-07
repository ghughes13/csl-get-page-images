function getImages() {
  const imgUrls = [];

  document.querySelectorAll("img").forEach((img) => {
    const imageData = {};

    imageData.src = img.src;
    imageData.alt = img.alt ? img.alt : "";
    imageData.title = img.title ? img.title : "";
    imageData.width = img.width;
    imageData.height = img.height;

    imgUrls.push(imageData);
  });

  const getCssBackgroundImages = (doc) => {
    const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;
    return Array.from(
      Array.from(doc.querySelectorAll("*")).reduce((collection, node) => {
        let prop = window
          .getComputedStyle(node, null)
          .getPropertyValue("background-image");
        let match = srcChecker.exec(prop);
        if (match) {
          collection.add(match[1]);
        }
        return collection;
      }, new Set())
    );
  };

  getCssBackgroundImages(document).forEach((backgroundImg) => {
    const imageData = {};
    imageData.src = backgroundImg;

    imgUrls.push(imageData);
  });

  chrome.storage.local.clear();

  chrome.storage.local.set({ imageDataArray: imgUrls }).then(() => {
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
