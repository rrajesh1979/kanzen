// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TextEncoder } from 'util';

const { Configuration, OpenAIApi } = require("openai");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "kanzen" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposableCreateTestCase = vscode.commands.registerCommand('kanzen.createTestCase', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		const editor = vscode.window.activeTextEditor;
		const selection = editor?.selection;
		const selectedText = editor?.document.getText(selection);

		vscode.window.showInformationMessage('Creating Test Case for you!');

		const command = "Create JUnit5 Test Case for the following piece of code. Include positive and negative test cases. :";

		const response = await callOpenAI(command + selectedText);

		//Write the response to the file
		const fileUri = vscode.Uri.file("/Users/rajesh/Learn/tmp/PalindromeTest.java");
		await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(response.data.choices[0].text));
		vscode.window.showTextDocument(fileUri, { preview: false });

	});

	let disposableExplainCode = vscode.commands.registerCommand('kanzen.explainCode', async () => {
		const editor = vscode.window.activeTextEditor;
		const selection = editor?.selection;
		const selectedText = editor?.document.getText(selection);

		vscode.window.showInformationMessage('Generating Explanation for Code!');

		const command = "Generate explanation for this segment of code. :";

		const response = await callOpenAI(command + selectedText);

		var codeExplanation = response.data.choices[0].text;
		codeExplanation = addNewLine(codeExplanation);
		editor?.edit(builder => builder.replace(editor?.selection, "/*\n" + codeExplanation + "\n*/" + "\n" + selectedText));

	});

	let disposableRefactorCodeToFunctional = vscode.commands.registerCommand('kanzen.refactorCodeToFunctional', async () => {
		const editor = vscode.window.activeTextEditor;
		const selection = editor?.selection;
		const selectedText = editor?.document.getText(selection);

		vscode.window.showInformationMessage('Refactoring Code!');

		const command = "Java. Refactor code into functional programming style. :";

		const response = await callOpenAI(command + selectedText);

		var refactoredCode = response.data.choices[0].text;
		editor?.edit(builder => builder.replace(editor?.selection, refactoredCode));

	});

	let disposableCustom = vscode.commands.registerCommand('kanzen.custom', async () => {
		const editor = vscode.window.activeTextEditor;
		const selection = editor?.selection;
		const selectedText = editor?.document.getText(selection);

		const customCommand = await vscode.window.showInputBox({
			placeHolder: "Custom Command",
			prompt: "What do you want to do?",
			value: ""
		});
		if (customCommand === '') {
			console.log(customCommand);
			vscode.window.showErrorMessage('Custom command is mandatory to execute this action');
		}

		if (customCommand !== undefined) {

			vscode.window.showInformationMessage('Executing Custom Command!');

			const command = customCommand + " :";

			const response = await callOpenAI(command + selectedText);

			var refactoredCode = response.data.choices[0].text;
			editor?.edit(builder => builder.replace(editor?.selection, refactoredCode));
		}

	});

	context.subscriptions.push(disposableCreateTestCase);
	context.subscriptions.push(disposableRefactorCodeToFunctional);
	context.subscriptions.push(disposableCustom);
	context.subscriptions.push(disposableExplainCode);
}



async function callOpenAI(selectedText: any) {
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_TOKEN,
	});

	const openai = new OpenAIApi(configuration);
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: selectedText,
		max_tokens: 1024,
		temperature: 0.6,
	});
	return response;
}

//Function to add newline characters for every line in the input string
function addNewLine(input: string) {
	var output = "";
	var lines = input.split(". ");
	for (var i = 0; i < lines.length; i++) {
		output += lines[i] + "\n";
	}
	return output;
}

// This method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage('Deactivating Kanzen Extension');
}
