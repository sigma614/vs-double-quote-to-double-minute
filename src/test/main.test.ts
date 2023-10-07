import { suite, test } from 'mocha'
import { strictEqual } from 'assert'

import * as main from '../main'

suite('getVSCodeErrorMessage', () => {
  test('vscodeの要素がないエラーを表示', () => {
    strictEqual(
      main.getVSCodeErrorMessage('str'),
      'Error: vscode.str is Undefined'
    )
  })
})
suite('getReplateQuoteToMinute', () => {
  test('全ての左クォートを上ミニュートに置換', () => {
    strictEqual(main.getQuoteToMinute('““'), '〝〝')
  })
  test('全ての右クォートを下ミニュートに変換', () => {
    strictEqual(main.getQuoteToMinute('””'), '〟〟')
  })
  test('検索文字がなければ置換しない', () => {
    strictEqual(main.getQuoteToMinute('str'), 'str')
  })
})
suite('getReplateMinuteToQuote', () => {
  test('全ての上ミニュートを左クォートに置換', () => {
    strictEqual(main.getMinuteToQuote('〝〝'), '““')
  })
  test('全ての下ミニュートを右クォートに変換', () => {
    strictEqual(main.getMinuteToQuote('〟〟'), '””')
  })
  test('検索文字がなければ置換しない', () => {
    strictEqual(main.getMinuteToQuote('str'), 'str')
  })
})
suite('getUnixPath', () => {
  test('全てのバックスラッシュをスラッシュに変換', () => {
    strictEqual(main.getUnixPath('\\'), '/')
  })
  test('先頭のドライブ表記前にスラッシュを追加', () => {
    strictEqual(main.getUnixPath('c:'), '/c:')
  })
  test('先頭以外のドライブ表記は置換しない', () => {
    strictEqual(main.getUnixPath(' c:'), ' c:')
  })
  test('検索文字がなければ置換しない', () => {
    strictEqual(main.getUnixPath('/c/Users'), '/c/Users')
  })
})
