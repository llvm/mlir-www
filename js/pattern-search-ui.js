let searchEngine = null;
let selectedAutocompleteIndex = -1;
let autocompleteVisible = false;

// Initialize the application
async function init() {
  try {
    const jsonPath = "/pattern-search/pattern-index.json";
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();

    searchEngine = new MLIRSearch(data);

    populateFilters();
    updateStats();
    setupEventListeners();

    // Initial empty search to show all operations
    performSearch();
  } catch (error) {
    console.error("Failed to initialize pattern search:", error);
    document.getElementById("results").innerHTML =
      '<div class="no-results">Error loading data: ' + error.message + "</div>";
  }
}

function populateFilters() {
  const namespaceSelect = document.getElementById("namespaceFilter");
  const methodSelect = document.getElementById("methodFilter");

  // Clear existing options (except first one)
  namespaceSelect.innerHTML = '<option value="">All Namespaces</option>';
  methodSelect.innerHTML = '<option value="">All Methods</option>';

  // Populate namespaces
  searchEngine.getNamespaces().forEach((namespace) => {
    const option = document.createElement("option");
    option.value = namespace;
    option.textContent = namespace;
    namespaceSelect.appendChild(option);
  });

  // Populate methods
  searchEngine.getMethods().forEach((method) => {
    const option = document.createElement("option");
    option.value = method;
    option.textContent = method;
    methodSelect.appendChild(option);
  });
}

function updateStats() {
  const stats = searchEngine.getStats();
  document.getElementById("stats").textContent =
    stats.totalOperations +
    " operations, " +
    stats.totalClasses +
    " classes, " +
    stats.namespaces +
    " namespaces, " +
    stats.methods +
    " methods";
}

function updateAutocomplete(query) {
  const dropdown = document.getElementById("autocompleteDropdown");

  if (!query || query.length < 1) {
    hideAutocomplete();
    return;
  }

  // Get matching operations
  const operations = Object.keys(searchEngine.operations);
  const matches = operations
    .filter((op) => op.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      // Prioritize exact matches and prefix matches
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      const queryLower = query.toLowerCase();

      const aExact = aLower === queryLower;
      const bExact = bLower === queryLower;
      const aPrefix = aLower.startsWith(queryLower);
      const bPrefix = bLower.startsWith(queryLower);

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      if (aPrefix && !bPrefix) return -1;
      if (!aPrefix && bPrefix) return 1;

      return a.localeCompare(b);
    })
    .slice(0, 8); // Limit to 8 results

  if (matches.length === 0) {
    hideAutocomplete();
    return;
  }

  // Build dropdown HTML
  dropdown.innerHTML = matches
    .map((op, index) => {
      const entryCount = searchEngine.operations[op].length;
      return (
        '<div class="autocomplete-item" data-operation="' +
        op +
        '" data-index="' +
        index +
        '">' +
        '<div class="operation-name">' +
        op +
        "</div>" +
        '<span class="operation-count">' +
        entryCount +
        " " +
        (entryCount === 1 ? "entry" : "entries") +
        "</span>" +
        "</div>"
      );
    })
    .join("");

  // Add click handlers
  dropdown.querySelectorAll(".autocomplete-item").forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      e.preventDefault(); // Prevent input blur
      selectAutocompleteItem(item.dataset.operation);
    });
  });

  showAutocomplete();
  selectedAutocompleteIndex = -1;
}

function showAutocomplete() {
  document.getElementById("autocompleteDropdown").classList.add("show");
  autocompleteVisible = true;
}

function hideAutocomplete() {
  document.getElementById("autocompleteDropdown").classList.remove("show");
  autocompleteVisible = false;
  selectedAutocompleteIndex = -1;
  updateAutocompleteSelection();
}

function handleAutocompleteKeydown(e) {
  if (!autocompleteVisible) return;

  const items = document.querySelectorAll(".autocomplete-item");

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      selectedAutocompleteIndex = Math.min(
        selectedAutocompleteIndex + 1,
        items.length - 1,
      );
      updateAutocompleteSelection();
      break;

    case "ArrowUp":
      e.preventDefault();
      selectedAutocompleteIndex = Math.max(selectedAutocompleteIndex - 1, -1);
      updateAutocompleteSelection();
      break;

    case "Enter":
      e.preventDefault();
      if (
        selectedAutocompleteIndex >= 0 &&
        selectedAutocompleteIndex < items.length
      ) {
        const selectedOperation =
          items[selectedAutocompleteIndex].dataset.operation;
        selectAutocompleteItem(selectedOperation);
      } else {
        hideAutocomplete();
      }
      break;

    case "Escape":
      hideAutocomplete();
      break;
  }
}

function updateAutocompleteSelection() {
  const items = document.querySelectorAll(".autocomplete-item");
  items.forEach((item, index) => {
    item.classList.toggle("selected", index === selectedAutocompleteIndex);
  });
}

function selectAutocompleteItem(operation) {
  document.getElementById("searchInput").value = operation;
  hideAutocomplete();
  performSearch();
}

function setupEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const namespaceFilter = document.getElementById("namespaceFilter");
  const methodFilter = document.getElementById("methodFilter");
  const autocompleteDropdown = document.getElementById("autocompleteDropdown");

  // Debounced search
  let searchTimeout;
  const debouncedSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 300);
  };

  // Autocomplete handling
  let autocompleteTimeout;
  const debouncedAutocomplete = () => {
    clearTimeout(autocompleteTimeout);
    autocompleteTimeout = setTimeout(() => {
      updateAutocomplete(searchInput.value);
    }, 150);
  };

  searchInput.addEventListener("input", (e) => {
    debouncedSearch();
    debouncedAutocomplete();
  });

  searchInput.addEventListener("keydown", (e) => {
    handleAutocompleteKeydown(e);
  });

  searchInput.addEventListener("blur", (e) => {
    // Delay hiding to allow clicks on autocomplete items
    setTimeout(() => {
      hideAutocomplete();
    }, 150);
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.length > 0) {
      updateAutocomplete(searchInput.value);
    }
  });

  namespaceFilter.addEventListener("change", () => {
    hideAutocomplete();
    performSearch();
  });

  methodFilter.addEventListener("change", () => {
    hideAutocomplete();
    performSearch();
  });

  // Clear filters on double-click
  namespaceFilter.addEventListener("dblclick", () => {
    namespaceFilter.value = "";
    performSearch();
  });

  methodFilter.addEventListener("dblclick", () => {
    methodFilter.value = "";
    performSearch();
  });

  // Hide autocomplete when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !searchInput.contains(e.target) &&
      !autocompleteDropdown.contains(e.target)
    ) {
      hideAutocomplete();
    }
  });
}

function performSearch() {
  const query = document.getElementById("searchInput").value.trim();
  const namespace = document.getElementById("namespaceFilter").value;
  const method = document.getElementById("methodFilter").value;

  navigateToSearch(query, namespace, method);
}

function displayResults(results, query) {
  const resultsContainer = document.getElementById("results");
  const resultsHeader = document.getElementById("resultsCount");

  const totalEntries = results.reduce(
    (sum, result) => sum + result.matchCount,
    0,
  );
  resultsHeader.textContent = window.MLIRPatternSearchUI.buildResultsHeaderText(
    results.length,
    totalEntries,
    query,
  );

  if (results.length === 0) {
    resultsContainer.innerHTML =
      '<div class="no-results">No matching operations found. Try adjusting your search or filters.</div>';
    return;
  }

  resultsContainer.innerHTML = results
    .map((result) => createResultHTML(result))
    .join("");
}

function createResultHTML(result) {
  return (
    '<div class="result-item">' +
    '<div class="operation-name">' +
    result.operationName +
    "</div>" +
    result.entries.map((entry) => createEntryHTML(entry)).join("") +
    "</div>"
  );
}

function createEntryHTML(entry) {
  const escapedClassName = entry.className
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"');
  let html =
    '<div class="class-entry">' +
    '<div class="class-name" style="text-align: left;">' +
    '<span class="value" style="margin-right: 10px;">' +
    entry.method +
    "</span>" +
    '<a href="#" onclick="showClassDetails(\'' +
    escapedClassName +
    "'); return false;\">" +
    entry.className +
    "</a>" +
    '<a href="' +
    searchEngine.generateGitHubURL(entry.className) +
    '" target="_blank" rel="noopener" class="github-link">' +
    "(GitHub)" +
    "</a>" +
    "</div>" +
    '<div class="class-details">';

  if (entry.operations.length > 1) {
    html +=
      '<div class="detail-item">' +
      '<span class="label">Operations:</span>' +
      '<div class="operations-list">' +
      entry.operations
        .map((op) => '<span class="value">' + op + "</span>")
        .join("") +
      "</div>" +
      "</div>";
  }

  html += "</div>" + "</div>";

  return html;
}

// Simple history management
let currentView = "search"; // 'search' or 'detail'

function navigateToSearch(query = "", namespace = "", method = "") {
  // Always show search view
  document.getElementById("detailContainer").style.display = "none";
  document.getElementById("resultsContainer").style.display = "block";
  currentView = "search";

  // Update form values
  document.getElementById("searchInput").value = query;
  document.getElementById("namespaceFilter").value = namespace;
  document.getElementById("methodFilter").value = method;

  // Update URL
  const url = new URL(window.location);
  url.searchParams.delete("class");
  if (query) url.searchParams.set("q", query);
  else url.searchParams.delete("q");
  if (namespace) url.searchParams.set("namespace", namespace);
  else url.searchParams.delete("namespace");
  if (method) url.searchParams.set("method", method);
  else url.searchParams.delete("method");

  // Push to history
  const state = { view: "search", query, namespace, method };
  history.pushState(state, "MLIR Patterns - Search", url.toString());

  // Perform search
  const results = searchEngine.searchOperations(query, { namespace, method });
  displayResults(results, query);
}

