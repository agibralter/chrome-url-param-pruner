// Load saved configurations
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(["configurations"], function (items) {
    const configurations = items.configurations || [];

    // Display each saved configuration
    const savedConfigurationsElement = document.getElementById(
      "savedConfigurations"
    );
    for (let i = 0; i < configurations.length; i++) {
      const configElement = document.createElement("div");
      const deleteButton = document.createElement("button");

      configElement.textContent = `URL Pattern: ${configurations[i].urlPattern}, Parameters to Remove: ${configurations[i].paramsToRemove}`;
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteConfiguration(i);
      });

      configElement.appendChild(deleteButton);
      savedConfigurationsElement.appendChild(configElement);
    }
  });
});

// Save a new configuration
document.getElementById("optionsForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newConfiguration = {
    urlPattern: document.getElementById("urlPattern").value,
    paramsToRemove: document.getElementById("paramsToRemove").value,
  };

  chrome.storage.sync.get(["configurations"], function (items) {
    const configurations = items.configurations || [];
    configurations.push(newConfiguration);
    chrome.storage.sync.set({ configurations: configurations }, function () {
      alert("Configuration saved.");
      location.reload();
    });
  });
});

// Delete a configuration
function deleteConfiguration(index) {
  chrome.storage.sync.get(["configurations"], function (items) {
    const configurations = items.configurations || [];
    configurations.splice(index, 1);
    chrome.storage.sync.set({ configurations: configurations }, function () {
      alert("Configuration deleted.");
      location.reload();
    });
  });
}
