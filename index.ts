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

type ApiResponse<T> = {
  object: string;
  data: T[];
};

type SingleApiResponse<T> = {
  object: string;
  data: T;
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

function removeTrailingSlash(url: string): string {
  return url.endsWith("/") && url.length > 1 ? url.slice(0, -1) : url;
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
    created_at: string; // ISO 8601 timestamp
    updated_at: string; // ISO 8601 timestamp
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
      files: Record<
        string,
        {
          parser: string;
          find: Record<string, string>;
        }
      >;
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
    [key: string]: unknown; // allows extra dynamic fields without breaking type safety
  };
}

/**
 * @includeExample ./examples/ApplicationApi.example.ts
 * 
 * @author nehxurai
 */
export class ApplicationApi {
  private panelUrl: string;
  private apiKey: string;
  private customHeaders?: Record<string, string>;

  /**
   * @param panelUrl - The base URL of the panel API.
   * @param apiKey - The API key for authentication.
   * @param customHeaders - Optional custom headers to include in requests.
   */
  constructor(
    panelUrl: string,
    apiKey: string,
    customHeaders?: Record<string, string>
  ) {
    this.panelUrl = removeTrailingSlash(panelUrl);
    this.apiKey = apiKey;
    this.customHeaders = customHeaders;
  }