function navigateToDetail(className) {
  // Show detail view
  document.getElementById("resultsContainer").style.display = "none";
  document.getElementById("detailContainer").style.display = "block";
  currentView = "detail";

  // Get and display details
  const details = searchEngine.getClassDetails(className);
  document.getElementById("detailTitle").innerHTML =
    window.MLIRPatternSearchUI.buildDetailTitleHTML(
      className,
      searchEngine.generateGitHubURL(className),
    );
  document.getElementById("detailStats").innerHTML =
    window.MLIRPatternSearchUI.buildStatsHTML(details);
  document.getElementById("methodsList").innerHTML =
    window.MLIRPatternSearchUI.buildMethodsHTML(details.methods);

  // Update URL
  const url = new URL(window.location);
  url.searchParams.set("class", className);
  url.searchParams.delete("q");
  url.searchParams.delete("namespace");
  url.searchParams.delete("method");

  // Push to history
  const state = { view: "detail", className };
  history.pushState(state, "MLIR Patterns - " + className, url.toString());
}

function navigateToSearchInitial() {
  // Initial search without pushing to history (called on page load)
  document.getElementById("detailContainer").style.display = "none";
  document.getElementById("resultsContainer").style.display = "block";
  currentView = "search";

  const query = document.getElementById("searchInput").value.trim();
  const namespace = document.getElementById("namespaceFilter").value;
  const method = document.getElementById("methodFilter").value;

  // Update URL without pushing to history
  const url = new URL(window.location);
  url.searchParams.delete("class");
  if (query) url.searchParams.set("q", query);
  if (namespace) url.searchParams.set("namespace", namespace);
  if (method) url.searchParams.set("method", method);

  const state = { view: "search", query, namespace, method };
  history.replaceState(state, "MLIR Patterns - Search", url.toString());

  // Perform search
  const results = searchEngine.searchOperations(query, { namespace, method });
  displayResults(results, query);
}

function showClassDetails(className) {
  navigateToDetail(className);
}

function goBack() {
  history.back();
}

function handlePopState(event) {
  if (event.state) {
    if (event.state.view === "detail") {
      // Restore detail view without adding to history
      currentView = "detail";
      document.getElementById("resultsContainer").style.display = "none";
      document.getElementById("detailContainer").style.display = "block";

      const className = event.state.className;
      const details = searchEngine.getClassDetails(className);
      document.getElementById("detailTitle").innerHTML =
        window.MLIRPatternSearchUI.buildDetailTitleHTML(
          className,
          searchEngine.generateGitHubURL(className),
        );
      document.getElementById("detailStats").innerHTML =
        window.MLIRPatternSearchUI.buildStatsHTML(details);
      document.getElementById("methodsList").innerHTML =
        window.MLIRPatternSearchUI.buildMethodsHTML(details.methods);
    } else {
      // Restore search view without adding to history
      currentView = "search";
      document.getElementById("detailContainer").style.display = "none";
      document.getElementById("resultsContainer").style.display = "block";

      const query = event.state.query || "";
      const namespace = event.state.namespace || "";
      const method = event.state.method || "";

      document.getElementById("searchInput").value = query;
      document.getElementById("namespaceFilter").value = namespace;
      document.getElementById("methodFilter").value = method;

      const results = searchEngine.searchOperations(query, {
        namespace,
        method,
      });
      displayResults(results, query);
    }
  } else {
    // No state, show initial search
    navigateToSearchInitial();
  }
}

function searchForOperation(operationName) {
  // Hide autocomplete if visible
  hideAutocomplete();

  // Navigate to search with the operation name
  navigateToSearch(operationName, "", "");
}

// Handle browser navigation
window.addEventListener("popstate", handlePopState);

// Handle escape key to go back
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && currentView === "detail") {
    goBack();
  }
});

// Start the application
async function startApp() {
  try {
    await init();

    const urlParams = new URLSearchParams(window.location.search);
    const className = urlParams.get("class");
    const query = urlParams.get("q") || "";
    const namespace = urlParams.get("namespace") || "";
    const method = urlParams.get("method") || "";

    // Set form values from URL
    document.getElementById("searchInput").value = query;
    document.getElementById("namespaceFilter").value = namespace;
    document.getElementById("methodFilter").value = method;

    if (className) {
      // Show detail view for specific class without adding to history (this is initial load)
      currentView = "detail";
      document.getElementById("resultsContainer").style.display = "none";
      document.getElementById("detailContainer").style.display = "block";

      const details = searchEngine.getClassDetails(className);
      document.getElementById("detailTitle").innerHTML =
        window.MLIRPatternSearchUI.buildDetailTitleHTML(
          className,
          searchEngine.generateGitHubURL(className),
        );
      document.getElementById("detailStats").innerHTML =
        window.MLIRPatternSearchUI.buildStatsHTML(details);
      document.getElementById("methodsList").innerHTML =
        window.MLIRPatternSearchUI.buildMethodsHTML(details.methods);

      // Set initial state without pushing
      const state = { view: "detail", className };
      history.replaceState(
        state,
        "MLIR Patterns - " + className,
        window.location.toString(),
      );
    } else {
      // Show search results
      navigateToSearchInitial();
    }
  } catch (error) {
    console.error("Failed to start app:", error);
    document.getElementById("results").innerHTML =
      '<div class="no-results">Application failed to start: ' +
      error.message +
      "</div>";
  }
}

startApp();
