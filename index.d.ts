/**
 * @ignore
 */
/**
 *
 * Application API Section
 *
 */
export interface ApplicationApiOptions {
    panelUrl: string;
    apiKey: string;
}
export type UserData = {
    object: "user";
    attributes: {
        id: number;
        external_id: string | null;
        uuid: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        language: string;
        root_admin: boolean;
        "2fa": boolean;
        created_at: string;
        updated_at: string;
    };
};
export type UserDataCreation = {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    password?: string | null;
    language?: string | null;
    root_admin?: boolean | null;
    external_id?: string | null;
};
export interface Server {
    object: "server";
    attributes: {
        id: number;
        external_id: string | null;
        uuid: string;
        identifier: string;
        name: string;
        description: string;
        status: string | null;
        suspended: boolean;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
            threads: number | null;
            oom_disabled: boolean;
        };
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        user: number;
        node: number;
        allocation: number;
        nest: number;
        egg: number;
        container: {
            startup_command: string;
            image: string;
            installed: number;
            environment: Record<string, string>;
        };
        updated_at: string;
        created_at: string;
        relationships?: {
            allocations?: {
                object: "null_resource";
                attributes: Record<string, string>;
            };
            user?: {
                object: "null_resource";
                attributes: object | null;
            };
            subuser?: {
                object: "null_resource";
                attributes: object | null;
            };
            nest?: {
                object: "null_resource";
                attributes: object | null;
            };
            egg?: {
                object: "null_resource";
                attributes: object | null;
            };
            variables?: {
                object: "null_resource";
                attributes: object | null;
            };
            location?: {
                object: "null_resource";
                attributes: object | null;
            };
            node?: {
                object: "null_resource";
                attributes: object | null;
            };
            databases?: {
                object: "null_resource";
                attributes: object | null;
            };
        };
    };
}
export type ServerDataCreation = {
    name: string;
    user: number;
    egg: number;
    docker_image?: string;
    startup?: string;
    enviroment?: object;
    limits: {
        memory: number;
        cpu: number;
        disk: number;
        swap: number;
        io: number;
        threads?: string;
        oom_disabled?: boolean;
    };
    feature_limits: {
        databases: number;
        allocations: number;
        backups: number;
    };
    allocation: {
        default: number;
        additional?: number[];
    };
    deploy?: object;
};
interface ServerUp {
    object: string;
    attributes: Record<string, any>;
}
export interface DatabaseHost {
    id: number;
    name: string;
    host: string;
    port: number;
    username: string;
    max_databases: number;
    created_at: string;
    updated_at: string;
}
export interface ServerDatabase {
    object: "server_database";
    attributes: {
        id: number;
        server: number;
        host: number;
        database: string;
        username: string;
        remote: string;
        max_connections: number;
        created_at: string;
        updated_at: string;
        relationships: {
            host: {
                object: "database_host";
                attributes: DatabaseHost;
            };
        };
    };
}
export interface ServerDatabaseResetPasswd {
    object: "server_database";
    attributes: {
        id: number;
        server: number;
        host: number;
        database: string;
        username: string;
        remote: string;
        max_connections: number;
        password: string;
        created_at: string;
        updated_at: string;
    };
}
/**
 * Represents a geographical location for a node.
 */
export interface Location {
    object: "location";
    attributes: {
        id: number;
        short: string;
        long: string;
        created_at: string;
        updated_at: string;
    };
}
/**
 * Represents an IP address and port allocation on a node.
 */
export interface Allocation {
    object: "allocation";
    attributes: {
        id: number;
        ip: string;
        ip_alias: string | null;
        port: number;
        notes: string | null;
        assigned: boolean;
    };
}
/**
 * Represents a list of allocations.
 */
export interface AllocationList {
    object: "list";
    data: Allocation[];
}
/**
 * Represents the main node object, including its relationships.
 */
