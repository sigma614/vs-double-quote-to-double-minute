import { commands, ExtensionContext, Uri, window, workspace } from 'vscode'
import * as main from './main'
import { Buffer } from 'buffer'

const extensionName = 'double-quote-to-double-minute'
/**
 * ダブル引用符とダブルミニュートを置換
 * @param context
 */
export function activate(context: ExtensionContext) {
  const command1 = commands.registerCommand(
    `${extensionName}.toMinute`,
    async () => {
      const doc = window.activeTextEditor?.document
      if (doc === undefined) {
        return
      }
      const text = main.getQuoteToMinute(doc.getText())
      const uri = getUri(doc.fileName)
      await writeText(text, uri)
    }
  )
  const command2 = commands.registerCommand(
    `${extensionName}.toQuote`,
    async () => {
      const doc = window.activeTextEditor?.document
      if (doc === undefined) {
        return
      }
      const text = main.getMinuteToQuote(doc.getText())
      const uri = getUri(doc.fileName)
      await writeText(text, uri)
    }
  )
  context.subscriptions.push(command1)
  context.subscriptions.push(command2)
}
/**
 * パスをUnix形式のUrlに変換
 * @param path
 */
export function getUri(path: string): Uri {
  const unixPath = main.getUnixPath(path)
  return Uri.parse(unixPath)
}
/**
 * テキストファイルに書き込み
 * @param str
 * @param uri
 */
export function writeText(str: string, uri: Uri): void {
  const blob: Uint8Array = Buffer.from(str)
  workspace.fs.writeFile(uri, blob)
}
export function deactivate() {}
