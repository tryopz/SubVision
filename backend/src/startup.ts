import { initLanguageDetector } from "./linguaDetector";

export async function runStartupTasks() {
    console.log("[Startup] Début de l'initialisation...");

    await initLanguageDetector();
}