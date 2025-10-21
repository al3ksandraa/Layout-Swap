import * as vscode from 'vscode';

const layout_map: { [key: string]: string } = {
    'й': 'q', 'ц': 'w', 'у': 'e', 'к': 'r', 'е': 't', 'н': 'y', 'г': 'u', 'ш': 'i', 'щ': 'o', 'з': 'p',
    'ф': 'a', 'ы': 's', 'в': 'd', 'а': 'f', 'п': 'g', 'р': 'h', 'о': 'j', 'л': 'k', 'д': 'l',
    'я': 'z', 'ч': 'x', 'с': 'c', 'м': 'v', 'и': 'b', 'т': 'n', 'ь': 'm',
    
    'х': '[', 'ъ': ']',
    'ё': '`',
    'э': "'",
    
    '"': '@',
    '№': '#',
    ';': '$',
    ':': '^',
    '?': '&',
    
    'ж': ';',
    'б': ',',
    'ю': '.',
    '.': '/',
    'Б': '<', 
    'Ю': '>'  
};

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension layoutswap is now active!');

	const disposable = vscode.commands.registerCommand('layoutswap.Swap', () => {
		const editor = vscode.window.activeTextEditor; // Активный файл
		if (!editor){
			return;
		}

		// Выделенный текст
		const selection = editor.selection;
		const text = editor.document.getText(selection);
		if (!text){
			vscode.window.showWarningMessage("Нет выделенного текста")
		}

		const changed_text = SwapLayout(text);
		
		editor.edit(editBuilder => {
			editBuilder.replace(selection, changed_text);
		});
	});

	context.subscriptions.push(disposable);
}

function SwapLayout(text: string): string {
	let res = '';

	for (let i = 0; i < text.length; i++){
		const char = text[i];
		const lower_char = char.toLowerCase();
		
		let new_char = layout_map[lower_char];
		if (layout_map[char]){
			new_char = layout_map[char];
		}

		if (new_char){ // Если буква есть в мапе
			res += (char == lower_char) ? new_char : new_char.toUpperCase();
		} else {
			res += char;
		}
	}

	return res;
}

export function deactivate() {}
