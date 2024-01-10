import fs from "node:fs";
import path from "node:path";

/**
 * @typedef {Object} Count
 * @property {number} fileCount - Number of files
 * @property {number} folderCount - Number of folders
 */

/**
 * Function to delete files and directories recursively.
 * @param {string} folderPath - path of the folder to delete.
 * @returns {Count} fileCount, folderCount
 */
export function deleteFolderRecursive(folderPath) {
  let fileCount = 0;
  let folderCount = 0;

  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);

      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call for directories
        const count = deleteFolderRecursive(curPath);
        fileCount += count.fileCount;
        folderCount += count.folderCount;
      } else {
        // Delete file
        fs.unlinkSync(curPath);
        fileCount += 1;
      }
    });

    // Delete the empty directory after files are deleted
    fs.rmdirSync(folderPath);

    // Increment folderCount when the directory itself is deleted
    folderCount += 1;
  }

  return { fileCount, folderCount };
}
