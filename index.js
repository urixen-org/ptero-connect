/**
 * @ignore
 */
function removeTrailingSlash(url) {
    return url.endsWith("/") && url.length > 1 ? url.slice(0, -1) : url;
}
/**
 * @includeExample ./examples/ApplicationApi.example.ts
 *
 * @author nehxurai
 */
export class ApplicationApi {
    panelUrl;
    apiKey;
    customHeaders;
    /**
     * @param panelUrl - The base URL of the panel API.
     * @param apiKey - The API key for authentication.
     * @param customHeaders - Optional custom headers to include in requests.
     */
    constructor(panelUrl, apiKey, customHeaders) {
        this.panelUrl = removeTrailingSlash(panelUrl);
        this.apiKey = apiKey;
        this.customHeaders = customHeaders;
    }
    getHeaders() {
        const baseHeaders = {
            Accept: "application/json",
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
        };
        return {
            ...baseHeaders,
            ...(this.customHeaders || {}),
        };
    }
    async fetchJson(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}, ${response.statusText}`);
        }
        return response.json();
    }
    /**
     * Get all users from panel
     * @includeExample ./examples/getAllUser.example.ts
     */
    async getAllUser() {
        const data = await this.fetchJson(`${this.panelUrl}/api/application/users`, { headers: this.getHeaders() });
        return data.data;
    }
    /**
     * Get a user by email
     * @param email User's email
     * @includeExample ./examples/getUserByEmail.example.ts
     */
    async getAUserByEmail(email) {
        const data = await this.fetchJson(`${this.panelUrl}/api/application/users?filter[email]=${encodeURIComponent(email)}`, { headers: this.getHeaders() });
        if (data.data.length === 0)
            throw new Error(`User with email ${email} not found.`);
        return data.data[0];
    }
    /**
     * Get a user by username
     * @param username User's username
     * @includeExample ./examples/getAUserByUsername.example.ts
     */
    async getAUserByUsername(username) {
        const data = await this.fetchJson(`${this.panelUrl}/api/application/users?filter[username]=${encodeURIComponent(username)}`, { headers: this.getHeaders() });
        if (data.data.length === 0)
            throw new Error(`User with username ${username} not found.`);
        return data.data[0];
    }
    /**
     * Get a user by ID
     * @param id User's ID
     * @includeExample ./examples/getAUserById.example.ts
     */
    async getAUserById(id) {
        const data = await this.fetchJson(`${this.panelUrl}/api/application/users/${id}`, { headers: this.getHeaders() });
        return data.data;
    }
    /**
     * Create a new user
     * @param user User creation data
     * @includeExample ./examples/createAUser.example.ts
     */
    async createUser(user) {
        const data = await this.fetchJson(`${this.panelUrl}/api/application/users`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(user),
        });
        return data.data;
    }
    /**
     * Update a user
     * @param id User ID
     * @param updates Fields to update
     * @includeExample ./examples/updateUser.example.ts
     */
    async updateUser(id, updates) {
        const data = await this.fetchJson(`${this.panelUrl}/api/application/users/${id}`, {
            method: "PATCH",
            headers: this.getHeaders(),
            body: JSON.stringify(updates),
        });
        return data.data;
    }
    /**
     * Delete a user by ID
     * @param id User ID
     * @includeExample ./examples/deleteUser.example.ts
     */
    async deleteUser(id) {
        const response = await fetch(`${this.panelUrl}/api/application/users/${id}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.status}, ${response.statusText}`);
            return false;
        }
        return true;
    }
    /**
     * Get all Servers
     * @param filter set a filter
     * @param value set value of the filter
     */
    async getAllServers(filter, value) {
        const url = this.panelUrl +
            "/api/application/servers" +
            (filter ? `?filter[${filter}]=${value}` : "");
        const response = await fetch(url, {
            method: "GET",
            headers: this.getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch all servers: ${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        return data.data;
    }
    /**
     * Retrieve detailed information about a specific server.
     * @param id Server Id
     * @param include Include relationships (allocations, user, subusers, pack, nest, egg, variables, location, node, databases, backups)
     */
    async getAServerById(id, include) {
        const url = this.panelUrl + `/api/application/servers/${id}?include=${include}`;
        const response = await fetch(url, {
            method: "GET",
            headers: this.getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch server:${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    /**
     * create a server
     * @param data - Server Data for creation
     */
    async createServer({ name, user, egg, docker_image, startup, enviroment, limits, feature_limits, allocation, deploy, }) {
        const url = this.panelUrl + "/api/application/servers/";
        const response = await fetch(url, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify({
                name,
                user,
                egg,
                docker_image,
                startup,
                enviroment,
                limits,
                feature_limits,
                allocation,
                deploy,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error creating server: ${response.status}, ${response.statusText}`);
            return false;
        }
        const data = response.json();
        return { created: true, data };
    }
    /**
     * Updates a server's details via the panel API.
     *
     * @param id - The ID of the server to update.
     * @param updatedData - An object containing the updated server fields.
     * @returns The updated server object.
     * @throws Will throw an error if the request fails.
     */
    async updateServerDetails(id, updatedData) {
        const url = `${this.panelUrl}/api/application/servers/${id}/details`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: this.getHeaders(),
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            throw new Error(`Unable to update server details: ${response.status} ${response.statusText}\n${errorText}`);
        }
        const data = await response.json();
        return data;
    }
    /**
     * Suspend a server
     * @param id Server id
     */
    async suspendServer(id) {
        const url = `${this.panelUrl}/api/application/servers/${id}/suspend`;
        const response = await fetch(url, {
            method: "POST",
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`cannot suspend the server: ${response.status}`);
        return true;
    }
    /**
     * Remove suspension from a server to allow it to start.
     * @param id Server id
     */
    async unSuspendServer(id) {
        const url = `${this.panelUrl}/api/application/servers/${id}/unsuspend`;
        const response = await fetch(url, {
            method: "POST",
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`cannot unsuspend the server: ${response.status}`);
        return true;
    }
    /**
     * Update Server Build Configuration
     * Update server resource limits and feature limits.
     *
     * PATCH /api/application/servers/{server}/build
     *
     * @param id - Server ID
     * @param buildData - Build configuration object
     * @returns Updated server object
     */
    async updateServerBuild(id, buildData) {
        const url = `${this.panelUrl}/api/application/servers/${id}/build`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: this.getHeaders(),
            body: JSON.stringify(buildData),
        });
        if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            throw new Error(`Unable to update server build: ${response.status} ${response.statusText}\n${errorText}`);
        }
        return response.json();
    }
    /**
     * Updates server start up settings
     *
     * PATCH /api/application/servers/{id}/startup
     *
     * @param id - Server id
     * @param updatedData - updated server start up settings
     * @returns updated Server setting data
     */
    async updateServerStartup(id, updatedData) {
        const url = `${this.panelUrl}/api/application/servers/${id}/startup`;
        const res = await fetch(url, {
            method: "PATCH",
            headers: this.getHeaders(),
            body: JSON.stringify(updatedData),
        });
        if (!res.ok)
            throw new Error(`Error updating startup: ${res.status}, ${await res.text()}`);
        const data = await res.json();
        return data;
    }
    /**
     * Reinstall the corresponding server
     *
     * POST /api/application/servers/{id}/reinstall
     *
     * @param id - Server Id
     * @return boolean
     */
    async reinstallServer(id) {
        const url = `${this.panelUrl}/api/application/servers/${id}/reinstall`;
        const res = await fetch(url, {
            method: "POST",
            headers: this.getHeaders(),
        });
        if (!res.ok)
            return false;
        return true;
    }
    /**
     * Delete a server
     *
     * DELETE /api/application/servers/{id}
     *
     * @param id - server id
     * @param force - force delete server (may damage wings)
     * @returns boolean
     */
    async deleteServer(id, force = false) {
        const res = await fetch(`${this.panelUrl}/api/application/servers/${id}?force=${force}`, {
            method: "DELETE",
        });
        if (!res.ok)
            return false;
        return true;
    }
    /**
     * Manage server databases through the Application API for administrative control.
     */
    /**
     * get corresponding server databases
     *
     * GET /api/application/servers/{id}/databases
     *
     * @param id - server id
     * @return server databases
     */
    async getServerDbs(id) {
        const url = `${this.panelUrl}/api/application/servers/${id}/databases`;
        const res = await fetch(url, {
            headers: this.getHeaders(),
        });
        if (!res.ok)
            throw new Error(`failed to fetch databases for server ${id}: ${res.status}, ${await res.text()}`);
        const data = await res.json();
        return data.data;
    }
    /**
     * get a server's database details
     *
     * GET /api/application/servers/{id}/databases/{dbId}
     *
     * @param id - server id
     * @param dbID - database id
     * @returns database details
     */
    async getServerDB(id, dbID) {
        const url = `${this.panelUrl}/api/application/servers/${id}/databases/${dbID}`;
        const res = await fetch(url, {
            headers: this.getHeaders(),
        });
        if (!res.ok)
            throw new Error(`failed to fetch database for server ${id}: ${res.status}, ${await res.text()}`);
        const data = await res.json();
        return data;
    }
    /**
     * Create a new database
     *
     * POST /api/application/servers/{id}/databases
     *
     * @param id - server id
     * @param dataDB - database details
     * @returns database
     */
    async createServerDB(id, dataDB) {
        const url = `${this.panelUrl}/api/application/servers/${id}/databases`;
        const res = await fetch(url, {
            headers: this.getHeaders(),
            method: "POST",
            body: JSON.stringify(dataDB),
        });
        if (!res.ok)
            throw new Error(`failed to create database for server ${id}: ${res.status}, ${await res.text()}`);
        const data = await res.json();
        return data;
    }
    /**
     * update server database details
     *
     * PATCH /api/application/servers/{id}/databases/{dbID}
     *
     * @param id - server id
     * @param dbID - database id
     * @param dataDB - data to be updated
     * @returns database details
     */
    async updateServerDB(id, dbID, dataDB) {
        const url = `${this.panelUrl}/api/application/servers/${id}/databases/${dbID}`;
        const res = await fetch(url, {
            headers: this.getHeaders(),
            method: "PATCH",
            body: JSON.stringify(dataDB),
        });
        if (!res.ok)
            throw new Error(`failed to update database for server ${id}: ${res.status}, ${await res.text()}`);
        const data = await res.json();
        return data;
    }
    async resetServerDB(id, dbID) {
        const url = `${this.panelUrl}/api/application/servers/${id}/databases/${dbID}/reset-password`;
        const res = await fetch(url, {
            headers: this.getHeaders(),
            method: "POST",
        });
        if (!res.ok)
            throw new Error(`failed to reset database password for server ${id}: ${res.status}, ${await res.text()}`);
        const data = await res.json();
        return data;
    }
    /**
     * delete a database from server
     *
     * DELETE /api/application/servers/{id}/databases/{dbID}
     *
     * @param id - server id
     * @param dbID - database id
     * @returns boolean
     */
    async deleteServerDB(id, dbID) {
        const url = `${this.panelUrl}/api/application/servers/${id}/databases/${dbID}`;
        const res = await fetch(url, {
            headers: this.getHeaders(),
            method: "DELETE",
        });
        if (!res.ok)
            throw new Error(`failed to delete database for server ${id}: ${res.status}, ${await res.text()}`);
        return true;
    }
    async getAllNodes(options = {}) {
        const params = new URLSearchParams(options);
        const response = await fetch(`${this.panelUrl}/api/application/nodes?${params}`, {
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch all nodes: ${response.status}, ${await response.text()}`);
        const { data } = await response.json();
        return data;
    }
    async createNode(nodeData) {
        const response = await fetch(`${this.panelUrl}/api/application/nodes`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(nodeData),
        });
        return (await response.json());
    }
    async getNodeConfiguration(nodeId) {
        const response = await fetch(`${this.panelUrl}/api/application/nodes/${nodeId}/configuration`, {
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch node config node: ${response.status}, ${await response.text()}`);
        const data = await response.json();
        return data;
    }
    async getAllAllocation(nodeId) {
        const response = await fetch(`${this.panelUrl}/api/application/nodes/${nodeId}/allocations`, {
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch node allocations: ${response.status}, ${await response.text()}`);
        const { data } = await response.json();
        return data;
    }
    async createAllocations(nodeId, allocationData) {
        const response = await fetch(`${this.panelUrl}/api/application/nodes/${nodeId}/allocations`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(allocationData),
        });
        return response.status === 204;
    }
    async deleteNode(nodeId) {
        const response = await fetch(`${this.panelUrl}/api/application/nodes/${nodeId}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        return response.status === 204;
    }
    async getAllLocations(options = {}) {
        const params = new URLSearchParams(options);
        const response = await fetch(`${this.panelUrl}/api/application/locations?${params}`, {
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch loactions: ${response.status}, ${await response.text()}`);
        const { data } = await response.json();
        return data;
    }
    async createLocation(locationData) {
        const response = await fetch(`${this.panelUrl}/api/application/locations`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(locationData),
        });
        if (!response.ok)
            throw new Error(`Failed to create locations: ${response.status}, ${await response.text()}`);
        const data = await response.json();
        return data;
    }
    async updateLocation(locationId, updateData) {
        const response = await fetch(`${this.panelUrl}/api/application/locations/${locationId}`, {
            method: "PATCH",
            headers: this.getHeaders(),
            body: JSON.stringify(updateData),
        });
        if (!response.ok)
            throw new Error(`Failed to update location: ${response.status}, ${await response.text()}`);
        const data = await response.json();
        return data;
    }
    async deleteLocation(locationId) {
        const response = await fetch(`${this.panelUrl}/api/application/locations/${locationId}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        return response.status === 204;
    }
    async getLocationWithNodes(locationId) {
        const response = await fetch(`${this.panelUrl}/api/application/locations/${locationId}?include=nodes`, {
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch location with nodes: ${response.status}, ${await response.text()}`);
        const data = await response.json();
        return data;
    }
    /**
     * get all nests
     * @param options - additional options
     */
    async getAllNests(options = {}) {
        const params = new URLSearchParams(options);
        const response = await fetch(`${this.panelUrl}/api/application/nests?${params}`, {
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch nests: ${response.status}, ${await response.text()}`);
        const { data } = await response.json();
        return data;
    }
    /**
     * get a nest
     *
     * @param nestId - nest id
     */
    async getANest(nestId) {
        const response = await fetch(`${this.panelUrl}/api/application/nests/${nestId}`, {
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch nests: ${response.status}, ${await response.text()}`);
        const data = await response.json();
        return data;
    }
    /**
     * get all eggs
     *
     * @param nestId - nest id
     */
    async getAllEggs(nestId) {
        const response = await fetch(`${this.panelUrl}/api/application/nests/${nestId}/eggs`, {
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch nests: ${response.status}, ${await response.text()}`);
        const { data } = await response.json();
        return data;
    }
    /**
     * get a egg
     *
     * @param nestId - nest id
     * @param eggId - egg id
     */
    async getAEgg(nestId, eggId) {
        const response = await fetch(`${this.panelUrl}/api/application/nests/${nestId}/eggs/${eggId}`, {
            headers: this.getHeaders(),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch nests: ${response.status}, ${await response.text()}`);
        const data = await response.json();
        return data;
    }
    getEggById(eggId) {
        throw new Error("Small Utility not loaded");
    }
    getNodesByLocationId(locationId) {
        throw new Error("Small Utility not loaded");
    }
}
/**
 *
 *  CLIENT API SECTION
 *
 */
/**
 * loads all small utilities available
 * getEggById
 * getNodesByLocationId
 */
export function smallUtility() {
    /**
     * Find egg by ID across all nests
     * @param {number|string} eggId - The egg ID to find
     * @returns {Promise<Object>} - The egg attributes
     * @throws {Error} - If egg is not found
     */
    // @ts-ignore
    ApplicationApi.prototype.getEggById = async function (eggId) {
        try {
            const nests = await this.getAllNests();
            const api = this;
            for (const nest of nests) {
                const nestId = nest.attributes.id;
                try {
                    const eggs = await api.getAllEggs(nestId);
                    const match = eggs.find((e) => e.attributes.id == eggId);
                    if (match) {
                        console.log(`Found egg ${eggId} in nest ${nestId}`);
                        return match;
                    }
                }
                catch (error) {
                    console.warn(`Failed to fetch eggs for nest ${nestId}:`);
                    continue;
                }
            }
            throw new Error(`Egg with ID ${eggId} not found in any nest`);
        }
        catch (error) {
            console.error("Error finding egg:", error);
            throw new Error("Failed to locate egg configuration");
        }
    };
    /**
     * fetch all nodes in a location by location id
     *
     * @param locationId - location id
     */
    // @ts-ignore
    ApplicationApi.prototype.getNodesByLocationId = async function (locationId) {
        const api = this;
        try {
            let nodes = [];
            const response = await api.getAllNodes();
            response.forEach((node) => {
                if (node.attributes.location_id === locationId) {
                    nodes.push(node);
                }
            });
        }
        catch (error) {
            throw new Error(`something went wrong: ${error}`);
        }
    };
}
// Custom error classes for better error handling
export class PterodactylAPIError extends Error {
    status;
    statusText;
    responseBody;
    constructor(message, status, statusText, responseBody) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.responseBody = responseBody;
        this.name = 'PterodactylAPIError';
    }
}
export class ValidationError extends PterodactylAPIError {
    constructor(message, responseBody) {
        super(`Request validation failed: ${message}`, 400, 'Bad Request', responseBody);
        this.name = 'ValidationError';
    }
}
export class AuthenticationError extends PterodactylAPIError {
    constructor() {
        super('Invalid credentials', 401, 'Unauthorized');
        this.name = 'AuthenticationError';
    }
}
export class PermissionError extends PterodactylAPIError {
    constructor(message, responseBody) {
        super(`Insufficient permission: ${message}`, 403, 'Forbidden', responseBody);
        this.name = 'PermissionError';
    }
}
// Enum for common permissions
export var ServerPermissions;
(function (ServerPermissions) {
    ServerPermissions["CONTROL_CONSOLE"] = "control.console";
    ServerPermissions["CONTROL_START"] = "control.start";
    ServerPermissions["CONTROL_STOP"] = "control.stop";
    ServerPermissions["CONTROL_RESTART"] = "control.restart";
    ServerPermissions["USER_CREATE"] = "user.create";
    ServerPermissions["USER_READ"] = "user.read";
    ServerPermissions["USER_UPDATE"] = "user.update";
    ServerPermissions["USER_DELETE"] = "user.delete";
    ServerPermissions["FILE_CREATE"] = "file.create";
    ServerPermissions["FILE_READ"] = "file.read";
    ServerPermissions["FILE_UPDATE"] = "file.update";
    ServerPermissions["FILE_DELETE"] = "file.delete";
    ServerPermissions["FILE_ARCHIVE"] = "file.archive";
    ServerPermissions["FILE_SFTP"] = "file.sftp";
    ServerPermissions["ALLOCATION_READ"] = "allocation.read";
    ServerPermissions["ALLOCATION_CREATE"] = "allocation.create";
    ServerPermissions["ALLOCATION_UPDATE"] = "allocation.update";
    ServerPermissions["ALLOCATION_DELETE"] = "allocation.delete";
    ServerPermissions["STARTUP_READ"] = "startup.read";
    ServerPermissions["STARTUP_UPDATE"] = "startup.update";
    ServerPermissions["DATABASE_CREATE"] = "database.create";
    ServerPermissions["DATABASE_READ"] = "database.read";
    ServerPermissions["DATABASE_UPDATE"] = "database.update";
    ServerPermissions["DATABASE_DELETE"] = "database.delete";
    ServerPermissions["SCHEDULE_CREATE"] = "schedule.create";
    ServerPermissions["SCHEDULE_READ"] = "schedule.read";
    ServerPermissions["SCHEDULE_UPDATE"] = "schedule.update";
    ServerPermissions["SCHEDULE_DELETE"] = "schedule.delete";
    ServerPermissions["BACKUP_CREATE"] = "backup.create";
    ServerPermissions["BACKUP_READ"] = "backup.read";
    ServerPermissions["BACKUP_DELETE"] = "backup.delete";
    ServerPermissions["BACKUP_DOWNLOAD"] = "backup.download";
    ServerPermissions["SETTINGS_RENAME"] = "settings.rename";
    ServerPermissions["SETTINGS_REINSTALL"] = "settings.reinstall";
})(ServerPermissions || (ServerPermissions = {}));
/**
 * Pterodactyl Panel Client API
 * A comprehensive TypeScript client for interacting with the Pterodactyl Panel API
 *
 * @author vspcoder
 */
export class ClientApi {
    panelUrl;
    clientKey;
    headers;
    debug;
    timeout;
    constructor(panelUrl, clientKey, options = {}) {
        this.panelUrl = removeTrailingSlash(panelUrl);
        this.clientKey = clientKey;
        this.debug = options.debug ?? false;
        this.timeout = options.timeout ?? 30000; // 30 seconds default
        this.headers = {
            Accept: "application/json",
            Authorization: `Bearer ${this.clientKey}`,
            "Content-Type": "application/json",
            ...options.headers,
        };
    }
    async api(url, data, method) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        try {
            const fetchOptions = {
                headers: this.headers,
                method: method ?? (data ? "POST" : "GET"),
                body: data
                    ? typeof data === "string"
                        ? data
                        : JSON.stringify(data)
                    : undefined,
                signal: controller.signal,
            };
            if (this.debug) {
                console.time("request_time");
                console.log(`[Req] [${url}]: ${JSON.stringify(fetchOptions)}`);
            }
            const response = await fetch(this.panelUrl + url, fetchOptions);
            if (this.debug) {
                console.timeEnd("request_time");
            }
            if (!response.ok) {
                const errorText = await response.text();
                switch (response.status) {
                    case 400:
                        throw new ValidationError(errorText);
                    case 401:
                        throw new AuthenticationError();
                    case 403:
                        throw new PermissionError(errorText);
                    case 422:
                        throw new ValidationError(`Invalid request data: ${errorText}`, errorText);
                    default:
                        throw new PterodactylAPIError(`API Error: ${response.status} ${response.statusText}`, response.status, response.statusText, errorText);
                }
            }
            if (response.headers.get("Content-Type")?.includes("application/json")) {
                const jsonResponse = await response.json();
                if (this.debug)
                    console.log(`[Res] [${url}]:`, jsonResponse);
                return jsonResponse;
            }
            else {
                const textResponse = await response.text();
                if (this.debug)
                    console.log(`[Res] [${url}]:`, textResponse);
                return textResponse;
            }
        }
        catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                throw new PterodactylAPIError('Request timeout', 408, 'Request Timeout');
            }
            if (this.debug)
                console.error(`[Error] [${url}]:`, error);
            throw error;
        }
        finally {
            clearTimeout(timeoutId);
        }
    }
    // Account Management Methods
    async getUserDetails() {
        return this.api("/api/client/account");
    }
    async getTwoFAQRCode() {
        return this.api("/api/client/account/two-factor");
    }
    async enableTwoFA(code) {
        return this.api("/api/client/account/two-factor", { code: String(code) }, "POST");
    }
    async disableTwoFA(password) {
        return this.api("/api/client/account/two-factor", { password }, "DELETE");
    }
    async updateEmail(newEmail, password) {
        await this.api("/api/client/account/email", { email: newEmail, password }, "PUT");
    }
    async updatePassword(currentPassword, newPassword) {
        await this.api("/api/client/account/password", {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: newPassword,
        }, "PUT");
    }
    // API Key Management
    async listAPIKeys() {
        return this.api("/api/client/account/api-keys");
    }
    async createAPIKey(description, allowedIPs) {
        return this.api("/api/client/account/api-keys", {
            description,
            allowed_ips: allowedIPs,
        }, "POST");
    }
    async deleteAPIKey(identifier) {
        await this.api(`/api/client/account/api-keys/${identifier}`, {}, "DELETE");
    }
    // Server Management
    async listServers(options) {
        const query = new URLSearchParams();
        if (options?.includeEgg)
            query.append('include', 'egg');
        if (options?.includeSubusers)
            query.append('include', 'subusers');
        const queryString = query.toString() ? `?${query.toString()}` : '';
        return this.api(`/api/client${queryString}`);
    }
    async getServerDetails(serverId) {
        return this.api(`/api/client/servers/${serverId}`);
    }
    async renameServer(serverId, newName) {
        await this.api(`/api/client/servers/${serverId}/settings/rename`, { name: newName }, "POST");
    }
    async reinstallServer(serverId) {
        await this.api(`/api/client/servers/${serverId}/settings/reinstall`, {}, "POST");
    }
    // Database Management
    async listDatabases(serverId) {
        return this.api(`/api/client/servers/${serverId}/databases`);
    }
    async createDatabase(serverId, database, remote) {
        return this.api(`/api/client/servers/${serverId}/databases`, { database, remote }, "POST");
    }
    async generateDatabasePassword(serverId, databaseId) {
        return this.api(`/api/client/servers/${serverId}/databases/${databaseId}/rotate-password`, {}, "POST");
    }
    async deleteDatabase(serverId, databaseId) {
        await this.api(`/api/client/servers/${serverId}/databases/${databaseId}`, {}, "DELETE");
    }
    // File Management
    async listFiles(serverId, directory) {
        const query = directory ? `?directory=${encodeURIComponent(directory)}` : "";
        return this.api(`/api/client/servers/${serverId}/files/list${query}`);
    }
    async readFileContents(serverId, filePath) {
        const encodedPath = encodeURIComponent(filePath);
        return this.api(`/api/client/servers/${serverId}/files/contents?file=${encodedPath}`);
    }
    async writeFile(serverId, filePath, content) {
        await this.api(`/api/client/servers/${serverId}/files/write?file=${encodeURIComponent(filePath)}`, content, "POST");
    }
    async renameFile(serverId, root, from, to) {
        await this.api(`/api/client/servers/${serverId}/files/rename`, {
            root,
            files: [{ from, to }],
        }, "PUT");
    }
    async copyFile(serverId, filePath) {
        await this.api(`/api/client/servers/${serverId}/files/copy`, { location: filePath }, "POST");
    }
    async compressFiles(serverId, root, files) {
        await this.api(`/api/client/servers/${serverId}/files/compress`, { root, files }, "POST");
    }
    async decompressFile(serverId, root, file) {
        await this.api(`/api/client/servers/${serverId}/files/decompress`, { root, file }, "POST");
    }
    async deleteFiles(serverId, root, files) {
        await this.api(`/api/client/servers/${serverId}/files/delete`, { root, files }, "POST");
    }
    async createFolder(serverId, root, name) {
        await this.api(`/api/client/servers/${serverId}/files/create-folder`, { root, name }, "POST");
    }
    async generateUploadURL(serverId) {
        return this.api(`/api/client/servers/${serverId}/files/upload`);
    }
    async downloadFile(serverId, filePath) {
        const encodedPath = encodeURIComponent(filePath);
        return this.api(`/api/client/servers/${serverId}/files/download?file=${encodedPath}`);
    }
    // Schedule Management
    async listSchedules(serverId) {
        return this.api(`/api/client/servers/${serverId}/schedules`);
    }
    async createSchedule(serverId, name, cron, isActive = true) {
        await this.api(`/api/client/servers/${serverId}/schedules`, {
            name,
            minute: cron.minute,
            hour: cron.hour,
            day_of_month: cron.dayOfMonth,
            day_of_week: cron.dayOfWeek,
            is_active: isActive,
        }, "POST");
    }
    async getScheduleDetails(serverId, scheduleId) {
        return this.api(`/api/client/servers/${serverId}/schedules/${scheduleId}`);
    }
    async updateSchedule(serverId, scheduleId, name, cron, isActive) {
        const body = {
            name,
            minute: cron.minute,
            hour: cron.hour,
            day_of_month: cron.dayOfMonth,
            day_of_week: cron.dayOfWeek,
        };
        if (typeof isActive !== "undefined") {
            body.is_active = isActive;
        }
        await this.api(`/api/client/servers/${serverId}/schedules/${scheduleId}`, body, "POST");
    }
    async deleteSchedule(serverId, scheduleId) {
        await this.api(`/api/client/servers/${serverId}/schedules/${scheduleId}`, {}, "DELETE");
    }
    // Task Management
    async createTask(serverId, scheduleId, action, payload, timeOffset) {
        await this.api(`/api/client/servers/${serverId}/schedules/${scheduleId}/tasks`, { action, payload, time_offset: timeOffset }, "POST");
    }
    async updateTask(serverId, scheduleId, taskId, action, payload, timeOffset) {
        await this.api(`/api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`, { action, payload, time_offset: timeOffset }, "POST");
    }
    async deleteTask(serverId, scheduleId, taskId) {
        await this.api(`/api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`, {}, "DELETE");
    }
    // Network/Allocation Management
    async listAllocations(serverId) {
        return this.api(`/api/client/servers/${serverId}/network/allocations`);
    }
    async assignAllocation(serverId) {
        return this.api(`/api/client/servers/${serverId}/network/allocations`, {}, "POST");
    }
    async setAllocationNote(serverId, allocationId, notes) {
        await this.api(`/api/client/servers/${serverId}/network/allocations/${allocationId}`, { notes }, "POST");
    }
    async setPrimaryAllocation(serverId, allocationId) {
        await this.api(`/api/client/servers/${serverId}/network/allocations/${allocationId}/primary`, {}, "POST");
    }
    async unassignAllocation(serverId, allocationId) {
        await this.api(`/api/client/servers/${serverId}/network/allocations/${allocationId}`, {}, "DELETE");
    }
    // User Management
    async listUsers(serverId) {
        return this.api(`/api/client/servers/${serverId}/users`);
    }
    async createUser(serverId, email, permissions) {
        await this.api(`/api/client/servers/${serverId}/users`, { email, permissions }, "POST");
    }
    async getSubUserDetails(serverId, subuserUuid) {
        return this.api(`/api/client/servers/${serverId}/users/${subuserUuid}`);
    }
    async updateUser(serverId, subuserUuid, permissions) {
        await this.api(`/api/client/servers/${serverId}/users/${subuserUuid}`, { permissions }, "POST");
    }
    async deleteUser(serverId, subuserUuid) {
        await this.api(`/api/client/servers/${serverId}/users/${subuserUuid}`, {}, "DELETE");
    }
    // Backup Management
    async listBackups(serverId) {
        return this.api(`/api/client/servers/${serverId}/backups`);
    }
    async createBackup(serverId, name, ignored) {
        const body = {};
        if (name)
            body.name = name;
        if (ignored)
            body.ignored = ignored;
        await this.api(`/api/client/servers/${serverId}/backups`, body, "POST");
    }
    async getBackupDetails(serverId, backupUuid) {
        return this.api(`/api/client/servers/${serverId}/backups/${backupUuid}`);
    }
    async getBackupDownloadLink(serverId, backupUuid) {
        return this.api(`/api/client/servers/${serverId}/backups/${backupUuid}/download`);
    }
    async deleteBackup(serverId, backupUuid) {
        await this.api(`/api/client/servers/${serverId}/backups/${backupUuid}`, {}, "DELETE");
    }
    // Startup Variables
    async listStartupVariables(serverId) {
        return this.api(`/api/client/servers/${serverId}/startup`);
    }
    async updateStartupVariable(serverId, key, value) {
        await this.api(`/api/client/servers/${serverId}/startup/variable`, { key, value }, "PUT");
    }
}
/*
interface WebSocketToken {
  object: "websocket_token";
  data: {
    token: string;
    socket: string;
  };
}

export class WebsocketApi {
  private clientApi: ClientApi;
  private ws?: typeof import("ws");

  constructor(clientApi: ClientApi) {
    this.clientApi = clientApi;
  }

  private async loadWs() {
    if (!this.ws) {
      try {
        const mod = await import("ws");
        // "ws" has both CommonJS and ESM export shapes
        this.ws = (mod.WebSocket || (mod as any).default) as typeof import("ws");
      } catch {
        throw new Error(
          "Missing dependency: 'ws'. Please install it to use WebSocket features."
        );
      }
    }
    return this.ws;
  }

  async getToken(serverUUID: string): Promise<WebSocketToken> {
    return this.clientApi.api(
      `/api/client/servers/${serverUUID}/websocket`
    ) as Promise<WebSocketToken>;
  }

  async connect(serverUUID: string) {
    const wsLib = await this.loadWs();
    const {data} = await this.getToken(serverUUID);

    // Create WebSocket connection
    const socket = new wsLib(data.socket, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    socket.onopen = () => {
      console.log("WebSocket connection established");

      // Authenticate with the server
      socket.send(
        JSON.stringify({
          event: "auth",
          args: [data.token],
        })
      );
    };

    return socket;
  }
}*/ 
//# sourceMappingURL=index.js.map