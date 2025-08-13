# 🪶 ptero-connect

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
