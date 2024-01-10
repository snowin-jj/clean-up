import os from "node:os";
import fs from "node:fs";
import path from "node:path";

import { deleteFolderRecursive } from "../utils/helpers.js";

/**
 * Delete unwanted files and folders except excluded folders and files.
 * @param {string[]} foldersToTrash - array of home level pathname of the folders to be cleaned.
 * @example
 * // return void
 * clean(["downloads", "documents/temp", "pictures/temp"]);
 */
export default function clean(foldersToTrash) {
  const filesAndfoldersNotToTrash = ["setups", "desktop.ini"];
  let cleanedFileCount = 0;
  let cleanedFolderCount = 0;

  if (!foldersToTrash || foldersToTrash.length <= 0) {
    foldersToTrash = [
      path.join(os.homedir(), "Downloads", "temp"),
      path.join(os.homedir(), "Documents", "temp"),
      path.join(os.homedir(), "Pictures", "temp"),
      path.join(os.homedir(), "code", "temp"),
    ];
  }

  try {
    console.log("🧹 Started cleaning.....");
    foldersToTrash.map((item) => {
      if (!fs.lstatSync(item).isDirectory()) {
        // Delete file
        fs.unlinkSync(item);
        cleanedFileCount += 1;
        return;
      }

      const itemsInTargetPath = fs.readdirSync(item);
      itemsInTargetPath.forEach((subItem) => {
        if (filesAndfoldersNotToTrash.includes(subItem)) return;
        const itemPath = path.join(item, subItem);
        if (fs.lstatSync(itemPath).isDirectory()) {
          // Recursive call for directories
          const { fileCount, folderCount } = deleteFolderRecursive(itemPath);
          cleanedFileCount += fileCount;
          cleanedFolderCount += folderCount;
        } else {
          // Delete file
          fs.unlinkSync(itemPath);
          cleanedFileCount += 1;
        }
      });

      if (!item.includes("temp")) {
        console.log({ item });
        // Delete the choosen folder (which is given by the user)
        fs.rmdirSync(item);
        cleanedFolderCount += 1;
      }
    });
    console.log(
      `✅ Cleaned ${cleanedFileCount} files and ${cleanedFolderCount} folders!`
    );
  } catch (error) {
    console.error("❌ Error: ", error.message);
  }
}
