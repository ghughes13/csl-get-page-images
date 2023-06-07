chrome.storage.local.get(["key"]).then((result) => {
  JSON.stringify(result.key);
  result.key.forEach((url) => {
    url = url.replace(/[\[\]"']+/g, "");

    const imgEl = `
    <div class="img-container">
      <a href="${url}" download>
        <img src="${url}" alt="image" />
      </a>
    </div>`;

    document.getElementById("img-container").innerHTML += imgEl;
  });
});
