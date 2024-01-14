#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");

// src/functions/clean.ts
var import_node_os = __toESM(require("os"));
var import_node_fs2 = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));

// src/utils/helpers.ts
var import_node_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
function deleteFolderRecursive(folderPath) {
  let fileCount = 0;
  let folderCount = 0;
  if (import_node_fs.default.existsSync(folderPath)) {
    import_node_fs.default.readdirSync(folderPath).forEach((file) => {
      const curPath = import_node_path.default.join(folderPath, file);
      if (import_node_fs.default.lstatSync(curPath).isDirectory()) {
        const count = deleteFolderRecursive(curPath);
        fileCount += count.fileCount;
        folderCount += count.folderCount;
      } else {
        import_node_fs.default.unlinkSync(curPath);
        fileCount += 1;
      }
    });
    import_node_fs.default.rmdirSync(folderPath);
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
      import_node_path2.default.join(import_node_os.default.homedir(), "Downloads", "temp"),
      import_node_path2.default.join(import_node_os.default.homedir(), "Documents", "temp"),
      import_node_path2.default.join(import_node_os.default.homedir(), "Pictures", "temp"),
      import_node_path2.default.join(import_node_os.default.homedir(), "code", "temp")
    ];
  }
  try {
    console.log("\u{1F9F9} Started cleaning.....");
    foldersToTrash.map((item) => {
      if (!import_node_fs2.default.lstatSync(item).isDirectory()) {
        import_node_fs2.default.unlinkSync(item);
        cleanedFileCount += 1;
        return;
      }
      const itemsInTargetPath = import_node_fs2.default.readdirSync(item);
      itemsInTargetPath.forEach((subItem) => {
        if (filesAndfoldersNotToTrash.includes(subItem))
          return;
        const itemPath = import_node_path2.default.join(item, subItem);
        if (import_node_fs2.default.lstatSync(itemPath).isDirectory()) {
          const { fileCount, folderCount } = deleteFolderRecursive(itemPath);
          cleanedFileCount += fileCount;
          cleanedFolderCount += folderCount;
        } else {
          import_node_fs2.default.unlinkSync(itemPath);
          cleanedFileCount += 1;
        }
      });
      if (!item.includes("temp")) {
        console.log({ item });
        import_node_fs2.default.rmdirSync(item);
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
import_commander.program.name("cleanup").description("Tiny cli helps to clean then unwanted folders and files").version("0.0.2");
import_commander.program.command("start").description("Start clean the folders").argument("[string]", "Absoulte path of the folder or file").argument("[.]", "delete the files and folders in the current directory").action((str, _options) => {
  let foldersToTrash = [];
  if (str)
    foldersToTrash = String(str).split(",");
  if (str === ".")
    foldersToTrash = [process.cwd()];
  clean(foldersToTrash);
});
import_commander.program.parse();
