// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "debugchopper" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.debugchop', function () {
        // The code you place here will be executed every time your command is executed
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        const doc = editor.document;
        

        const text = doc.getText();

        const firstLine = doc.lineAt(0);
        const lastLine = doc.lineAt(doc.lineCount - 1);
        const textRange = new vscode.Range(0, 
                                 firstLine.range.start.character, 
                                 doc.lineCount - 1, 
                                 lastLine.range.end.character);

        let moddedText = text.replace(/(debugger;?)/gi,'');
        moddedText = moddedText.replace(/console.log\((.*)\);?/gi,'');

        editor.edit(builder=> builder.replace(textRange, moddedText))
       
        vscode.window.showInformationMessage('Debugs removed');
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;