export interface Node {
    object: "node";
    attributes: {
        id: number;
        uuid: string;
        public: boolean;
        name: string;
        description: string;
        location_id: number;
        fqdn: string;
        scheme: string;
        behind_proxy: boolean;
        maintenance_mode: boolean;
        memory: number;
        memory_overallocate: number;
        disk: number;
        disk_overallocate: number;
        upload_size: number;
        daemon_listen: number;
        daemon_sftp: number;
        daemon_base: string;
        created_at: string;
        updated_at: string;
        allocated_resources: {
            memory: number;
            disk: number;
        };
    };
    relationships: {
        location: Location;
        allocations: AllocationList;
    };
}
export type nodeConfig = {
    debug: boolean;
    uuid: string;
    token_id: string;
    token: string;
    api: {
        host: string;
        port: number;
        ssl: {
            enabled: boolean;
            cert: string;
            key: string;
        };
        upload_limit: number;
    };
    system: {
        data: string;
        sftp: {
            bind_port: number;
        };
    };
    allowed_mounts: any[];
    remote: string;
};
type NestAttributes = {
    id: number;
    uuid: string;
    author: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
};
type Nest = {
    object: "nest";
    attributes: NestAttributes;
};
export interface Egg {
    object: "egg";
    attributes: {
        id: number;
        uuid: string;
        name: string;
        nest: number;
        author: string;
        description: string;
        docker_image: string;
        docker_images: Record<string, string>;
        config: {
            files: Record<string, {
                parser: string;
                find: Record<string, string>;
            }>;
            startup: Record<string, unknown>;
            stop: string;
            logs: unknown[];
            file_denylist: unknown[];
            extends: string | null;
        };
        startup: string;
        script: {
            privileged: boolean;
            install: string;
            entry: string;
            container: string;
            extends: string | null;
        };
        created_at: string;
        updated_at: string;
        [key: string]: unknown;
    };
}
/**
 * @includeExample ./examples/ApplicationApi.example.ts
 *
 * @author nehxurai
 */
