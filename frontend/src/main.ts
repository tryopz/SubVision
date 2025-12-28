import { listen } from "@tauri-apps/api/event";
import { readData, resetToDefault } from "./data-service";
import { initUi } from "./ui";

console.info("JS loaded");

try {
  await resetToDefault();

  const data = await readData();

  initUi(data)

  console.info('Application ready');
} catch (error) {
  console.error('Application failed to start:', error);
}

listen<string>("tray-event", (event) => {
  console.info("Tray event:", event.payload);

  if (event.payload === 'settings') {
    console.info('settings event received')
  }
});
