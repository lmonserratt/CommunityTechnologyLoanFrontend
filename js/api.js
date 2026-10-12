/**
 * Community Technology Loan
 * API Client
 *
 * Backend:
 * https://api.jmcallister.dev
 *
 * Authentication:
 * POST /v1/dev/token
 * Body:
 * {
 *   tenantId: "eigen-it"
 * }
 *
 * Protected requests:
 * Authorization: Bearer <JWT>
 */

(function () {
    "use strict";

    // ============================================================
    // CONFIGURATION
    // ============================================================

    const API_PREFIX = "/v1";

    const TOKEN_STORAGE_KEY = "ctl_api_token";
    const TOKEN_EXPIRY_KEY = "ctl_api_token_expiry";
    const TENANT_STORAGE_KEY = "ctl_api_tenant";

    const DEFAULT_TENANT_ID =
        typeof API_TENANT_ID !== "undefined"
            ? API_TENANT_ID
            : "eigen-it";


    // ============================================================
    // API ROUTES
    // ============================================================

    const API_ROUTES = {

        health: "/health",

        auth: {
            token: `${API_PREFIX}/dev/token`
        },

        devices: {
            list: `${API_PREFIX}/inventory`,
            create: `${API_PREFIX}/inventory`,
            get: (id) => `${API_PREFIX}/inventory/${id}`,
            update: (id) => `${API_PREFIX}/inventory/${id}`,
            history: (id) => `${API_PREFIX}/inventory/${id}/history`,
            maintenance: (id) => `${API_PREFIX}/inventory/${id}/maintenance`
        },

        centers: {
            list: `${API_PREFIX}/centers`,
            get: (id) => `${API_PREFIX}/centers/${id}`,
            update: (id) => `${API_PREFIX}/centers/${id}`,
            inventory: (id) => `${API_PREFIX}/centers/${id}/inventory`,
            loans: (id) => `${API_PREFIX}/centers/${id}/loans`
        },

        loans: {
            list: `${API_PREFIX}/loans`,
            get: (id) => `${API_PREFIX}/loans/${id}`,
            update: (id) => `${API_PREFIX}/loans/${id}`,
            return: (id) => `${API_PREFIX}/loans/${id}/return`
        },

        loanReasons: {
            list: `${API_PREFIX}/loan-reasons`
        },

        maintenance: {
            list: `${API_PREFIX}/maintenance`,
            get: (id) => `${API_PREFIX}/maintenance/${id}`,
            update: (id) => `${API_PREFIX}/maintenance/${id}`,
            resolve: (id) => `${API_PREFIX}/maintenance/${id}/resolve`
        }
    };


    // ============================================================
    // API BASE URL
    // ============================================================

    function getApiBaseUrl() {

        if (
            typeof API_BASE_URL === "undefined" ||
            !API_BASE_URL
        ) {
            throw new Error(
                "API_BASE_URL is not defined. Check js/config.js."
            );
        }

        return API_BASE_URL.replace(/\/+$/, "");
    }


    // ============================================================
    // TOKEN STORAGE
    // ============================================================

    function saveApiToken(response) {

        if (!response) {
            throw new Error("Token response is empty.");
        }

        const token = response.token;

        if (!token) {
            throw new Error(
                "Token response did not contain a token."
            );
        }

        localStorage.setItem(
            TOKEN_STORAGE_KEY,
            token
        );

        localStorage.setItem(
            TENANT_STORAGE_KEY,
            DEFAULT_TENANT_ID
        );

        let expiryTime = 0;

        if (response.expiresIn) {

            if (
                typeof response.expiresIn === "number"
            ) {
                expiryTime =
                    Date.now() +
                    response.expiresIn * 1000;
            }

            else if (
                typeof response.expiresIn === "string"
            ) {

                const value =
                    parseInt(
                        response.expiresIn,
                        10
                    );

                if (!isNaN(value)) {

                    if (
                        response.expiresIn
                            .toLowerCase()
                            .includes("h")
                    ) {
                        expiryTime =
                            Date.now() +
                            value *
                            60 *
                            60 *
                            1000;
                    }

                    else if (
                        response.expiresIn
                            .toLowerCase()
                            .includes("m")
                    ) {
                        expiryTime =
                            Date.now() +
                            value *
                            60 *
                            1000;
                    }

                    else {
                        expiryTime =
                            Date.now() +
                            value *
                            1000;
                    }
                }
            }
        }

        if (expiryTime > 0) {

            localStorage.setItem(
                TOKEN_EXPIRY_KEY,
                String(expiryTime)
            );
        }

        return response;
    }


    function getStoredToken() {

        return localStorage.getItem(
            TOKEN_STORAGE_KEY
        );
    }


    function getTokenExpiry() {

        const expiry =
            localStorage.getItem(
                TOKEN_EXPIRY_KEY
            );

        if (!expiry) {
            return null;
        }

        const value =
            parseInt(expiry, 10);

        if (isNaN(value)) {
            return null;
        }

        return value;
    }


    function isTokenExpired() {

        const token =
            getStoredToken();

        if (!token) {
            return true;
        }

        const expiry =
            getTokenExpiry();

        if (!expiry) {

            // If no expiration information exists,
            // allow the token to be used.
            return false;
        }

        // Give the token a small safety window.
        const safetyWindow =
            30 * 1000;

        return (
            Date.now() >=
            expiry - safetyWindow
        );
    }


    function clearApiToken() {

        localStorage.removeItem(
            TOKEN_STORAGE_KEY
        );

        localStorage.removeItem(
            TOKEN_EXPIRY_KEY
        );

        localStorage.removeItem(
            TENANT_STORAGE_KEY
        );
    }


    function isAuthenticated() {

        return (
            !!getStoredToken() &&
            !isTokenExpired()
        );
    }


    // ============================================================
    // DEVELOPMENT TOKEN
    // ============================================================

    async function getDevelopmentToken(
        tenantId = DEFAULT_TENANT_ID
    ) {

        const url =
            getApiBaseUrl() +
            API_ROUTES.auth.token;

        const response =
            await fetch(
                url,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"
                    },

                    body: JSON.stringify({
                        tenantId: tenantId
                    })
                }
            );

        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                `Token request failed: ${response.status} ${response.statusText}` +
                (
                    errorText
                        ? ` - ${errorText}`
                        : ""
                )
            );
        }

        const data =
            await response.json();

        return saveApiToken(data);
    }


    // ============================================================
    // HEADERS
    // ============================================================

    function buildHeaders(
        customHeaders = {},
        includeJson = true
    ) {

        const headers = {
            "Accept":
                "application/json",

            ...customHeaders
        };

        if (
            includeJson &&
            !headers["Content-Type"]
        ) {
            headers["Content-Type"] =
                "application/json";
        }

        const token =
            getStoredToken();

        if (token) {

            headers["Authorization"] =
                `Bearer ${token}`;
        }

        return headers;
    }


    // ============================================================
    // GENERIC API REQUEST
    // ============================================================

    async function apiRequest(
        path,
        options = {},
        retryOnUnauthorized = true
    ) {

        const url =
            path.startsWith("http")
                ? path
                : getApiBaseUrl() + path;

        const method =
            (
                options.method ||
                "GET"
            ).toUpperCase();

        const requestOptions = {
            ...options,

            method: method,

            headers:
                buildHeaders(
                    options.headers || {},
                    method !== "GET" &&
                    method !== "HEAD"
                )
        };

        // --------------------------------------------------------
        // Automatically obtain a development token when needed.
        // --------------------------------------------------------

        const isTokenRequest =
            path === API_ROUTES.auth.token;

        if (
            !isTokenRequest &&
            method !== "OPTIONS" &&
            (
                !getStoredToken() ||
                isTokenExpired()
            )
        ) {

            await getDevelopmentToken(
                DEFAULT_TENANT_ID
            );

            requestOptions.headers =
                buildHeaders(
                    options.headers || {},
                    method !== "GET" &&
                    method !== "HEAD"
                );
        }


        let response;

        try {

            response =
                await fetch(
                    url,
                    requestOptions
                );

        } catch (networkError) {

            throw new Error(
                `Network error while requesting ${url}: ${networkError.message}`
            );
        }


        // --------------------------------------------------------
        // Unauthorized
        // --------------------------------------------------------

        if (
            response.status === 401 &&
            retryOnUnauthorized &&
            !isTokenRequest
        ) {

            clearApiToken();

            await getDevelopmentToken(
                DEFAULT_TENANT_ID
            );

            return apiRequest(
                path,
                options,
                false
            );
        }


        // --------------------------------------------------------
        // No content
        // --------------------------------------------------------

        if (
            response.status === 204
        ) {
            return null;
        }


        // --------------------------------------------------------
        // Read response
        // --------------------------------------------------------

        const contentType =
            response.headers.get(
                "content-type"
            ) || "";

        let data;

        if (
            contentType.includes(
                "application/json"
            )
        ) {

            try {

                data =
                    await response.json();

            } catch (jsonError) {

                throw new Error(
                    "The server returned invalid JSON."
                );
            }

        } else {

            data =
                await response.text();
        }


        // --------------------------------------------------------
        // HTTP error
        // --------------------------------------------------------

        if (!response.ok) {

            let message =
                `API request failed: ${response.status} ${response.statusText}`;

            if (data) {

                if (
                    typeof data === "string"
                ) {

                    message +=
                        ` - ${data}`;

                } else {

                    if (data.message) {

                        message +=
                            ` - ${data.message}`;

                    } else if (
                        data.error
                    ) {

                        message +=
                            ` - ${data.error}`;

                    } else {

                        try {

                            message +=
                                ` - ${JSON.stringify(data)}`;

                        } catch (_) {
                            // Ignore serialization failure.
                        }
                    }
                }
            }

            const error =
                new Error(message);

            error.status =
                response.status;

            error.data =
                data;

            throw error;
        }


        return data;
    }


    // ============================================================
    // HTTP HELPERS
    // ============================================================

    async function apiGet(
        path,
        options = {}
    ) {

        return apiRequest(
            path,
            {
                ...options,
                method: "GET"
            }
        );
    }


    async function apiPost(
        path,
        body = null,
        options = {}
    ) {

        const requestOptions = {
            ...options,
            method: "POST"
        };

        if (body !== null) {

            requestOptions.body =
                JSON.stringify(body);
        }

        return apiRequest(
            path,
            requestOptions
        );
    }


    async function apiPatch(
        path,
        body = null,
        options = {}
    ) {

        const requestOptions = {
            ...options,
            method: "PATCH"
        };

        if (body !== null) {

            requestOptions.body =
                JSON.stringify(body);
        }

        return apiRequest(
            path,
            requestOptions
        );
    }


    async function apiPut(
        path,
        body = null,
        options = {}
    ) {

        const requestOptions = {
            ...options,
            method: "PUT"
        };

        if (body !== null) {

            requestOptions.body =
                JSON.stringify(body);
        }

        return apiRequest(
            path,
            requestOptions
        );
    }


    async function apiDelete(
        path,
        options = {}
    ) {

        return apiRequest(
            path,
            {
                ...options,
                method: "DELETE"
            }
        );
    }


    // ============================================================
    // DEVICE API
    // ============================================================

    const deviceApi = {

        /**
         * Create a device in the inventory.
         */
        create: async function (data) {

            return apiPost(
                API_ROUTES.devices.create,
                data
            );
        },

        /**
         * Get all devices.
         */
        list: async function () {

            return apiGet(
                API_ROUTES.devices.list
            );
        },


        /**
         * Get a single device.
         */
        get: async function (id) {

            return apiGet(
                API_ROUTES.devices.get(id)
            );
        },


        /**
         * Update a device.
         */
        update: async function (
            id,
            data
        ) {

            return apiPatch(
                API_ROUTES.devices.update(id),
                data
            );
        },


        /**
         * Get device history.
         */
        history: async function (id) {

            return apiGet(
                API_ROUTES.devices.history(id)
            );
        },


        /**
         * Get maintenance records for a device.
         */
        maintenance: async function (id) {

            return apiGet(
                API_ROUTES.devices.maintenance(id)
            );
        }
    };


    // ============================================================
    // CENTER API
    // ============================================================

    const centerApi = {

        /**
         * Get all outreach centers.
         */
        list: async function () {

            return apiGet(
                API_ROUTES.centers.list
            );
        },


        /**
         * Get one outreach center.
         */
        get: async function (id) {

            return apiGet(
                API_ROUTES.centers.get(id)
            );
        },


        /**
         * Update an outreach center.
         */
        update: async function (
            id,
            data
        ) {

            return apiPatch(
                API_ROUTES.centers.update(id),
                data
            );
        },


        /**
         * Get center inventory.
         */
        inventory: async function (id) {

            return apiGet(
                API_ROUTES.centers.inventory(id)
            );
        },


        /**
         * Get center loans.
         */
        loans: async function (id) {

            return apiGet(
                API_ROUTES.centers.loans(id)
            );
        }
    };


    // ============================================================
    // LOAN API
    // ============================================================

    const loanApi = {

        /**
         * Get all loans.
         */
        list: async function () {

            return apiGet(
                API_ROUTES.loans.list
            );
        },


        /**
         * Get one loan.
         */
        get: async function (id) {

            return apiGet(
                API_ROUTES.loans.get(id)
            );
        },


        /**
         * Update a loan.
         */
        update: async function (
            id,
            data
        ) {

            return apiPatch(
                API_ROUTES.loans.update(id),
                data
            );
        },


        /**
         * Return a loan.
         */
        returnDevice: async function (
            id,
            data = {}
        ) {

            return apiPost(
                API_ROUTES.loans.return(id),
                data
            );
        }
    };


    // ============================================================
    // LOAN REASON API
    // ============================================================

    const loanReasonApi = {

        /**
         * Get all loan reasons.
         */
        list: async function () {

            return apiGet(
                API_ROUTES.loanReasons.list
            );
        }
    };


    // ============================================================
    // MAINTENANCE API
    // ============================================================

    const maintenanceApi = {

        /**
         * Get all maintenance records.
         */
        list: async function () {

            return apiGet(
                API_ROUTES.maintenance.list
            );
        },


        /**
         * Get one maintenance record.
         */
        get: async function (id) {

            return apiGet(
                API_ROUTES.maintenance.get(id)
            );
        },


        /**
         * Update maintenance record.
         */
        update: async function (
            id,
            data
        ) {

            return apiPatch(
                API_ROUTES.maintenance.update(id),
                data
            );
        },


        /**
         * Resolve maintenance record.
         */
        resolve: async function (
            id,
            data = {}
        ) {

            return apiPost(
                API_ROUTES.maintenance.resolve(id),
                data
            );
        }
    };


    // ============================================================
    // HEALTH API
    // ============================================================

    const healthApi = {

        check: async function () {

            return apiGet(
                API_ROUTES.health
            );
        }
    };


    // ============================================================
    // AUTH API
    // ============================================================

    const authApi = {

        /**
         * Get a fresh development token.
         */
        getDevelopmentToken:
            getDevelopmentToken,


        /**
         * Get currently stored token.
         */
        getToken:
            getStoredToken,


        /**
         * Check authentication state.
         */
        isAuthenticated:
            isAuthenticated,


        /**
         * Get expiration timestamp.
         */
        getTokenExpiry:
            getTokenExpiry,


        /**
         * Clear token.
         */
        logout:
            clearApiToken,


        /**
         * Get current tenant.
         */
        getTenant:
            function () {

                return (
                    localStorage.getItem(
                        TENANT_STORAGE_KEY
                    ) ||
                    DEFAULT_TENANT_ID
                );
            }
    };


    // ============================================================
    // PUBLIC API
    // ============================================================

    window.CTLApi = {

        config: {
            baseUrl:
                getApiBaseUrl(),

            tenantId:
                DEFAULT_TENANT_ID
        },

        routes:
            API_ROUTES,

        request:
            apiRequest,

        get:
            apiGet,

        post:
            apiPost,

        patch:
            apiPatch,

        put:
            apiPut,

        delete:
            apiDelete,

        auth:
            authApi,

        health:
            healthApi,

        devices:
            deviceApi,

        centers:
            centerApi,

        loans:
            loanApi,

        loanReasons:
            loanReasonApi,

        maintenance:
            maintenanceApi
    };


    // ============================================================
    // DEBUG MESSAGE
    // ============================================================

    console.log(
        "Community Technology Loan API client loaded.",
        {
            baseUrl:
                getApiBaseUrl(),

            tenantId:
                DEFAULT_TENANT_ID
        }
    );

})();
