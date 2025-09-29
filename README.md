# Drive-Folder-Generator

Google Apps Script project to automate creation of structured folders in Google Drive and populate them with template files.  
Designed to save hours of manual folder/file setup for academic advising, onboarding, or any recurring process.

## Description

This repository contains **two versions** of a folder automation script:

1. **Basic Script** – Creates folders from a hardcoded list of names, adds subfolders, copies template files, and logs results to a `Log` sheet.  
2. **Sheet-Driven Script** – Reads names and optional keys directly from a Google Sheet tab (`Roster`), creates idempotent folders and subfolders, copies template files, and logs results. Includes a dry-run mode.

## Features

- Automated folder creation under a specified parent folder
- Optional subfolders (e.g., *Advising Notes*, *Curriculum Guide*)
- Template distribution – copy any Drive files into each new folder
- Structured logging in a `Log` sheet (timestamp, level, name, folder URL, message)
- **Sheet-driven version only:**
  - Reads names and optional keys from a `Roster` tab
  - Dry-run mode for previewing results without writing to Drive
  - Sanitized folder names (removes invalid characters)

## Setup

1. Open a Google Sheet you want to use for logging (and as your source list if using the sheet-driven script).
2. Go to **Extensions → Apps Script**.
3. Create project files:
   - `Code.gs` – paste one of the provided script versions
   - `appsscript.json` – use the manifest included in this repo
4. Update configuration:
   - `PARENT_FOLDER_ID` in the script
   - `FILE_ID_1`, `FILE_ID_2`, etc. in the `templateIds` array
   - (Optional) adjust subfolder names
5. Authorize the script when prompted.

## Usage

### Option 1: Basic Script
- Edit the `students` array directly in the script.
- Run `createStudentFolders()`.
- Check the `Log` tab in your spreadsheet for results.

### Option 2: Sheet-Driven Script
- Create a `Roster` tab with columns:
  - A: `Name` (required)
  - B: `Key` (optional unique identifier)
- Run `previewDryRun()` to simulate actions (writes only to log).
- Run `createFoldersFromSheet()` to execute folder and file creation.
- A `Log` tab will be created automatically if missing.

## Example Log Output

| Timestamp           | Level    | Student    | Folder URL                                    | Message                              |
|---------------------|----------|------------|-----------------------------------------------|--------------------------------------|
| 2025-09-29 10:15 AM | SUCCESS  | Student A  | https://drive.google.com/folders/abc123       | Folder created successfully          |
| 2025-09-29 10:15 AM | SUCCESS  | Student B  | https://drive.google.com/folders/def456       | Folder created or already existed    |
| 2025-09-29 10:15 AM | ERROR    | Student C  |                                               | Invalid template file ID             |

## Notes

- Folder naming in the sheet-driven version: `"Name — Key"` if both are present, else `"Name"`.
- Sanitization removes reserved characters that can cause issues in Drive.
- All errors are logged without halting the script.
- Both versions can be adapted for non-student use cases (e.g., client onboarding, project setup).

## License

MIT
