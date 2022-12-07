// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "kanzen" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('kanzen.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		vscode.window.showInformationMessage('process.env.OPENAI_API_TOKEN : ' + process.env.OPENAI_API_TOKEN);

		const { Configuration, OpenAIApi } = require("openai");
		const configuration = new Configuration({
			apiKey: process.env.OPENAI_API_TOKEN,
		});

		let clipboardContent = await vscode.env.clipboard.readText();
		const editor = vscode.window.activeTextEditor;
		const selectedText = editor?.document.getText(editor.selection);


		vscode.window.showInformationMessage('Hello World from kanzen!');
		vscode.window.showInformationMessage(clipboardContent);
		vscode.window.showInformationMessage(selectedText + "");

		const openai = new OpenAIApi(configuration);
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: "Say this is a test",
			max_tokens: 7,
			temperature: 0,
		});
		vscode.window.showInformationMessage("OpenAI Response :" + response.data.choices[0].text);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
