function createStudentFolders() {
  // Parent folder ID where new folders will be created
  var parentFolder = DriveApp.getFolderById("PARENT_FOLDER_ID");

  // List of student names (can also be pulled from a Sheet)
  var students = ["Student A", "Student B", "Student C"];

  // Template file IDs to copy into each folder
  var templateIds = ["FILE_ID_1", "FILE_ID_2"];

  // Prep log sheet (auto-create with headers if missing)
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var logSheet = ss.getSheetByName("Log");
  if (!logSheet) {
    logSheet = ss.insertSheet("Log");
  }
  var headers = ["Timestamp", "Student", "Folder URL", "Message"];
  var firstRow = logSheet.getRange(1, 1, 1, headers.length).getValues()[0];
  var needsHeaders = firstRow.every(function(v) { return v === ""; });
  if (needsHeaders) {
    logSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  students.forEach(function(name) {
    try {
      // Create the student folder
      var studentFolder = parentFolder.createFolder(name);

      // Optional: create subfolders
      studentFolder.createFolder("Advising Notes");
      studentFolder.createFolder("Curriculum Guide");

      // Copy template files into the student folder
      templateIds.forEach(function(fileId) {
        var file = DriveApp.getFileById(fileId);
        file.makeCopy(file.getName(), studentFolder);
      });

      // Log success
      logSheet.appendRow([
        new Date(),
        name,
        studentFolder.getUrl(),
        "Folder created successfully"
      ]);
    } catch (e) {
      // Log error (continue with next student)
      logSheet.appendRow([
        new Date(),
        name,
        "",
        "ERROR: " + (e && e.message ? e.message : String(e))
      ]);
    }
  });
}
