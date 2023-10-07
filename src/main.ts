/**
 * 要素名が見つからなかった場合のメッセージを取得
 * @param name 対象の要素名
 * @returns 
 */
export function getVSCodeErrorMessage(name: string): string {
  return `Error: vscode.${name} is Undefined`
} 
/**
 * ダブル引用符からダブルミニュートに置換
 * @param originalStr 
 * @returns 
 */
export function getQuoteToMinute(str: string): string {
  return str.replaceAll('“', '〝')
    .replaceAll('”', '〟')
}
/**
 * ダブルミニュートからダブル引用符に置換
 * @param str 
 * @returns 
 */
export function getMinuteToQuote(str: string): string {
  return str.replaceAll('〝', '“')
    .replaceAll('〟', '”')
}

/**
 * パスをUnix形式に変換
 * @param path 
 */
export function getUnixPath(path: string): string {
	return path.replaceAll('\\', '/')
		.replace(/^([a-z]):/, '/$1:')
}