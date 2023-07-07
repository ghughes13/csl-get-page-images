chrome.storage.local.get(["imageDataArray"]).then((result) => {
  result.imageDataArray.forEach((img) => {
    if (!img.src || (img.width <= 1 && img.height <= 1)) {
      return;
    }

    const imgEl = `<div class="img-container">
      <img src="${img.src}" alt="${img.alt}" title="${img.title}"/>
    </div>`;

    document.getElementById("img-container").innerHTML += imgEl;
  });

  document.getElementById("img-container").addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const img = e.target;
      let downloadSrc = img.src;

      if (img.src.includes("data:image")) {
        downloadSrc = "data:image/png;base64" + img.src;
      }

      chrome.downloads.download({
        url: downloadSrc,
      });
    }
  });
});
