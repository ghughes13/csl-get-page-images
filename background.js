chrome.action.onClicked.addListener((tab) => {
  console.log("sending message");
  chrome.tabs.sendMessage(tab.id, { message: "browser action" });

  function ShowNewPage() {
    chrome.tabs.create({ url: `index.html` }, function (tab) {});
  }

  ShowNewPage();
});
