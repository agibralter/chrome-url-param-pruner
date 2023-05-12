chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "removeParams") {
    chrome.tabs
      .query({ active: true, currentWindow: true })
      .then(function (tabs) {
        const currentUrl = tabs[0].url;
        chrome.storage.sync.get(["configurations"], function (items) {
          const configurations = items.configurations || [];

          for (const config of configurations) {
            const urlPattern = config.urlPattern;
            const paramsToRemove = config.paramsToRemove.split(",");

            // Check if the current URL matches the pattern
            if (currentUrl.includes(urlPattern)) {
              const url = new URL(currentUrl);

              // Remove each specified parameter
              for (const param of paramsToRemove) {
                url.searchParams.delete(param.trim());
              }

              // Update the tab with the new URL
              chrome.tabs.update(tabs[0].id, { url: url.toString() });
              break;
            }
          }
        });
      });
  }
});
