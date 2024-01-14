#!/usr/bin/env node

import { program } from "commander";
import clean from "./functions/clean";

program
  .name("cleanup")
  .description("Tiny cli helps to clean then unwanted folders and files")
  .version("0.0.4");

program
  .command("start")
  .description("Start clean the folders")
  .argument("[string]", "Absoulte path of the folder or file")
  .argument("[.]", "delete the files and folders in the current directory")
  .action((str, _options) => {
    let foldersToTrash: string[] = [];
    if (str) foldersToTrash = String(str).split(",");
    if (str === ".") foldersToTrash = [process.cwd()];
    clean(foldersToTrash);
  });

program.parse();
