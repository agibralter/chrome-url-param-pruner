document.getElementById("removeParams").addEventListener("click", function () {
  chrome.tabs
    .query({ active: true, currentWindow: true })
    .then(function (tabs) {
      chrome.runtime.sendMessage({ action: "removeParams" });
    });
});
