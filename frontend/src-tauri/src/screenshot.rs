use std::process::Command;

#[tauri::command]
pub fn screenshot_interactive() -> Result<(), String> {
    Command::new("screencapture")
        .arg("-i")
        .arg("-c")
        .arg("-d")
        .spawn()
        .map_err(|e| e.to_string())?;

    Ok(())
}
