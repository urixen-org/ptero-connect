import { ClientApi } from "./index.ts";
import { expect, test } from "bun:test";

const api = new ClientApi(
  "https://paid.zypher.cloud",
  "ptlc_a4yXElNUdhVb6irMqXBVNH4jgG2ixsoA8VMmdf0H3NZ",
  { debug: false }
);

const logo = `
88        88  88888888ba   88  8b        d8  88888888888  888b      88  
88        88  88      "8b  88   Y8,    ,8P   88           8888b     88  
88        88  88      ,8P  88    \`8b  d8'    88           88 \`8b    88  
88        88  88aaaaaa8P'  88      Y88P      88aaaaa      88  \`8b   88  
88        88  88""""88'    88      d88b      88"""""      88   \`8b  88  
88        88  88    \`8b    88    ,8P  Y8,    88           88    \`8b 88  
Y8a.    .a8P  88     \`8b   88   d8'    \`8b   88           88     \`8888  
 \`"Y8888Y"'   88      \`8b  88  8P        Y8  88888888888  88      \`888  
--------------------------------------------------------------------------
                              Ptero-Connect
`;

console.log(logo);

// run bun test in terminal  ok wtf haping
// all passed yh let write more(test)

test("GET == > User Details", async () => {
  const __ = await api.getUserDetails();
  expect(__).toEqual({
    object: "user",
    attributes: {
      id: 1,
      admin: true,
      username: "nehxurai",
      email: "nehxurai@zypher.cloud",
      first_name: "lest",
      last_name: "edit",
      language: "en",
    },
  });
});

test("LIST == > API keys", async () => {
  const __ = await api.listAPIKeys();
  const date = new Date();

  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
    timeZoneName: "shortOffset",
  });

  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  // Clean offset and normalize to ±HH:MM
  let offset = map.timeZoneName.replace(/^GMT/, "");
  offset = offset.replace(
    /^([+-])(\d)(:\d{2})$/,
    (_, sign, h, m) => `${sign}0${h}${m}`
  );

  // Build ISO-like string
  const iso = `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}${offset}`;

  expect(__).toEqual({
    object: "list",
    data: [
      {
        object: "api_key",
        attributes: {
          identifier: "ptlc_a4yXElNUdhV",
          description: "Fuck",
          allowed_ips: [],
          created_at: "2025-08-17T14:30:10+05:30",
          last_used_at: iso,
        },
      },
    ],
  });
});

test("rename server", async () => {
  const __ = await api.renameServer("a9049bb7", "fuck");
  expect(__);
});
test("get all servers", async () => {
  const __ = await api.listServers();
  expect(__).toEqual({
    object: "list",
    data: [
      {
        object: "server",
        attributes: {
          server_owner: true,
          identifier: "a9049bb7",
          internal_id: 8,
          uuid: "a9049bb7-034b-4fd8-b752-8903b9387a02",
          name: "Test",
          node: "Budget Intel Xeon 1",
          node_alert: null,
          daemon_text: "[Pterodactyl Daemon]:",
          container_text: "container@pterodactyl~",
          egg_image: null,
          nest_id: 1,
          egg_id: 1,
          is_node_under_maintenance: false,
          sftp_details: {
            ip: "in01.zypher.cloud",
            port: 2022,
          },
          description: "",
          limits: {
            memory: 1024,
            swap: 0,
            disk: 1024,
            io: 500,
            cpu: 80,
            threads: null,
            oom_disabled: true,
          },
          invocation:
            "java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true -jar server.jar",
          docker_image: "ghcr.io/pterodactyl/yolks:java_21",
          egg_features: ["eula", "java_version", "pid_limit"],
          feature_limits: {
            databases: 0,
            allocations: 0,
            backups: 0,
          },
          status: null,
          is_suspended: false,
          is_installing: false,
          is_transferring: false,
          relationships: {
            allocations: {
              object: "list",
              data: [
                {
                  object: "allocation",
                  attributes: {
                    id: 870,
                    ip: "157.254.189.148",
                    ip_alias: "in01.zypher.cloud",
                    port: 19132,
                    notes: null,
                    is_default: true,
                  },
                },
              ],
            },
            variables: {
              object: "list",
              data: [
                {
                  object: "egg_variable",
                  attributes: {
                    name: "Minecraft Version",
                    description:
                      "The version of minecraft to download. \r\n\r\nLeave at latest to always get the latest version. Invalid versions will default to latest.",
                    env_variable: "MINECRAFT_VERSION",
                    default_value: "latest",
                    server_value: "latest",
                    is_editable: true,
                    rules: "nullable|string|max:20",
                  },
                },
                {
                  object: "egg_variable",
                  attributes: {
                    name: "Server Jar File",
                    description:
                      "The name of the server jarfile to run the server with.",
                    env_variable: "SERVER_JARFILE",
                    default_value: "server.jar",
                    server_value: "server.jar",
                    is_editable: true,
                    rules: "required|regex:/^([\\w\\d._-]+)(\\.jar)$/",
                  },
                },
                {
                  object: "egg_variable",
                  attributes: {
                    name: "Build Number",
                    description:
                      "The build number for the paper release.\r\n\r\nLeave at latest to always get the latest version. Invalid versions will default to latest.",
                    env_variable: "BUILD_NUMBER",
                    default_value: "latest",
                    server_value: "latest",
                    is_editable: true,
                    rules: "required|string|max:20",
                  },
                },
              ],
            },
          },
        },
      },
    ],
    meta: {
      pagination: {
        total: 1,
        count: 1,
        per_page: 50,
        current_page: 1,
        total_pages: 1,
        links: {},
      },
    },
  });
});

