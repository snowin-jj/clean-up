#!/usr/bin/env node

// src/index.ts
import { program } from "commander";

// src/functions/clean.ts
import os from "os";
import fs2 from "fs";
import path2 from "path";

// src/utils/helpers.ts
import fs from "fs";
import path from "path";
function deleteFolderRecursive(folderPath) {
  let fileCount = 0;
  let folderCount = 0;
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        const count = deleteFolderRecursive(curPath);
        fileCount += count.fileCount;
        folderCount += count.folderCount;
      } else {
        fs.unlinkSync(curPath);
        fileCount += 1;
      }
    });
    fs.rmdirSync(folderPath);
    folderCount += 1;
  }
  return { fileCount, folderCount };
}

// src/functions/clean.ts
function clean(foldersToTrash) {
  const filesAndfoldersNotToTrash = ["setups", "desktop.ini"];
  let cleanedFileCount = 0;
  let cleanedFolderCount = 0;
  if (!foldersToTrash || foldersToTrash.length <= 0) {
    foldersToTrash = [
      path2.join(os.homedir(), "Downloads", "temp"),
      path2.join(os.homedir(), "Documents", "temp"),
      path2.join(os.homedir(), "Pictures", "temp"),
      path2.join(os.homedir(), "code", "temp")
    ];
  }
  try {
    console.log("\u{1F9F9} Started cleaning.....");
    foldersToTrash.map((item) => {
      if (!fs2.lstatSync(item).isDirectory()) {
        fs2.unlinkSync(item);
        cleanedFileCount += 1;
        return;
      }
      const itemsInTargetPath = fs2.readdirSync(item);
      itemsInTargetPath.forEach((subItem) => {
        if (filesAndfoldersNotToTrash.includes(subItem))
          return;
        const itemPath = path2.join(item, subItem);
        if (fs2.lstatSync(itemPath).isDirectory()) {
          const { fileCount, folderCount } = deleteFolderRecursive(itemPath);
          cleanedFileCount += fileCount;
          cleanedFolderCount += folderCount;
        } else {
          fs2.unlinkSync(itemPath);
          cleanedFileCount += 1;
        }
      });
      if (!item.includes("temp")) {
        console.log({ item });
        fs2.rmdirSync(item);
        cleanedFolderCount += 1;
      }
    });
    console.log(
      `\u2705 Cleaned ${cleanedFileCount} files and ${cleanedFolderCount} folders!`
    );
  } catch (error) {
    const e = error;
    console.error("\u274C Error: ", e.message);
  }
}

// src/index.ts
program.name("cleanup").description("Tiny cli helps to clean then unwanted folders and files").version("0.0.2");
program.command("start").description("Start clean the folders").argument("[string]", "Absoulte path of the folder or file").argument("[.]", "delete the files and folders in the current directory").action((str, _options) => {
  let foldersToTrash = [];
  if (str)
    foldersToTrash = String(str).split(",");
  if (str === ".")
    foldersToTrash = [process.cwd()];
  clean(foldersToTrash);
});
program.parse();
