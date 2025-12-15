# The Expendible Elf
A simple game about catching presents.

## Controls
- ARROW KEY LEFT / RIGHT = move elf.
- ARROW KEY DOWN = place intern.
- SPACE = dash.

## Use Code
Open index.html to run the game.

## Play Game
[https://the-expendible-elf.netlify.app/](https://the-expendible-elf.netlify.app/)


## Developing

If you want type-checking and intelli-sense in vscode, you'll need to have node.js installed.  Run the following to download the type-checker and the p5.js types for p5 v1.x:

```bash
npm i
```

## Type-checking ALL code
Normally, errors will come up in vscode for the currently open file(s), but if you want to check ALL files, you can use the `ctrl-shift-b` or `cmd-shift-b` shortcut to run the vscode default "build task" which has been configured in `.vscode/tasks.json`.  This will list ALL errors into the vscode `problems` window.

Alternatively, you can start the type-checker running forever in a terminal window with
```bash
npm run type-check:watch
```
It will run a check each time a file is changed and report any issues to the terminal.  To stop it, press `ctrl-c` in that terminal.

![alt text](screen-shot.png)