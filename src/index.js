import { program } from "commander";
import clean from "./functions/clean.js";

program
  .name("cleanup")
  .description("Tiny cli helps to clean then unwanted folders and files")
  .version("0.0.1");

program
  .command("start")
  .description("Start clean the folders")
  .argument("[string]", "Absoulte path of the folder or file")
  .argument("[.]", "delete the files and folders in the current directory")
  .action((str, _options) => {
    let foldersToTrash;
    if (str) foldersToTrash = String(str).split(",");
    if (str === ".") foldersToTrash = [process.cwd()];
    console.log({ foldersToTrash });
    clean(foldersToTrash);
  });

program.parse();
