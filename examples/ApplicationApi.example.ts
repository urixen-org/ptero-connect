import { ApplicationApi } from "@urixen/ptero-connect";

export const api = new ApplicationApi(
    "Pterodactyl.example.com", // The Pterodactyl panel url
    "ptr_00000000000000" // The Pterodactyl panel application api key
)