export declare class ApplicationApi {
    private panelUrl;
    private apiKey;
    private customHeaders?;
    /**
     * @param panelUrl - The base URL of the panel API.
     * @param apiKey - The API key for authentication.
     * @param customHeaders - Optional custom headers to include in requests.
     */
    constructor(panelUrl: string, apiKey: string, customHeaders?: Record<string, string>);
    private getHeaders;
    private fetchJson;
    /**
     * Get all users from panel
     * @includeExample ./examples/getAllUser.example.ts
     */
    getAllUser(): Promise<UserData[]>;
    /**
     * Get a user by email
     * @param email User's email
     * @includeExample ./examples/getUserByEmail.example.ts
     */
    getAUserByEmail(email: string): Promise<UserData>;
    /**
     * Get a user by username
     * @param username User's username
     * @includeExample ./examples/getAUserByUsername.example.ts
     */
    getAUserByUsername(username: string): Promise<UserData>;
    /**
     * Get a user by ID
     * @param id User's ID
     * @includeExample ./examples/getAUserById.example.ts
     */
    getAUserById(id: number): Promise<UserData>;
    /**
     * Create a new user
     * @param user User creation data
     * @includeExample ./examples/createAUser.example.ts
     */
    createUser(user: UserDataCreation): Promise<UserData>;
    /**
     * Update a user
     * @param id User ID
     * @param updates Fields to update
     * @includeExample ./examples/updateUser.example.ts
     */
    updateUser(id: number, updates: Partial<UserDataCreation>): Promise<UserData>;
    /**
     * Delete a user by ID
     * @param id User ID
     * @includeExample ./examples/deleteUser.example.ts
     */
    deleteUser(id: number): Promise<Boolean>;
    /**
     * Get all Servers
     * @param filter set a filter
     * @param value set value of the filter
     */
    getAllServers(filter?: string, value?: any): Promise<Server[]>;
    /**
     * Retrieve detailed information about a specific server.
     * @param id Server Id
     * @param include Include relationships (allocations, user, subusers, pack, nest, egg, variables, location, node, databases, backups)
     */
    getAServerById(id: number, include?: string): Promise<Server>;
    /**
     * create a server
     * @param data - Server Data for creation
     */
    createServer({ name, user, egg, docker_image, startup, enviroment, limits, feature_limits, allocation, deploy, }: ServerDataCreation): Promise<false | {
        created: boolean;
        data: Promise<any>;
    }>;
    /**
     * Updates a server's details via the panel API.
     *
     * @param id - The ID of the server to update.
     * @param updatedData - An object containing the updated server fields.
     * @returns The updated server object.
     * @throws Will throw an error if the request fails.
     */
    updateServerDetails(id: number, updatedData: {
        name?: string;
        user?: number;
        external_id?: string;
        description?: string;
    }): Promise<ServerUp>;
    /**
     * Suspend a server
     * @param id Server id
     */
    suspendServer(id: number): Promise<boolean>;
    /**
     * Remove suspension from a server to allow it to start.
     * @param id Server id
     */
    unSuspendServer(id: number): Promise<boolean>;
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
    updateServerBuild(id: number, buildData: {
        allocation: number;
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
        threads?: string;
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        add_allocations?: number[];
        remove_allocations?: number[];
        oom_disabled?: boolean;
    }): Promise<any>;
    /**
     * Updates server start up settings
     *
     * PATCH /api/application/servers/{id}/startup
     *
     * @param id - Server id
     * @param updatedData - updated server start up settings
     * @returns updated Server setting data
     */
    updateServerStartup(id: number, updatedData: {
        startup: string;
        enviroment: object;
        egg: number;
        image?: string;
        skip_scripts?: boolean;
    }): Promise<Server>;
    /**
     * Reinstall the corresponding server
     *
     * POST /api/application/servers/{id}/reinstall
     *
     * @param id - Server Id
     * @return boolean
     */
    reinstallServer(id: number): Promise<boolean>;
    /**
     * Delete a server
     *
     * DELETE /api/application/servers/{id}
     *
     * @param id - server id
     * @param force - force delete server (may damage wings)
     * @returns boolean
     */
    deleteServer(id: number, force?: boolean): Promise<boolean>;
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
    getServerDbs(id: number): Promise<ServerDatabase[]>;
    /**
     * get a server's database details
     *
     * GET /api/application/servers/{id}/databases/{dbId}
     *
     * @param id - server id
     * @param dbID - database id
     * @returns database details
     */
    getServerDB(id: number, dbID: number): Promise<ServerDatabase>;
    /**
     * Create a new database
     *
     * POST /api/application/servers/{id}/databases
     *
     * @param id - server id
     * @param dataDB - database details
     * @returns database
     */
    createServerDB(id: number, dataDB: {
        database: string;
        remote: string;
        host: string;
    }): Promise<ServerDatabase>;
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
    updateServerDB(id: number, dbID: number, dataDB: {
        remote?: string;
    }): Promise<ServerDatabase>;
    resetServerDB(id: number, dbID: number): Promise<ServerDatabaseResetPasswd>;
    /**
     * delete a database from server
     *
     * DELETE /api/application/servers/{id}/databases/{dbID}
     *
     * @param id - server id
     * @param dbID - database id
     * @returns boolean
     */
    deleteServerDB(id: number, dbID: number): Promise<boolean>;
    getAllNodes(options?: {}): Promise<Node[]>;
    createNode(nodeData: {
        name: string;
        description?: string;
        location_id: number;
        fqdn: string;
        scheme?: string;
        behind_proxy?: boolean;
        public?: boolean;
        daemon_base?: string;
        daemon_sftp?: number;
        daemon_listen?: number;
        memory: number;
        memory_overallocate?: number;
        disk: number;
        disk_overallocate?: number;
        upload_size?: boolean;
        maintenance_mode?: boolean;
    }): Promise<Node>;
    getNodeConfiguration(nodeId: number): Promise<nodeConfig>;
    getAllAllocation(nodeId: number): Promise<Allocation[]>;
    createAllocations(nodeId: number, allocationData: {
        ip: string;
        alias: string;
        ports: number[];
    }): Promise<boolean>;
    deleteNode(nodeId: number): Promise<boolean>;
    getAllLocations(options?: {}): Promise<Location[]>;
    createLocation(locationData: {
        short: string;
        long?: string;
    }): Promise<Allocation>;
    updateLocation(locationId: number, updateData: {
        short?: string;
        long?: string;
    }): Promise<Location>;
    deleteLocation(locationId: number): Promise<boolean>;
    getLocationWithNodes(locationId: number): Promise<Location & {
        relationships: {
            nodes: {
                object: "list";
                attributes: {
                    id: number;
                    public: boolean;
                    name: string;
                    fqdn: string;
                    memory: number;
                    disk: number;
                };
            };
        };
    }>;
    /**
     * get all nests
     * @param options - additional options
     */
    getAllNests(options?: {}): Promise<Nest[]>;
    /**
     * get a nest
     *
     * @param nestId - nest id
     */
    getANest(nestId: number): Promise<Nest>;
    /**
     * get all eggs
     *
     * @param nestId - nest id
     */
    getAllEggs(nestId: number): Promise<Egg[]>;
    /**
     * get a egg
     *
     * @param nestId - nest id
     * @param eggId - egg id
     */
    getAEgg(nestId: number, eggId: number): Promise<Egg>;
    getEggById(eggId: number): void;
    getNodesByLocationId(locationId: number): void;
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
export declare function smallUtility(): void;
export type UserDetails = {
    object: "user";
    attributes: {
        id: number;
        admin: boolean;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        language: string;
    };
};
export type TwoFAQRcode = {
    data: {
        image_url_data: string;
        secret: string;
    };
};
export type EnableTwoFA = {
    object: string;
    attributes: {
        tokens: string[];
    };
};
export type DisableTwoFA = {
    errors?: ErrorsType[];
};
export type ErrorsType = {
    code: string;
    status: string;
    detail: string;
};
export type ListAPIKeys = {
    object: string;
    data: Array<{
        object: string;
        attributes: {
            identifier: string;
            description: string;
            allowed_ips: string[];
            last_used_at: string;
            created_at: string;
        };
    }>;
};
export type CreatedAPIKey = {
    object: string;
    attributes: {
        identifier: string;
        description: string;
        allowed_ips: string[];
        last_used_at: string | null;
        created_at: string;
    };
    meta: {
        secret_token: string;
    };
};
export type DatabaseList = {
    object: "list";
    data: {
        object: "server_database";
        attributes: {
            id: string;
            host: {
                address: string;
                port: number;
            };
            name: string;
            username: string;
            connections_from: string;
            max_connections: number;
        };
    }[];
};
export type CreatedDatabase = {
    object: "server_database";
    attributes: {
        id: string;
        host: {
            address: string;
            port: number;
        };
        name: string;
        username: string;
        connections_from: string;
        max_connections: number;
        relationships: {
            password: {
                object: "database_password";
                attributes: {
                    password: string;
                };
            };
        };
    };
};
export type GeneratedPassDatabase = {
    object: "server_database";
    attributes: {
        id: string;
        host: {
            address: string;
            port: number;
        };
        name: string;
        username: string;
        connections_from: string;
        max_connections: number;
        relationships: {
            password: {
                object: "database_password";
                attributes: {
                    password: string;
                };
            };
        };
    };
};
export type FilesList = {
    object: "list";
    data: {
        object: "file_object";
        attributes: {
            name: string;
            mode: string;
            size: number;
            is_file: boolean;
            is_symlink: boolean;
            is_editable: boolean;
            mimetype: string;
            created_at: string;
            modified_at: string;
        };
    }[];
};
export type GeneratedUploadURL = {
    object: "signed_url";
    attributes: {
        url: string;
    };
};
export type SchedulesList = {
    object: "list";
    data: {
        object: "server_schedule";
        attributes: {
            id: number;
            name: string;
            cron: {
                day_of_week: string;
                day_of_month: string;
                hour: string;
                minute: string;
            };
            is_active: boolean;
            is_processing: boolean;
            last_run_at: string | null;
            next_run_at: string;
            created_at: string;
            updated_at: string;
            relationships: {
                tasks: {
                    object: "list";
                    data: {
                        object: "schedule_task";
                        attributes: {
                            id: number;
                            sequence_id: number;
                            action: string;
                            payload: string;
                            time_offset: number;
                            is_queued: boolean;
                            created_at: string;
                            updated_at: string;
                        };
                    }[];
                };
            };
        };
    }[];
};
export type SchedulesDetails = {
    object: "server_schedule";
    attributes: {
        id: number;
        name: string;
        cron: {
            day_of_week: string;
            day_of_month: string;
            hour: string;
            minute: string;
        };
        is_active: boolean;
        is_processing: boolean;
        last_run_at: string | null;
        next_run_at: string;
        created_at: string;
        updated_at: string;
        relationships: {
            tasks: {
                object: "list";
                data: {
                    object: "schedule_task";
                    attributes: {
                        id: number;
                        sequence_id: number;
                        action: string;
                        payload: string;
                        time_offset: number;
                        is_queued: boolean;
                        created_at: string;
                        updated_at: string;
                    };
                }[];
            };
        };
    };
};
export type AllocationsList = {
    object: "list";
    data: {
        object: "allocation";
        attributes: {
            id: number;
            ip: string;
            ip_alias: string | null;
            port: number;
            notes: string | null;
            is_default: boolean;
        };
    }[];
};
export type AutoGeneratedAllocation = {
    object: "allocation";
    attributes: {
        id: number;
        ip: string;
        ip_alias: string | null;
        port: number;
        notes: string | null;
        is_default: boolean;
    };
};
export type ServerSubuser = {
    object: "server_subuser";
    attributes: {
        uuid: string;
        username: string;
        email: string;
        image: string;
        "2fa_enabled": boolean;
        created_at: string;
        permissions: string[];
    };
};
export type UsersList = {
    object: "list";
    data: ServerSubuser[];
};
export type Backup = {
    object: "backup";
    attributes: {
        uuid: string;
        name: string;
        ignored_files: string[];
        sha256_hash: string;
        bytes: number;
        created_at: string;
        completed_at: string;
    };
};
export type BackupsList = {
    object: "list";
    data: Backup[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: Record<string, string>;
        };
    };
};
export type ServerDetails = {
    object: "server";
    attributes: {
        server_owner: boolean;
        identifier: string;
        internal_id: number;
        uuid: string;
        name: string;
        [key: string]: any;
        node: string;
        sftp_details: {
            ip: string;
            port: number;
        };
        description: string;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
            threads: any;
            oom_disabled: boolean;
        };
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        is_suspended: boolean;
        is_installing: boolean;
        relationships: {
            allocations: {
                object: "list";
                data: {
                    object: "allocation";
                    attributes: {
                        id: number;
                        ip: string;
                        ip_alias: string | null;
                        port: number;
                        notes: string | null;
                        is_default: boolean;
                    };
                }[];
            };
            variables: Record<string, any>;
        };
    };
    meta?: {
        is_server_owner: boolean;
        user_permissions: string[];
    };
};
export type ServersList = {
    object: "list";
    data: ServerDetails[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: Record<string, string>;
        };
    };
};
export declare class PterodactylAPIError extends Error {
    status: number;
    statusText: string;
    responseBody?: string | undefined;
    constructor(message: string, status: number, statusText: string, responseBody?: string | undefined);
}
export declare class ValidationError extends PterodactylAPIError {
    constructor(message: string, responseBody?: string);
}
export declare class AuthenticationError extends PterodactylAPIError {
    constructor();
}
export declare class PermissionError extends PterodactylAPIError {
    constructor(message: string, responseBody?: string);
}
export declare enum ServerPermissions {
    CONTROL_CONSOLE = "control.console",
    CONTROL_START = "control.start",
    CONTROL_STOP = "control.stop",
    CONTROL_RESTART = "control.restart",
    USER_CREATE = "user.create",
    USER_READ = "user.read",
    USER_UPDATE = "user.update",
    USER_DELETE = "user.delete",
    FILE_CREATE = "file.create",
    FILE_READ = "file.read",
    FILE_UPDATE = "file.update",
    FILE_DELETE = "file.delete",
    FILE_ARCHIVE = "file.archive",
    FILE_SFTP = "file.sftp",
    ALLOCATION_READ = "allocation.read",
    ALLOCATION_CREATE = "allocation.create",
    ALLOCATION_UPDATE = "allocation.update",
    ALLOCATION_DELETE = "allocation.delete",
    STARTUP_READ = "startup.read",
    STARTUP_UPDATE = "startup.update",
    DATABASE_CREATE = "database.create",
    DATABASE_READ = "database.read",
    DATABASE_UPDATE = "database.update",
    DATABASE_DELETE = "database.delete",
    SCHEDULE_CREATE = "schedule.create",
    SCHEDULE_READ = "schedule.read",
    SCHEDULE_UPDATE = "schedule.update",
    SCHEDULE_DELETE = "schedule.delete",
    BACKUP_CREATE = "backup.create",
    BACKUP_READ = "backup.read",
    BACKUP_DELETE = "backup.delete",
    BACKUP_DOWNLOAD = "backup.download",
    SETTINGS_RENAME = "settings.rename",
    SETTINGS_REINSTALL = "settings.reinstall"
}
export interface ClientApiOptions {
    headers?: Record<string, string>;
    debug?: boolean;
    timeout?: number;
}
/**
 * Pterodactyl Panel Client API
 * A comprehensive TypeScript client for interacting with the Pterodactyl Panel API
 *
 * @author vspcoder
 */
