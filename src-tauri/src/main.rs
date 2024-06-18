// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs::{self, File};
use std::io::{self, BufReader};
use std::path::Path;
use tauri::AppHandle;
use tauri::{
    api::{
        file::{ArchiveFormat, Extract},
        path::app_data_dir,
        process::{Command, CommandEvent},
    },
    Manager,
};

#[cfg(target_os = "macos")]
fn open_desktop_app(app_path: String) -> Result<(), String> {
    match Command::new("open").args(["-a", &app_path]).spawn() {
        Ok(_) => {
            println!("Program launched successfully.");
            Ok(())
        }
        Err(err) => Err(format!("Failed to launch program: {}", err)),
    }
}

#[cfg(target_os = "windows")]
fn open_desktop_app(app_path: String) -> Result<(), String> {
    Command::new(app_path).spawn().expect("Failed to open app");
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

#[tauri::command]
async fn open_program(app_handle: AppHandle, program_name: String) -> Result<(), String> {
    // Resolve the app data directory
    println!("Opening program: {}", program_name);
    let app_data_dir = app_handle
        .path_resolver()
        .app_data_dir()
        .ok_or_else(|| String::from("Failed to resolve app data directory"))?;

    // Example: Launch a program (change this to your actual program path)
    let program_path = app_data_dir.join(program_name); // Adjust this according to your program's executable name
    println!("Program path: {:?}", program_path);
    // Check if the program exists
    if !program_path.exists() {
        return Err(format!(
            "Program '{}' not found in app data directory",
            program_path.display()
        ));
    }

    // Launch the program
    open_desktop_app(program_path.to_string_lossy().to_string())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Trigger the installer command when the app is setup
            let resource_path = app
                .path_resolver()
                .resolve_resource("resources/sharelink.zip")
                .expect("failed to resolve resource");

            println!("Resource data dir: {:?}", resource_path);

            let app_data_dir = app.path_resolver().app_data_dir().unwrap();

            let file = File::open(resource_path)?;

            let mut archive = zip::ZipArchive::new(file).unwrap();

            for i in 0..archive.len() {
                let mut file = archive.by_index(i).unwrap();
                let outpath = match file.enclosed_name() {
                    Some(path) => app_data_dir.join(path),
                    None => continue,
                };

                {
                    let comment = file.comment();
                    if !comment.is_empty() {
                        println!("File {i} comment: {comment}");
                    }
                }

                if file.is_dir() {
                    println!("File {} extracted to \"{}\"", i, outpath.display());
                    fs::create_dir_all(&outpath).unwrap();
                } else {
                    println!(
                        "File {} extracted to \"{}\" ({} bytes)",
                        i,
                        outpath.display(),
                        file.size()
                    );
                    if let Some(p) = outpath.parent() {
                        if !p.exists() {
                            fs::create_dir_all(p).unwrap();
                        }
                    }
                    let mut outfile = fs::File::create(&outpath).unwrap();
                    io::copy(&mut file, &mut outfile).unwrap();
                }

                // Get and Set permissions
                #[cfg(unix)]
                {
                    use std::os::unix::fs::PermissionsExt;

                    if let Some(mode) = file.unix_mode() {
                        fs::set_permissions(&outpath, fs::Permissions::from_mode(mode)).unwrap();
                    }
                }
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_program,
            open_desktop_app_handler,
            greet
        ])
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
