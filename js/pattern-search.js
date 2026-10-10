class MLIRSearch {
  constructor(data) {
    this.operations = data.operations || {};
    this.github_base_url =
      data.github_base_url || "https://github.com/llvm/llvm-project/blob/main/";
  }

  getNamespaces() {
    const namespaces = new Set();
    Object.values(this.operations)
      .flat()
      .forEach((entry) => {
        if (entry.namespace) {
          namespaces.add(entry.namespace);
        }
      });
    return Array.from(namespaces).sort();
  }

  getMethods() {
    const methods = new Set();
    Object.values(this.operations)
      .flat()
      .forEach((entry) => {
        methods.add(entry.method);
      });
    return Array.from(methods).sort();
  }

  getStats() {
    const totalOperations = Object.keys(this.operations).length;

    // Count unique classes from the operations data
    const uniqueClasses = new Set();
    Object.values(this.operations)
      .flat()
      .forEach((entry) => {
        uniqueClasses.add(entry.className);
      });
    const totalClasses = uniqueClasses.size;
    const namespaces = this.getNamespaces().length;
    const methods = this.getMethods().length;

    return {
      totalOperations,
      totalClasses,
      namespaces,
      methods,
    };
  }

  searchOperations(query, filters = {}) {
    let operations = Object.keys(this.operations);

    // Filter by query with regex support
    if (query && query.trim()) {
      const trimmedQuery = query.trim();
      try {
        // Try to use as regex if it contains regex special characters
        if (/[.*+?^${}()|[\]\\]/.test(trimmedQuery)) {
          const regex = new RegExp(trimmedQuery, "i");
          operations = operations.filter((op) => regex.test(op));
        } else {
          // Fall back to simple string matching
          const lowerQuery = trimmedQuery.toLowerCase();
          operations = operations.filter((op) =>
            op.toLowerCase().includes(lowerQuery),
          );
        }
      } catch (regexError) {
        console.warn(
          "Invalid regex pattern, falling back to string matching:",
          regexError.message,
        );
        // If regex is invalid, fall back to string matching
        const lowerQuery = trimmedQuery.toLowerCase();
        operations = operations.filter((op) =>
          op.toLowerCase().includes(lowerQuery),
        );
      }
    }

    // Apply filters
    const results = operations
      .map((operationName) => {
        let entries = this.operations[operationName];

        if (filters.namespace) {
          entries = entries.filter(
            (entry) => entry.namespace === filters.namespace,
          );
        }

        if (filters.method) {
          entries = entries.filter((entry) => entry.method === filters.method);
        }

        if (entries.length === 0) return null;

        return {
          operationName,
          entries,
          matchCount: entries.length,
        };
      })
      .filter((result) => result !== null);

    // Sort by operation name
    results.sort((a, b) => a.operationName.localeCompare(b.operationName));
    return results;
  }

  getClassDetails(className) {
    const methodsMap = new Map();
    let namespace = null;

    if (!className) {
      throw new Error("Class name is required");
    }

    // Collect all operations for this class
    Object.entries(this.operations).forEach(([operationName, entries]) => {
      entries.forEach((entry) => {
        if (entry.className === className) {
          if (!namespace && entry.namespace) {
            namespace = entry.namespace;
          }

          if (!methodsMap.has(entry.method)) {
            methodsMap.set(entry.method, new Set());
          }
          methodsMap.get(entry.method).add(operationName);
        }
      });
    });

    const methods = Array.from(methodsMap.entries())
      .map(([method, operations]) => ({
        method,
        operations: Array.from(operations).sort(),
      }))
      .sort((a, b) => a.method.localeCompare(b.method));

    const totalOperations = methods.reduce(
      (sum, methodInfo) => sum + methodInfo.operations.length,
      0,
    );

    return {
      totalMethods: methods.length,
      totalOperations,
      namespace,
      methods,
    };
  }

  generateGitHubURL(className) {
    // Extract bare class name and template parameters without namespaces
    // Example: ::foo::bar::ClassName<baz::Quux, other::Type> -> search for "ClassName Quux Type"

    const searchTerms = [];

    // Extract bare class name (everything after last :: before any <)
    const templateStart = className.indexOf("<");
    const classNamePart =
      templateStart >= 0 ? className.substring(0, templateStart) : className;
    const lastColonIndex = classNamePart.lastIndexOf("::");
    const bareClassName =
      lastColonIndex >= 0
        ? classNamePart.substring(lastColonIndex + 2)
        : classNamePart;
    searchTerms.push(bareClassName);

    // Extract template parameters if they exist
    if (templateStart >= 0) {
      const templateEnd = className.lastIndexOf(">");
      if (templateEnd > templateStart) {
        const templateContent = className.substring(
          templateStart + 1,
          templateEnd,
        );

        // Split by comma and extract bare names from each parameter
        const params = templateContent.split(",");
        params.forEach((param) => {
          const trimmed = param.trim();
          // Remove any namespace qualification from the parameter
          const lastColonInParam = trimmed.lastIndexOf("::");
          const bareParam =
            lastColonInParam >= 0
              ? trimmed.substring(lastColonInParam + 2)
              : trimmed;
          if (bareParam) {
            searchTerms.push(bareParam);
          }
        });
      }
    }

    const searchQuery = searchTerms.join(" ") + " path:mlir";
    return `https://github.com/llvm/llvm-project/search?q=${encodeURIComponent(searchQuery)}&type=code`;
  }
}

// UI Helper functions to avoid Hugo template parsing issues
window.MLIRPatternSearchUI = {
  buildDetailTitleHTML: function (className, githubURL) {
    return (
      className +
      '<a href="' +
      githubURL +
      '" target="_blank" rel="noopener" class="github-link" style="margin-left: 10px; font-size: 12px; color: rgba(255,255,255,0.8);">' +
      "(GitHub)" +
      "</a>"
    );
  },

  buildStatsHTML: function (details) {
    let html =
      '<div class="detail-stat">' +
      '<div class="detail-stat-value">' +
      details.totalMethods +
      "</div>" +
      '<div class="detail-stat-label">Methods</div>' +
      "</div>" +
      '<div class="detail-stat">' +
      '<div class="detail-stat-value">' +
      details.totalOperations +
      "</div>" +
      '<div class="detail-stat-label">Operations</div>' +
      "</div>";

    if (details.namespace) {
      html +=
        '<div class="detail-stat">' +
        '<div class="detail-stat-value" style="font-size: 12px; font-family: monospace;">' +
        details.namespace +
        "</div>" +
        '<div class="detail-stat-label">Namespace</div>' +
        "</div>";
    }

    return html;
  },

  buildMethodsHTML: function (methods) {
    return methods
      .map(function (methodInfo) {
        const operationsHTML = methodInfo.operations
          .map(function (op) {
            return (
              '<div class="operation-tag" onclick="searchForOperation(this.textContent)" title="Click to search for this operation">' +
              op +
              "</div>"
            );
          })
          .join("");

        return (
          '<div class="method-item">' +
          '<div class="method-header">' +
          "<span>" +
          methodInfo.method +
          "</span>" +
          '<span class="operation-count">' +
          methodInfo.operations.length +
          "</span>" +
          "</div>" +
          '<div class="operations-grid">' +
          operationsHTML +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  },

  buildResultsHeaderText: function (resultsLength, totalEntries, query) {
    if (resultsLength === 0) {
      return query
        ? 'No results found for "' + query + '"'
        : "No operations found";
    }
    return resultsLength + " operations, " + totalEntries + " class entries";
  },
};
