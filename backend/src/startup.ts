import { initLanguageDetector } from "./linguaDetector";

export async function runStartupTasks() {
    console.info("[Startup] Début de l'initialisation...");

    await initLanguageDetector();
}