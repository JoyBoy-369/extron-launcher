// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(target_os = "macos")]
fn open_desktop_app(app_path: String) {
    if let Err(e) = std::process::Command::new("open")
        .arg("-a")
        .arg(&app_path) // Replace "ThirdPartyApp" with the actual app name
        .spawn()
    {
        eprintln!("Error opening app: {}", e);
    }
}

#[cfg(target_os = "windows")]
fn open_desktop_app(app_path: String) {
    std::process::Command::new(app_path)
        .spawn()
        .expect("Failed to open app");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open_desktop_app_handler(app_path: String) {
    println!("Opening desktop app");
    open_desktop_app(app_path);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_desktop_app_handler, greet])
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
