# Drive-Folder-Generator
Google Apps script that automates creation of student folders in Google Drive and populates them with template documents. Designed to save hours of manual folder/file setup.
# Google Drive Folder Automation

Automates creation of per-record folders under a parent folder, optional subfolders, and copies template files into each new folder. Logs results to a sheet.

## Features
- Reads names and optional keys from a tab (default `Roster`)
- Idempotent folder creation under a fixed parent
- Optional subfolders per record
- Copies template files into each folder
- Structured logging to a `Log` sheet
- Dry-run mode for safe previews

## Setup
1. In Google Sheets, create tabs:
   - `Roster` with columns:
     - A: `Name` (required)
     - B: `Key` (optional unique identifier)
   - `Log` will be created automatically if missing.
2. In Apps Script editor:
   - Replace `REPLACE_WITH_PARENT_FOLDER_ID` in `CONFIG.parentFolderId`.
   - Add template file IDs in `CONFIG.templateFileIds` if desired.
   - Adjust `subfolders` as needed.
3. Ensure the project has these scopes (in `appsscript.json`):
   - Drive
   - Spreadsheets

## Usage
- Run `previewDryRun()` to simulate and verify logging without touching Drive.
- Run `createFoldersFromSheet()` to execute the actual job.

## Notes
- Folder naming: `"Name — Key"` if both are present, else `"Name"`.
- Sanitization removes control characters and reserved symbols.
- Errors for individual rows are recorded in the `Log` sheet.

## License
MIT
