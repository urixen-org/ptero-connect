# 🪶 ptero-connect
[![npm version](https://img.shields.io/npm/v/@urixen/ptero-connect?color=blue&label=npm)](https://www.npmjs.com/package/@urixen/ptero-connect)
[![yarn](https://img.shields.io/badge/yarn-add-blue?logo=yarn&logoColor=white)](https://yarnpkg.com/package/@urixen/ptero-connect)
[![pnpm](https://img.shields.io/badge/pnpm-add-orange?logo=pnpm&logoColor=white)](https://pnpm.io)
[![bun](https://img.shields.io/badge/bun-supported-ffcc33?logo=bun&logoColor=white)](https://bun.sh/)
[![bun](https://img.shields.io/badge/deno-supported-ffcc33?logo=deno&logoColor=white)](https://deno.land/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript&logoColor=blue)](https://www.typescriptlang.org/)
[![downloads](https://img.shields.io/npm/dt/@urixen/ptero-connect?color=brightgreen)](https://www.npmjs.com/package/@urixen/ptero-connect)

**ptero-connect** is a lightweight Node.js/TypeScript library for interacting with the [Pterodactyl Application API](https://pterodactyl.io/).  
It provides a clean, developer-friendly interface with **zero dependencies** and full TypeScript support.

---

## ✨ Highlights

- 🔹 **Application API** support
- 🔹 **Zero dependencies**
- 🔹 Fully typed for TypeScript
- 🔹 Lightweight & fast
- 🔹 Easy to extend for custom endpoints

---

## 📦 Installation

```bash
npm install @urixen/ptero-connect
# or
yarn add @urixen/ptero-connect
# or
pmpm add @urixen/ptero-connect
# or
bun add @urixen/ptero-connect
```

---

## 🚀 Quick Start

```ts
import { Application } from "ptero-connect";

const app = new Application({
  panelUrl: "https://panel.example.com",
  apiKey: "YOUR_APPLICATION_API_KEY"
});

const servers = await app.getAllServers();
console.log(servers);
```

---

## 📄 License
MIT License © 2025 [Urixen](https://github.com/urixen-org) and [Nehxurai](https://github.com/xerinv0)

---

## 💡 About
`ptero-connect` is part of the **Urixen** initiative to create high-quality, open-source tools for developers working with game server hosting and automation.
