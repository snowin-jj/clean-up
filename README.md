# Cleanup CLI

A lightweight CLI tool for cleaning unwanted folders and files.

## Installation

```bash
npm install -g cleanup-cli
```

## Usage

```bash
cleanup start [folders...]
```

- `[folders...]`: Optional. Absolute path(s) of the folder(s) or file(s) to be cleaned. If not provided, the current working directory will be cleaned.

## Example

```bash
cleanup start /path/to/folder1,/path/to/folder2
```

This command will initiate the cleaning process for the specified folders.

```bash
cleanup start .
```

This command will clean the files and folders in the current working directory.

## Options

- `--version`: Show package version.

## Requirements

- [Node.js](https://nodejs.org/en "Node.js official website")

## Contributing

Feel free to contribute to this project. Fork and create a pull request with any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Note

Replace placeholders such as `[folders...]`, `/path/to/folder1`, `/path/to/folder2`, `cleanup-cli`, and `LICENSE` with your actual details. Ensure that you have a `LICENSE` file in your project directory with the appropriate license text.

Include any additional information or features specific to your package in the README. This template provides a starting point, and you can tailor it to better fit the structure and functionality of your project.

## TODO

- [x] Convert to typescript
