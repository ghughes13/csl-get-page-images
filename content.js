chrome.runtime.onMessage.addListener(function () {
  let imgUrls = [];

  document.querySelectorAll("img").forEach((img) => {
    imgUrls.push(img.src);
  });

  chrome.storage.local.clear();

  chrome.storage.local.set({ key: imgUrls }).then(() => {
    console.log("Value is set");
  });
});
