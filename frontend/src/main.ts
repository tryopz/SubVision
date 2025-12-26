import { listen } from "@tauri-apps/api/event";
import { readData } from "./data-service";


console.log("JS loaded");

const data = await readData()
console.log(data);

listen<string>("tray-event", (event) => {
  console.info("Tray event:", event.payload);

  if (event.payload === 'settings') {
    console.info('settings event received')
  }
});
