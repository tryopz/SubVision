use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Emitter, Manager,
};

pub fn setup_tray(app: &tauri::App) -> tauri::Result<()> {
    let icon = app
        .default_window_icon()
        .expect("no default window icon set")
        .clone();

    let settings = MenuItem::with_id(app, "settings", "Settings", true, None::<&str>)?;
    let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;

    let menu = Menu::with_items(app, &[&settings, &quit])?;

    let tray = TrayIconBuilder::new()
        .icon(icon)
        .tooltip("SubVision")
        .show_menu_on_left_click(false)
        .menu(&menu)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "settings" => {
                println!("settings button pressed");
                if let Err(e) = app.emit("tray-event", "settings") {
                    eprintln!("Failed to emit tray-event: {}", e);
                }
            }
            "quit" => {
                println!("quit menu item was clicked");
                app.exit(0);
            }
            _ => {
                println!("menu item {:?} not handled", event.id);
            }
        })
        .on_tray_icon_event(|tray, event| match event {
            TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                position,
                ..
            } => {
                let app = tray.app_handle();
                println!("clique gauche à la position: {:?}", position);
                let _ = app.emit("tray-left-click", (position.x, position.y));
            }
            _ => {}
        })
        .build(app)?;

    app.manage(tray);
    Ok(())
}
