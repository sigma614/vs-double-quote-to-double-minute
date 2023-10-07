import { strictEqual } from 'assert'
import { describe, it } from 'mocha'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { commands, Uri, window, workspace } from 'vscode'
// import * as myExtension from '../../extension';
const testFileLocation = '/test.txt'
const extentionName = 'double-quote-to-double-minute'
describe('機能ON/ファイルON', async function () {
  const fileUri = Uri.file(
    workspace.workspaceFolders![0].uri.fsPath + testFileLocation
  )
  const fs = workspace.fs
  const config = workspace.getConfiguration(extentionName)
  config.update('enabled', true)
  it('更新前は引用符', async function () {
    const readFile = await fs.readFile(fileUri)
    await strictEqual(readFile.toString(), '“”')
  })
  it('開く前にコマンド実行しても変わらない', async () => {
    await commands.executeCommand(`${extentionName}.toMinute`)
    const readFile = await fs.readFile(fileUri)
    await strictEqual(readFile.toString(), '“”')
  })
  it('開いてからコマンド実行でミニュートへ置換', async function () {
    const doc = await workspace.openTextDocument(fileUri)
    await window.showTextDocument(doc)
    await commands.executeCommand(`${extentionName}.toMinute`)

    const readFile = await fs.readFile(fileUri)
    await strictEqual(readFile.toString(), '〝〟')
  })
  it('コマンド実行で引用符へ置換', async function () {
    await commands.executeCommand(`${extentionName}.toQuote`)
    // MEMO 無いと落ちる
    await sleep(500)

    const readFile = await fs.readFile(fileUri)
    await strictEqual(readFile.toString(), '“”')
  })
})

// TODO 閉じたときもコマンド呼べる
// TODO コンテキストのテストはできてない
