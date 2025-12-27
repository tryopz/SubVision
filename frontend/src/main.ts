import { listen } from "@tauri-apps/api/event";
import { readData, resetToDefault } from "./data-service";
import { initUi } from "./initUi";


console.log("JS loaded");

resetToDefault();
const data = await readData()

initUi(data);

listen<string>("tray-event", (event) => {
  console.info("Tray event:", event.payload);

  if (event.payload === 'settings') {
    console.info('settings event received')
  }
});
