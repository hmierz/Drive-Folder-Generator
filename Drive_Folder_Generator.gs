function createStudentFolders() {
  // Parent folder ID where new folders will be created
var parentFolder = DriveApp.getFolderById("PARENT_FOLDER_ID");

  // List of student names (can also be pulled from a Sheet)
var students = ["Student A", "Student B", "Student C"];

  // Template file IDs to copy into each folder
var templateIds = ["FILE_ID_1", "FILE_ID_2"];

  students.forEach(function(name) {
    // Create the student folder
var studentFolder = parentFolder.createFolder(name);

    // Optional: create subfolders
var sub1 = studentFolder.createFolder("Advising Notes");
var sub2 = studentFolder.createFolder("Curriculum Guide");

    // Copy template files into the student folder
templateIds.forEach(function(fileId) {
var file = DriveApp.getFileById(fileId);
file.makeCopy(file.getName(), studentFolder);
    });
  });
}