export declare class ClientApi {
    private readonly panelUrl;
    private readonly clientKey;
    private readonly headers;
    private readonly debug;
    private readonly timeout;
    constructor(panelUrl: string, clientKey: string, options?: ClientApiOptions);
    private api;
    getUserDetails(): Promise<UserDetails>;
    getTwoFAQRCode(): Promise<TwoFAQRcode>;
    enableTwoFA(code: number): Promise<EnableTwoFA>;
    disableTwoFA(password: string): Promise<DisableTwoFA>;
    updateEmail(newEmail: string, password: string): Promise<void>;
    updatePassword(currentPassword: string, newPassword: string): Promise<void>;
    listAPIKeys(): Promise<ListAPIKeys>;
    createAPIKey(description: string, allowedIPs?: string[]): Promise<CreatedAPIKey>;
    deleteAPIKey(identifier: string): Promise<void>;
    listServers(options?: {
        includeEgg?: boolean;
        includeSubusers?: boolean;
    }): Promise<ServersList>;
    getServerDetails(serverId: string): Promise<ServerDetails>;
    renameServer(serverId: string, newName: string): Promise<void>;
    reinstallServer(serverId: string): Promise<void>;
    listDatabases(serverId: string): Promise<DatabaseList>;
    createDatabase(serverId: string, database: string, remote: string): Promise<CreatedDatabase>;
    generateDatabasePassword(serverId: string, databaseId: string): Promise<GeneratedPassDatabase>;
    deleteDatabase(serverId: string, databaseId: string): Promise<void>;
    listFiles(serverId: string, directory?: string): Promise<FilesList>;
    readFileContents(serverId: string, filePath: string): Promise<string>;
    writeFile(serverId: string, filePath: string, content: string): Promise<void>;
    renameFile(serverId: string, root: string, from: string, to: string): Promise<void>;
    copyFile(serverId: string, filePath: string): Promise<void>;
    compressFiles(serverId: string, root: string, files: string[]): Promise<void>;
    decompressFile(serverId: string, root: string, file: string): Promise<void>;
    deleteFiles(serverId: string, root: string, files: string[]): Promise<void>;
    createFolder(serverId: string, root: string, name: string): Promise<void>;
    generateUploadURL(serverId: string): Promise<GeneratedUploadURL>;
    downloadFile(serverId: string, filePath: string): Promise<string>;
    listSchedules(serverId: string): Promise<SchedulesList>;
    createSchedule(serverId: string, name: string, cron: {
        minute: string;
        hour: string;
        dayOfMonth: string;
        dayOfWeek: string;
    }, isActive?: boolean): Promise<void>;
    getScheduleDetails(serverId: string, scheduleId: string): Promise<SchedulesDetails>;
    updateSchedule(serverId: string, scheduleId: string, name: string, cron: {
        minute: string;
        hour: string;
        dayOfMonth: string;
        dayOfWeek: string;
    }, isActive?: boolean): Promise<void>;
    deleteSchedule(serverId: string, scheduleId: string): Promise<void>;
    createTask(serverId: string, scheduleId: string, action: "command" | "power" | "backup", payload: string, timeOffset: number): Promise<void>;
    updateTask(serverId: string, scheduleId: string, taskId: string, action: "command" | "power" | "backup", payload: string, timeOffset: number): Promise<void>;
    deleteTask(serverId: string, scheduleId: string, taskId: string): Promise<void>;
    listAllocations(serverId: string): Promise<AllocationsList>;
    assignAllocation(serverId: string): Promise<AutoGeneratedAllocation>;
    setAllocationNote(serverId: string, allocationId: number, notes: string): Promise<void>;
    setPrimaryAllocation(serverId: string, allocationId: number): Promise<void>;
    unassignAllocation(serverId: string, allocationId: number): Promise<void>;
    listUsers(serverId: string): Promise<UsersList>;
    createUser(serverId: string, email: string, permissions: string[]): Promise<void>;
    getSubUserDetails(serverId: string, subuserUuid: string): Promise<ServerSubuser>;
    updateUser(serverId: string, subuserUuid: string, permissions: string[]): Promise<void>;
    deleteUser(serverId: string, subuserUuid: string): Promise<void>;
    listBackups(serverId: string): Promise<BackupsList>;
    createBackup(serverId: string, name?: string, ignored?: string[]): Promise<void>;
    getBackupDetails(serverId: string, backupUuid: string): Promise<Backup>;
    getBackupDownloadLink(serverId: string, backupUuid: string): Promise<{
        object: string;
        attributes: {
            url: string;
        };
    }>;
    deleteBackup(serverId: string, backupUuid: string): Promise<void>;
    listStartupVariables(serverId: string): Promise<any>;
    updateStartupVariable(serverId: string, key: string, value: string): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map