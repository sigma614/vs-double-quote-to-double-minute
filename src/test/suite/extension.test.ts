import * as assert from 'assert'
const testFileLocation = '/test.txt'
import { suite, test } from 'mocha'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {

  test('Sample test', async () => {
    const fileUri = vscode.Uri.file(
      vscode.workspace.workspaceFolders![0].uri.fsPath + testFileLocation
    )
    await vscode.workspace.openTextDocument(fileUri)

    assert.strictEqual(-1, [1, 2, 3].indexOf(5))
    assert.strictEqual(-1, [1, 2, 3].indexOf(0))
  })
})