  private getHeaders(): HeadersInit {
    const baseHeaders: Record<string, string> = {
      Accept: "application/json",
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };

    return {
      ...baseHeaders,
      ...(this.customHeaders || {}),
    };
  }
  private async fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status}, ${response.statusText}`
      );
    }
    return response.json();
  }

  /**
   * Get all users from panel
   * @includeExample ./examples/getAllUser.example.ts
   */
  async getAllUser(): Promise<UserData[]> {
    const data = await this.fetchJson<ApiResponse<UserData>>(
      `${this.panelUrl}/api/application/users`,
      { headers: this.getHeaders() }
    );
    return data.data;
  }

  /**
   * Get a user by email
   * @param email User's email
   * @includeExample ./examples/getUserByEmail.example.ts
   */
  async getAUserByEmail(email: string): Promise<UserData> {
    const data = await this.fetchJson<ApiResponse<UserData>>(
      `${
        this.panelUrl
      }/api/application/users?filter[email]=${encodeURIComponent(email)}`,
      { headers: this.getHeaders() }
    );
    if (data.data.length === 0)
      throw new Error(`User with email ${email} not found.`);
    return data.data[0];
  }

  /**
   * Get a user by username
   * @param username User's username
   * @includeExample ./examples/getAUserByUsername.example.ts
   */
  async getAUserByUsername(username: string): Promise<UserData> {
    const data = await this.fetchJson<ApiResponse<UserData>>(
      `${
        this.panelUrl
      }/api/application/users?filter[username]=${encodeURIComponent(username)}`,
      { headers: this.getHeaders() }
    );
    if (data.data.length === 0)
      throw new Error(`User with username ${username} not found.`);
    return data.data[0];
  }

  /**
   * Get a user by ID
   * @param id User's ID
   * @includeExample ./examples/getAUserById.example.ts
   */
  async getAUserById(id: number): Promise<UserData> {
    const data = await this.fetchJson<SingleApiResponse<UserData>>(
      `${this.panelUrl}/api/application/users/${id}`,
      { headers: this.getHeaders() }
    );
    return data.data;
  }

  /**
   * Create a new user
   * @param user User creation data
   * @includeExample ./examples/createAUser.example.ts
   */
  async createUser(user: UserDataCreation): Promise<UserData> {
    const data = await this.fetchJson<SingleApiResponse<UserData>>(
      `${this.panelUrl}/api/application/users`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(user),
      }
    );
    return data.data;
  }

  /**
   * Update a user
   * @param id User ID
   * @param updates Fields to update
   * @includeExample ./examples/updateUser.example.ts
   */
  async updateUser(
    id: number,
    updates: Partial<UserDataCreation>
  ): Promise<UserData> {
    const data = await this.fetchJson<SingleApiResponse<UserData>>(
      `${this.panelUrl}/api/application/users/${id}`,
      {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(updates),
      }
    );
    return data.data;
  }

  /**
   * Delete a user by ID
   * @param id User ID
   * @includeExample ./examples/deleteUser.example.ts
   */
  async deleteUser(id: number): Promise<Boolean> {
    const response = await fetch(
      `${this.panelUrl}/api/application/users/${id}`,
      {
        method: "DELETE",
        headers: this.getHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to delete user: ${response.status}, ${response.statusText}`
      );
      return false;
    }
    return true;
  }
  /**
   * Get all Servers
   * @param filter set a filter
   * @param value set value of the filter
   */
  async getAllServers(filter?: string, value?: any) {
    const url =
      this.panelUrl +
      "/api/application/servers" +
      (filter ? `?filter[${filter}]=${value}` : "");
    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch all servers: ${response.status}, ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data as Server[];
  }
  /**
   * Retrieve detailed information about a specific server.
   * @param id Server Id
   * @param include Include relationships (allocations, user, subusers, pack, nest, egg, variables, location, node, databases, backups)
   */
  async getAServerById(id: number, include?: string) {
    const url =
      this.panelUrl + `/api/application/servers/${id}?include=${include}`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch server:${response.status}, ${response.statusText}`
      );
    }
    const data = await response.json();
    return data as Server;
  }
  /**
   * create a server
   * @param data - Server Data for creation
   */
  async createServer({
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
  }: ServerDataCreation) {
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
      throw new Error(
        `Error creating server: ${response.status}, ${response.statusText}`
      );
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
  async updateServerDetails(
    id: number,
    updatedData: {
      name?: string;
      user?: number;
      external_id?: string;
      description?: string;
    }
  ): Promise<ServerUp> {
    const url = `${this.panelUrl}/api/application/servers/${id}/details`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(
        `Unable to update server details: ${response.status} ${response.statusText}\n${errorText}`
      );
    }

    const data = await response.json();
    return data as Server;
  }
  /**
   * Suspend a server
   * @param id Server id
   */
  async suspendServer(id: number) {
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
  async unSuspendServer(id: number) {
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
  async updateServerBuild(
    id: number,
    buildData: {
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
    }
  ) {
    const url = `${this.panelUrl}/api/application/servers/${id}/build`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(buildData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(
        `Unable to update server build: ${response.status} ${response.statusText}\n${errorText}`
      );
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
  async updateServerStartup(
    id: number,
    updatedData: {
      startup: string;
      enviroment: object;
      egg: number;
      image?: string;
      skip_scripts?: boolean;
    }
  ) {
    const url = `${this.panelUrl}/api/application/servers/${id}/startup`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(updatedData),
    });
    if (!res.ok)
      throw new Error(
        `Error updating startup: ${res.status}, ${await res.text()}`
      );

    const data = await res.json();
    return data as Server;
  }
  /**
   * Reinstall the corresponding server
   *
   * POST /api/application/servers/{id}/reinstall
   *
   * @param id - Server Id
   * @return boolean
   */
  async reinstallServer(id: number) {
    const url = `${this.panelUrl}/api/application/servers/${id}/reinstall`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.getHeaders(),
    });
    if (!res.ok) return false;
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
  async deleteServer(id: number, force: boolean = false) {
    const res = await fetch(
      `${this.panelUrl}/api/application/servers/${id}?force=${force}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) return false;
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

  async getServerDbs(id: number) {
    const url = `${this.panelUrl}/api/application/servers/${id}/databases`;
    const res = await fetch(url, {
      headers: this.getHeaders(),
    });
    if (!res.ok)
      throw new Error(
        `failed to fetch databases for server ${id}: ${
          res.status
        }, ${await res.text()}`
      );

    const data = await res.json();
    return data.data as ServerDatabase[];
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
  async getServerDB(id: number, dbID: number) {
    const url = `${this.panelUrl}/api/application/servers/${id}/databases/${dbID}`;
    const res = await fetch(url, {
      headers: this.getHeaders(),
    });
    if (!res.ok)
      throw new Error(
        `failed to fetch database for server ${id}: ${
          res.status
        }, ${await res.text()}`
      );

    const data = await res.json();
    return data as ServerDatabase;
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
  async createServerDB(
    id: number,
    dataDB: {
      database: string;
      remote: string;
      host: string;
    }
  ) {
    const url = `${this.panelUrl}/api/application/servers/${id}/databases`;
    const res = await fetch(url, {
      headers: this.getHeaders(),
      method: "POST",
      body: JSON.stringify(dataDB),
    });
    if (!res.ok)
      throw new Error(
        `failed to create database for server ${id}: ${
          res.status
        }, ${await res.text()}`
      );

    const data = await res.json();
    return data as ServerDatabase;
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
  async updateServerDB(
    id: number,
    dbID: number,
    dataDB: {
      remote?: string;
    }
  ) {
    const url = `${this.panelUrl}/api/application/servers/${id}/databases/${dbID}`;
    const res = await fetch(url, {
      headers: this.getHeaders(),
      method: "PATCH",
      body: JSON.stringify(dataDB),
    });
    if (!res.ok)
      throw new Error(
        `failed to update database for server ${id}: ${
          res.status
        }, ${await res.text()}`
      );

    const data = await res.json();
    return data as ServerDatabase;
  }
  async resetServerDB(id: number, dbID: number) {
    const url = `${this.panelUrl}/api/application/servers/${id}/databases/${dbID}/reset-password`;
    const res = await fetch(url, {
      headers: this.getHeaders(),
      method: "POST",
    });
    if (!res.ok)
      throw new Error(
        `failed to reset database password for server ${id}: ${
          res.status
        }, ${await res.text()}`
      );

    const data = await res.json();
    return data as ServerDatabaseResetPasswd;
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
  async deleteServerDB(id: number, dbID: number) {
    const url = `${this.panelUrl}/api/application/servers/${id}/databases/${dbID}`;
    const res = await fetch(url, {
      headers: this.getHeaders(),
      method: "DELETE",
    });
    if (!res.ok)
      throw new Error(
        `failed to delete database for server ${id}: ${
          res.status
        }, ${await res.text()}`
      );

    return true;
  }
  async getAllNodes(options = {}) {
    const params = new URLSearchParams(options);
    const response = await fetch(
      `${this.panelUrl}/api/application/nodes?${params}`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok)
      throw new Error(
        `Failed to fetch all nodes: ${
          response.status
        }, ${await response.text()}`
      );

    const { data } = await response.json();

    return data as Node[];
  }

  async createNode(nodeData: {
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
  }) {
    const response = await fetch(`${this.panelUrl}/api/application/nodes`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(nodeData),
    });
    return (await response.json()) as Node;
  }

  async getNodeConfiguration(nodeId: number) {
    const response = await fetch(
      `${this.panelUrl}/api/application/nodes/${nodeId}/configuration`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok)
      throw new Error(
        `Failed to fetch node config node: ${
          response.status
        }, ${await response.text()}`
      );

    const data = await response.json();

    return data as nodeConfig;
  }

  async getAllAllocation(nodeId: number) {
    const response = await fetch(
      `${this.panelUrl}/api/application/nodes/${nodeId}/allocations`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch node allocations: ${
          response.status
        }, ${await response.text()}`
      );

    const { data } = await response.json();

    return data as Allocation[];
  }

  async createAllocations(
    nodeId: number,
    allocationData: {
      ip: string;
      alias: string;
      ports: number[];
    }
  ) {
    const response = await fetch(
      `${this.panelUrl}/api/application/nodes/${nodeId}/allocations`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(allocationData),
      }
    );
    return response.status === 204;
  }

  async deleteNode(nodeId: number) {
    const response = await fetch(
      `${this.panelUrl}/api/application/nodes/${nodeId}`,
      {
        method: "DELETE",
        headers: this.getHeaders(),
      }
    );
    return response.status === 204;
  }

  async getAllLocations(options = {}) {
    const params = new URLSearchParams(options);
    const response = await fetch(
      `${this.panelUrl}/api/application/locations?${params}`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok)
      throw new Error(
        `Failed to fetch loactions: ${
          response.status
        }, ${await response.text()}`
      );

    const { data } = await response.json();

    return data as Location[];
  }

  async createLocation(locationData: { short: string; long?: string }) {
    const response = await fetch(`${this.panelUrl}/api/application/locations`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(locationData),
    });
    if (!response.ok)
      throw new Error(
        `Failed to create locations: ${
          response.status
        }, ${await response.text()}`
      );

    const data = await response.json();

    return data as Allocation;
  }

  async updateLocation(
    locationId: number,
    updateData: {
      short?: string;
      long?: string;
    }
  ) {
    const response = await fetch(
      `${this.panelUrl}/api/application/locations/${locationId}`,
      {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(updateData),
      }
    );
    if (!response.ok)
      throw new Error(
        `Failed to update location: ${
          response.status
        }, ${await response.text()}`
      );

    const data = await response.json();

    return data as Location;
  }

  async deleteLocation(locationId: number) {
    const response = await fetch(
      `${this.panelUrl}/api/application/locations/${locationId}`,
      {
        method: "DELETE",
        headers: this.getHeaders(),
      }
    );
    return response.status === 204;
  }

  async getLocationWithNodes(locationId: number) {
    const response = await fetch(
      `${this.panelUrl}/api/application/locations/${locationId}?include=nodes`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok)
      throw new Error(
        `Failed to fetch location with nodes: ${
          response.status
        }, ${await response.text()}`
      );

    const data = await response.json();
    type LocationWithNode = Location & {
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
    };
    return data as LocationWithNode;
  }
  /**
   * get all nests
   * @param options - additional options
   */
  async getAllNests(options = {}) {
    const params = new URLSearchParams(options);
    const response = await fetch(
      `${this.panelUrl}/api/application/nests?${params}`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok)
      throw new Error(
        `Failed to fetch nests: ${response.status}, ${await response.text()}`
      );

    const { data } = await response.json();

    return data as Nest[];
  }

  /**
   * get a nest
   *
   * @param nestId - nest id
   */

  async getANest(nestId: number) {
    const response = await fetch(
      `${this.panelUrl}/api/application/nests/${nestId}`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok)
      throw new Error(
        `Failed to fetch nests: ${response.status}, ${await response.text()}`
      );

    const data = await response.json();

    return data as Nest;
  }
  /**
   * get all eggs
   *
   * @param nestId - nest id
   */
  async getAllEggs(nestId: number) {
    const response = await fetch(
      `${this.panelUrl}/api/application/nests/${nestId}/eggs`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok)
      throw new Error(
        `Failed to fetch nests: ${response.status}, ${await response.text()}`
      );

    const { data } = await response.json();

    return data as Egg[];
  }
  /**
   * get a egg
   *
   * @param nestId - nest id
   * @param eggId - egg id
   */
  async getAEgg(nestId: number, eggId: number) {
    const response = await fetch(
      `${this.panelUrl}/api/application/nests/${nestId}/eggs/${eggId}`,
      {
        headers: this.getHeaders(),
      }
    );
    if (!response.ok)
      throw new Error(
        `Failed to fetch nests: ${response.status}, ${await response.text()}`
      );

    const data = await response.json();

    return data as Egg;
  }
  getEggById(eggId: number) {
    throw new Error("Small Utility not loaded");
  }
  getNodesByLocationId(locationId: number) {
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
  ApplicationApi.prototype.getEggById = async function (eggId: Number) {
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
        } catch (error) {
          console.warn(`Failed to fetch eggs for nest ${nestId}:`);
          continue;
        }
      }

      throw new Error(`Egg with ID ${eggId} not found in any nest`);
    } catch (error) {
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
  ApplicationApi.prototype.getNodesByLocationId = async function (
    locationId: number
  ) {
    const api = this;
    try {
      let nodes = [];
      const response = await api.getAllNodes();
      response.forEach((node) => {
        if (node.attributes.location_id === locationId) {
          nodes.push(node);
        }
      });
    } catch (error) {
      throw new Error(`something went wrong: ${error}`);
    }
  };
}

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
      created_at: string; // ISO 8601 date string
      modified_at: string; // ISO 8601 date string
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
      last_run_at: string | null; // ISO 8601 datetime or null
      next_run_at: string; // ISO 8601 datetime
      created_at: string; // ISO 8601 datetime
      updated_at: string; // ISO 8601 datetime
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
              created_at: string; // ISO 8601 datetime
              updated_at: string; // ISO 8601 datetime
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
    last_run_at: string | null; // ISO 8601 datetime or null
    next_run_at: string; // ISO 8601 datetime
    created_at: string; // ISO 8601 datetime
    updated_at: string; // ISO 8601 datetime
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
            created_at: string; // ISO 8601 datetime
            updated_at: string; // ISO 8601 datetime
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
    created_at: string; // ISO 8601 timestamp
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
    created_at: string; // ISO 8601 datetime
    completed_at: string; // ISO 8601 datetime
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



// Custom error classes for better error handling
export class PterodactylAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public responseBody?: string
  ) {
    super(message);
    this.name = 'PterodactylAPIError';
  }
}

export class ValidationError extends PterodactylAPIError {
  constructor(message: string, responseBody?: string) {
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
  constructor(message: string, responseBody?: string) {
    super(`Insufficient permission: ${message}`, 403, 'Forbidden', responseBody);
    this.name = 'PermissionError';
  }
}

// Enum for common permissions
export enum ServerPermissions {
  CONTROL_CONSOLE = 'control.console',
  CONTROL_START = 'control.start',
  CONTROL_STOP = 'control.stop',
  CONTROL_RESTART = 'control.restart',
  USER_CREATE = 'user.create',
  USER_READ = 'user.read',
  USER_UPDATE = 'user.update',
  USER_DELETE = 'user.delete',
  FILE_CREATE = 'file.create',
  FILE_READ = 'file.read',
  FILE_UPDATE = 'file.update',
  FILE_DELETE = 'file.delete',
  FILE_ARCHIVE = 'file.archive',
  FILE_SFTP = 'file.sftp',
  ALLOCATION_READ = 'allocation.read',
  ALLOCATION_CREATE = 'allocation.create',
  ALLOCATION_UPDATE = 'allocation.update',
  ALLOCATION_DELETE = 'allocation.delete',
  STARTUP_READ = 'startup.read',
  STARTUP_UPDATE = 'startup.update',
  DATABASE_CREATE = 'database.create',
  DATABASE_READ = 'database.read',
  DATABASE_UPDATE = 'database.update',
  DATABASE_DELETE = 'database.delete',
  SCHEDULE_CREATE = 'schedule.create',
  SCHEDULE_READ = 'schedule.read',
  SCHEDULE_UPDATE = 'schedule.update',
  SCHEDULE_DELETE = 'schedule.delete',
  BACKUP_CREATE = 'backup.create',
  BACKUP_READ = 'backup.read',
  BACKUP_DELETE = 'backup.delete',
  BACKUP_DOWNLOAD = 'backup.download',
  SETTINGS_RENAME = 'settings.rename',
  SETTINGS_REINSTALL = 'settings.reinstall'
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
export class ClientApi {
  private readonly panelUrl: string;
  private readonly clientKey: string;
  private readonly headers: Record<string, string>;
  private readonly debug: boolean;
  private readonly timeout: number;

  constructor(
    panelUrl: string,
    clientKey: string,
    options: ClientApiOptions = {}
  ) {
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

  private async api<T>(
    url: string,
    data?: object | string,
    method?: string
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const fetchOptions: RequestInit = {
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
            throw new PterodactylAPIError(
              `API Error: ${response.status} ${response.statusText}`,
              response.status,
              response.statusText,
              errorText
            );
        }
      }

      if (response.headers.get("Content-Type")?.includes("application/json")) {
        const jsonResponse = await response.json();
        if (this.debug) console.log(`[Res] [${url}]:`, jsonResponse);
        return jsonResponse as T;
      } else {
        const textResponse = await response.text();
        if (this.debug) console.log(`[Res] [${url}]:`, textResponse);
        return textResponse as T;
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new PterodactylAPIError('Request timeout', 408, 'Request Timeout');
      }
      if (this.debug) console.error(`[Error] [${url}]:`, error);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Account Management Methods
  async getUserDetails(): Promise<UserDetails> {
    return this.api<UserDetails>("/api/client/account");
  }

  async getTwoFAQRCode(): Promise<TwoFAQRcode> {
    return this.api<TwoFAQRcode>("/api/client/account/two-factor");
  }

  async enableTwoFA(code: number): Promise<EnableTwoFA> {
    return this.api<EnableTwoFA>(
      "/api/client/account/two-factor",
      { code: String(code) },
      "POST"
    );
  }

  async disableTwoFA(password: string): Promise<DisableTwoFA> {
    return this.api<DisableTwoFA>(
      "/api/client/account/two-factor",
      { password },
      "DELETE"
    );
  }

  async updateEmail(newEmail: string, password: string): Promise<void> {
    await this.api(
      "/api/client/account/email",
      { email: newEmail, password },
      "PUT"
    );
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.api(
      "/api/client/account/password",
      {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPassword,
      },
      "PUT"
    );
  }

  // API Key Management
  async listAPIKeys(): Promise<ListAPIKeys> {
    return this.api<ListAPIKeys>("/api/client/account/api-keys");
  }

  async createAPIKey(description: string, allowedIPs?: string[]): Promise<CreatedAPIKey> {
    return this.api<CreatedAPIKey>(
      "/api/client/account/api-keys",
      {
        description,
        allowed_ips: allowedIPs,
      },
      "POST"
    );
  }

  async deleteAPIKey(identifier: string): Promise<void> {
    await this.api(`/api/client/account/api-keys/${identifier}`, {}, "DELETE");
  }

  // Server Management
  async listServers(options?: { 
    includeEgg?: boolean; 
    includeSubusers?: boolean 
  }): Promise<ServersList> {
    const query = new URLSearchParams();
    if (options?.includeEgg) query.append('include', 'egg');
    if (options?.includeSubusers) query.append('include', 'subusers');
    
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.api<ServersList>(`/api/client${queryString}`);
  }

  async getServerDetails(serverId: string): Promise<ServerDetails> {
    return this.api<ServerDetails>(`/api/client/servers/${serverId}`);
  }

  async renameServer(serverId: string, newName: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/settings/rename`,
      { name: newName },
      "POST"
    );
  }

  async reinstallServer(serverId: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/settings/reinstall`,
      {},
      "POST"
    );
  }

  // Database Management
  async listDatabases(serverId: string): Promise<DatabaseList> {
    return this.api<DatabaseList>(`/api/client/servers/${serverId}/databases`);
  }

  async createDatabase(
    serverId: string,
    database: string,
    remote: string
  ): Promise<CreatedDatabase> {
    return this.api<CreatedDatabase>(
      `/api/client/servers/${serverId}/databases`,
      { database, remote },
      "POST"
    );
  }

  async generateDatabasePassword(
    serverId: string,
    databaseId: string
  ): Promise<GeneratedPassDatabase> {
    return this.api<GeneratedPassDatabase>(
      `/api/client/servers/${serverId}/databases/${databaseId}/rotate-password`,
      {},
      "POST"
    );
  }

  async deleteDatabase(serverId: string, databaseId: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/databases/${databaseId}`,
      {},
      "DELETE"
    );
  }

  // File Management
  async listFiles(serverId: string, directory?: string): Promise<FilesList> {
    const query = directory ? `?directory=${encodeURIComponent(directory)}` : "";
    return this.api<FilesList>(`/api/client/servers/${serverId}/files/list${query}`);
  }

  async readFileContents(serverId: string, filePath: string): Promise<string> {
    const encodedPath = encodeURIComponent(filePath);
    return this.api<string>(
      `/api/client/servers/${serverId}/files/contents?file=${encodedPath}`
    );
  }

  async writeFile(serverId: string, filePath: string, content: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/files/write?file=${encodeURIComponent(filePath)}`,
      content,
      "POST"
    );
  }

  async renameFile(
    serverId: string,
    root: string,
    from: string,
    to: string
  ): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/files/rename`,
      {
        root,
        files: [{ from, to }],
      },
      "PUT"
    );
  }

  async copyFile(serverId: string, filePath: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/files/copy`,
      { location: filePath },
      "POST"
    );
  }

  async compressFiles(serverId: string, root: string, files: string[]): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/files/compress`,
      { root, files },
      "POST"
    );
  }

  async decompressFile(serverId: string, root: string, file: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/files/decompress`,
      { root, file },
      "POST"
    );
  }

  async deleteFiles(serverId: string, root: string, files: string[]): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/files/delete`,
      { root, files },
      "POST"
    );
  }

  async createFolder(serverId: string, root: string, name: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/files/create-folder`,
      { root, name },
      "POST"
    );
  }

  async generateUploadURL(serverId: string): Promise<GeneratedUploadURL> {
    return this.api<GeneratedUploadURL>(`/api/client/servers/${serverId}/files/upload`);
  }

  async downloadFile(serverId: string, filePath: string): Promise<string> {
    const encodedPath = encodeURIComponent(filePath);
    return this.api<string>(
      `/api/client/servers/${serverId}/files/download?file=${encodedPath}`
    );
  }

  // Schedule Management
  async listSchedules(serverId: string): Promise<SchedulesList> {
    return this.api<SchedulesList>(`/api/client/servers/${serverId}/schedules`);
  }

  async createSchedule(
    serverId: string,
    name: string,
    cron: {
      minute: string;
      hour: string;
      dayOfMonth: string;
      dayOfWeek: string;
    },
    isActive = true
  ): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/schedules`,
      {
        name,
        minute: cron.minute,
        hour: cron.hour,
        day_of_month: cron.dayOfMonth,
        day_of_week: cron.dayOfWeek,
        is_active: isActive,
      },
      "POST"
    );
  }

  async getScheduleDetails(serverId: string, scheduleId: string): Promise<SchedulesDetails> {
    return this.api<SchedulesDetails>(`/api/client/servers/${serverId}/schedules/${scheduleId}`);
  }

  async updateSchedule(
    serverId: string,
    scheduleId: string,
    name: string,
    cron: {
      minute: string;
      hour: string;
      dayOfMonth: string;
      dayOfWeek: string;
    },
    isActive?: boolean
  ): Promise<void> {
    const body: Record<string, any> = {
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

  async deleteSchedule(serverId: string, scheduleId: string): Promise<void> {
    await this.api(`/api/client/servers/${serverId}/schedules/${scheduleId}`, {}, "DELETE");
  }

  // Task Management
  async createTask(
    serverId: string,
    scheduleId: string,
    action: "command" | "power" | "backup",
    payload: string,
    timeOffset: number
  ): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/schedules/${scheduleId}/tasks`,
      { action, payload, time_offset: timeOffset },
      "POST"
    );
  }

  async updateTask(
    serverId: string,
    scheduleId: string,
    taskId: string,
    action: "command" | "power" | "backup",
    payload: string,
    timeOffset: number
  ): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`,
      { action, payload, time_offset: timeOffset },
      "POST"
    );
  }

  async deleteTask(serverId: string, scheduleId: string, taskId: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`,
      {},
      "DELETE"
    );
  }

  // Network/Allocation Management
  async listAllocations(serverId: string): Promise<AllocationsList> {
    return this.api<AllocationsList>(`/api/client/servers/${serverId}/network/allocations`);
  }

  async assignAllocation(serverId: string): Promise<AutoGeneratedAllocation> {
    return this.api<AutoGeneratedAllocation>(
      `/api/client/servers/${serverId}/network/allocations`,
      {},
      "POST"
    );
  }

  async setAllocationNote(serverId: string, allocationId: number, notes: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/network/allocations/${allocationId}`,
      { notes },
      "POST"
    );
  }

  async setPrimaryAllocation(serverId: string, allocationId: number): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/network/allocations/${allocationId}/primary`,
      {},
      "POST"
    );
  }

  async unassignAllocation(serverId: string, allocationId: number): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/network/allocations/${allocationId}`,
      {},
      "DELETE"
    );
  }

  // User Management
  async listUsers(serverId: string): Promise<UsersList> {
    return this.api<UsersList>(`/api/client/servers/${serverId}/users`);
  }

  async createUser(serverId: string, email: string, permissions: string[]): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/users`,
      { email, permissions },
      "POST"
    );
  }

  async getSubUserDetails(serverId: string, subuserUuid: string): Promise<ServerSubuser> {
    return this.api<ServerSubuser>(`/api/client/servers/${serverId}/users/${subuserUuid}`);
  }

  async updateUser(serverId: string, subuserUuid: string, permissions: string[]): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/users/${subuserUuid}`,
      { permissions },
      "POST"
    );
  }

  async deleteUser(serverId: string, subuserUuid: string): Promise<void> {
    await this.api(`/api/client/servers/${serverId}/users/${subuserUuid}`, {}, "DELETE");
  }

  // Backup Management
  async listBackups(serverId: string): Promise<BackupsList> {
    return this.api<BackupsList>(`/api/client/servers/${serverId}/backups`);
  }

  async createBackup(serverId: string, name?: string, ignored?: string[]): Promise<void> {
    const body: Record<string, any> = {};
    if (name) body.name = name;
    if (ignored) body.ignored = ignored;
    
    await this.api(`/api/client/servers/${serverId}/backups`, body, "POST");
  }

  async getBackupDetails(serverId: string, backupUuid: string): Promise<Backup> {
    return this.api<Backup>(`/api/client/servers/${serverId}/backups/${backupUuid}`);
  }

  async getBackupDownloadLink(serverId: string, backupUuid: string): Promise<{ object: string; attributes: { url: string } }> {
    return this.api(`/api/client/servers/${serverId}/backups/${backupUuid}/download`);
  }

  async deleteBackup(serverId: string, backupUuid: string): Promise<void> {
    await this.api(`/api/client/servers/${serverId}/backups/${backupUuid}`, {}, "DELETE");
  }

  // Startup Variables
  async listStartupVariables(serverId: string): Promise<any> {
    return this.api(`/api/client/servers/${serverId}/startup`);
  }

  async updateStartupVariable(serverId: string, key: string, value: string): Promise<void> {
    await this.api(
      `/api/client/servers/${serverId}/startup/variable`,
      { key, value },
      "PUT"
    );
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