test("get server details ", async () => {
  const __ = await api.getServerDetails("a9049bb7");
  expect(__).toEqual({
    object: "server",
    attributes: {
      server_owner: true,
      identifier: "a9049bb7",
      internal_id: 8,
      uuid: "a9049bb7-034b-4fd8-b752-8903b9387a02",
      name: "Test",
      node: "Budget Intel Xeon 1",
      node_alert: null,
      daemon_text: "[Pterodactyl Daemon]:",
      container_text: "container@pterodactyl~",
      egg_image: null,
      nest_id: 1,
      egg_id: 1,
      is_node_under_maintenance: false,
      sftp_details: {
        ip: "in01.zypher.cloud",
        port: 2022,
      },
      description: "",
      limits: {
        memory: 1024,
        swap: 0,
        disk: 1024,
        io: 500,
        cpu: 80,
        threads: null,
        oom_disabled: true,
      },
      invocation:
        "java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true -jar server.jar",
      docker_image: "ghcr.io/pterodactyl/yolks:java_21",
      egg_features: ["eula", "java_version", "pid_limit"],
      feature_limits: {
        databases: 0,
        allocations: 0,
        backups: 0,
      },
      status: null,
      is_suspended: false,
      is_installing: false,
      is_transferring: false,
      relationships: {
        allocations: {
          object: "list",
          data: [
            {
              object: "allocation",
              attributes: {
                id: 870,
                ip: "157.254.189.148",
                ip_alias: "in01.zypher.cloud",
                port: 19132,
                notes: null,
                is_default: true,
              },
            },
          ],
        },
        variables: {
          object: "list",
          data: [
            {
              object: "egg_variable",
              attributes: {
                name: "Minecraft Version",
                description:
                  "The version of minecraft to download. \r\n\r\nLeave at latest to always get the latest version. Invalid versions will default to latest.",
                env_variable: "MINECRAFT_VERSION",
                default_value: "latest",
                server_value: "latest",
                is_editable: true,
                rules: "nullable|string|max:20",
              },
            },
            {
              object: "egg_variable",
              attributes: {
                name: "Server Jar File",
                description:
                  "The name of the server jarfile to run the server with.",
                env_variable: "SERVER_JARFILE",
                default_value: "server.jar",
                server_value: "server.jar",
                is_editable: true,
                rules: "required|regex:/^([\\w\\d._-]+)(\\.jar)$/",
              },
            },
            {
              object: "egg_variable",
              attributes: {
                name: "Build Number",
                description:
                  "The build number for the paper release.\r\n\r\nLeave at latest to always get the latest version. Invalid versions will default to latest.",
                env_variable: "BUILD_NUMBER",
                default_value: "latest",
                server_value: "latest",
                is_editable: true,
                rules: "required|string|max:20",
              },
            },
          ],
        },
      },
    },
    meta: {
      is_server_owner: true,
      user_permissions: [
        "*",
        "admin.websocket.errors",
        "admin.websocket.install",
        "admin.websocket.transfer",
      ],
    },
  });
});
/*
* no need of you reinstall 
test("reinstall server", async () => {
  const __ = await api.reinstallServer("a9049bb7")
  expect(__).toBe(undefined)
})
*/

// ? bro try bun test
// posted reinstall action 2 times :skull: ☠️
// * check already  i Logo is superb can u tell mefont?? univers ok
