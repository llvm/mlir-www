/**
 * MLIR Operation Search Library
 * Provides search and filtering capabilities for MLIR operations and classes
 */
class MLIRSearch {
    constructor(data) {
        this.data = data;
        this.operations = data.operations || {};
        this.metadata = data.metadata || { namespaces: [], methods: [] };
    }

    /**
     * Search for operations by name (supports partial matching)
     * @param {string} query - Search query
     * @param {Object} filters - Optional filters
     * @param {string} filters.namespace - Filter by namespace
     * @param {string} filters.method - Filter by method name
     * @returns {Array} Array of search results
     */
    searchOperations(query, filters = {}) {
        const results = [];
        const queryLower = query.toLowerCase();

        // If query is empty, return all operations (useful for filtering)
        const operationsToSearch = query ?
            Object.keys(this.operations).filter(op =>
                op.toLowerCase().includes(queryLower)
            ) :
            Object.keys(this.operations);

        for (const operationName of operationsToSearch) {
            const entries = this.operations[operationName];
            const filteredEntries = this.filterEntries(entries, filters);

            if (filteredEntries.length > 0) {
                results.push({
                    operationName,
                    entries: filteredEntries,
                    matchCount: filteredEntries.length
                });
            }
        }

        // Sort by relevance (exact matches first, then by match count)
        return results.sort((a, b) => {
            const aExact = a.operationName.toLowerCase() === queryLower;
            const bExact = b.operationName.toLowerCase() === queryLower;

            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;

            return b.matchCount - a.matchCount;
        });
    }

    /**
     * Filter entries by namespace and/or method
     * @param {Array} entries - Array of class entries
     * @param {Object} filters - Filter criteria
     * @returns {Array} Filtered entries
     */
    filterEntries(entries, filters) {
        return entries.filter(entry => {
            if (filters.namespace && entry.namespace !== filters.namespace) {
                return false;
            }
            if (filters.method && entry.method !== filters.method) {
                return false;
            }
            return true;
        });
    }

    /**
     * Get all available namespaces
     * @returns {Array} Sorted array of namespace names
     */
    getNamespaces() {
        return this.metadata.namespaces;
    }

    /**
     * Get all available methods
     * @returns {Array} Sorted array of method names
     */
    getMethods() {
        return this.metadata.methods;
    }

    /**
     * Generate GitHub search URL for a class name
     * @param {string} className - Qualified class name
     * @returns {string} GitHub search URL
     */
    generateGitHubURL(className) {
        // Extract the actual class name (last part after ::)
        const parts = className.split('::');
        const actualClassName = parts[parts.length - 1];

        // Remove template parameters and special characters for search
        const searchTerm = actualClassName.replace(/<[^>]*>/g, '').replace(/[^\w]/g, '');

        const baseURL = 'https://github.com/llvm/llvm-project/search';
        const params = new URLSearchParams({
            q: searchTerm,
            type: 'code'
        });

        // Add path restriction to mlir/ subtree
        params.set('q', `${searchTerm} path:mlir/`);

        return `${baseURL}?${params.toString()}`;
    }

    /**
     * Get detailed information for a specific class
     * @param {string} className - Qualified class name
     * @returns {Object} Detailed class information
     */
    getClassDetails(className) {
        const methods = new Map(); // method -> Set of operations
        let namespace = '';

        // Search through all operations to find this class
        for (const [operationName, entries] of Object.entries(this.operations)) {
            for (const entry of entries) {
                if (entry.className === className) {
                    namespace = entry.namespace;

                    if (!methods.has(entry.method)) {
                        methods.set(entry.method, new Set());
                    }

                    // Add all operations for this method
                    entry.operations.forEach(op => {
                        methods.get(entry.method).add(op);
                    });
                }
            }
        }

        // Convert to array format for easier rendering
        const methodsArray = Array.from(methods.entries()).map(([method, operations]) => ({
            method,
            operations: Array.from(operations).sort()
        }));

        return {
            className,
            namespace,
            methods: methodsArray,
            totalMethods: methodsArray.length,
            totalOperations: methodsArray.reduce((sum, m) => sum + m.operations.length, 0)
        };
    }

    /**
     * Get operation statistics
     * @returns {Object} Statistics about the data
     */
    getStats() {
        const totalOperations = Object.keys(this.operations).length;
        let totalEntries = 0;
        let totalClasses = new Set();

        for (const entries of Object.values(this.operations)) {
            totalEntries += entries.length;
            entries.forEach(entry => totalClasses.add(entry.className));
        }

        return {
            totalOperations,
            totalEntries,
            totalClasses: totalClasses.size,
            namespaces: this.metadata.namespaces.length,
            methods: this.metadata.methods.length
        };
    }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MLIRSearch;
} else {
    window.MLIRSearch = MLIRSearch;
}
