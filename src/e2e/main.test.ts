import { suite, test } from 'mocha'
import { strictEqual } from 'assert'
import { Uri, window, workspace } from 'vscode'

const testFile = '/src/e2e/test.txt'

suite('結合テスト', async () => {
  let config = workspace.getConfiguration('double-quote-to-double-minute')

  const fileUri = Uri.file(workspace.workspaceFolders![0].uri.fsPath + testFile)
  const openDoc = await workspace.openTextDocument(fileUri)
  window.showTextDocument(openDoc)
  // await sleep(500)

  // commands.executeCommand('')
  // workbench.action.

  suite('設定ON/フォーカスON', () => {
    config.update('enabled', true)
    // TODO フォーカスON
    test('コマンド有効', async () => {
      // TODO コマンド実行
      // TODO 待つ
      // TODO uriからファイルを開いて中身確認
      await strictEqual('〝〟', '〝〟')
    })
    test('コンテキストメニュー表示', async () => {
      // TODO コンテキストの項目数確認
      await strictEqual('〝〟', '〝〟')
    })
  })
  suite('設定ON/フォーカスOFF', () => {
    config.update('enabled', true)
    test('コマンドパレット有効', async () => {
      // TODO コマンド実行
      // TODO 待つ
      // TODO uriからファイルを開いて中身確認
      await strictEqual('〝〟', '〝〟')
    })
  })
  suite('設定OFF/フォーカスON', () => {
    config.update('enabled', false)
    test('コマンド無効', async () => {
      // TODO コマンド実行でエラーキャッチ
      await strictEqual('〝〟', '〝〟')
    })
    test('コンテキストメニュー非表示', async () => {
      // TODO コンテキストの項目数確認
      await strictEqual('〝〟', '〝〟')
    })
  })
  suite('設定OFF/フォーカスOFF', () => {
    config.update('enabled', false)
    test('コマンド無効', async () => {
      // TODO コマンド実行でエラーキャッチ
      await strictEqual('〝〟', '〝〟')
    })
  })
})
