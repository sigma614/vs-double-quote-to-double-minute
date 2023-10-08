import { suite, test } from 'mocha'
import { strictEqual } from 'assert'

import { readFileSync } from 'fs'

type PackageJson = {
  name: string
  main: string
  description: string
  displayName: string
  license?: string
  publisher: string
  version: string
  private?: false
  categories: string[]
  engines: { vscode: string }
  repository: {
    type: 'git'
    url: string
  }
  scripts?: {
    [key: string]: string
  }
  volta?: {
    [key: string]: string
  }
  dependencies?: {
    [key: string]: string
  }
  devDependencies: {
    [key: string]: string
  }
  contributes: {
    commands: Array<{
      command: string
      enablement: string
      title: string
    }>
    configuration: {
      title: string
      properties: {
        [key: string]: {
          description: string
          type: string
          default: boolean | number | string
        }
      }
    }
    menus: {
      'editor/context': Array<{
        command: string
        group: string
        when: string
      }>
    }
  }
}

const extentionName = 'double-quote-to-double-minute'
const code = 'utf8'

const data: PackageJson = JSON.parse(readFileSync('./package.json', code))
const dataEn: { [key: string]: string } = JSON.parse(
  readFileSync('./package.nls.json', code)
)
const dataJa: { [key: string]: string } = JSON.parse(
  readFileSync('./package.nls.ja.json', code)
)

suite('package.json', () => {
  test('説明（必須）', () => {
    strictEqual(
      data.description,
      // TODO 英語対応ふやす
      'Replace full-width double quotation marks (“”) and full-width double minutiae (〝〟).'
    )
  })
  test('パブリッシャー（必須）', () => {
    strictEqual(data.publisher, 'sigma614')
  })
  test('公開リポジトリ（必須）', () => {
    strictEqual(data.private === (undefined || false), true)
  })
  test('メインファイルを設定', () => {
    strictEqual(data.main, './out/extension.js')
  })
  test('Gitのリポジトリ名はVScodeとわかるようにvs-をつけておく', () => {
    strictEqual(data.name, `vs-${extentionName}`)
  })
  test('拡張名はvs-を入れない', () => {
    strictEqual(data.displayName, `${extentionName}`)
  })
  test('MITライセンス', () => {
    strictEqual(data.license, 'MIT')
  })
  test('GitのリポジトリURL（無いとパッケージ化時に警告）', () => {
    strictEqual(
      data.repository.url,
      `git@github.com:sigma614/vs-${extentionName}.git`
    )
  })
  test('パージョンをx.x.xと記載', () => {
    strictEqual(/^[0-9]*\.[0-9]*\.[0-9]*$/.test(data.version), true)
  })
  test('npmのbufferを使う', () => {
    strictEqual(
      data.dependencies !== undefined && typeof data.dependencies.buffer,
      'string'
    )
  })
  // TODO ふやしてもいいかも
  test('カテゴリはFormatterのみ', () => {
    strictEqual(data.categories.length, 1)
    strictEqual(data.categories[0], 'Formatters')
  })
})
suite('contributes', () => {
  test('コマンドを登録', () => {
    strictEqual(
      data.contributes.commands[0].command,
      `${extentionName}.toMinute`
    )
    strictEqual(
      data.contributes.commands[1].command,
      `${extentionName}.toQuote`
    )
  })
  test('コンテキストメニューから呼び出す', () => {
    strictEqual(
      data.contributes.menus['editor/context'][0].command,
      `${extentionName}.toMinute`
    )
    strictEqual(
      data.contributes.menus['editor/context'][1].command,
      `${extentionName}.toQuote`
    )
  })
  test('コンテキストメニューの2段目に表示', () => {
    strictEqual(data.contributes.menus['editor/context'][0].group, '1_run@1')
    strictEqual(data.contributes.menus['editor/context'][1].group, '1_run@2')
  })
  test('有効/無効切り替え設定を追加', () => {
    strictEqual(
      data.contributes.configuration.title,
      'Double Quote To Double Minute'
    )
    strictEqual(
      data.contributes.configuration.properties[`${extentionName}.enabled`]
        .type,
      'boolean'
    )
    strictEqual(
      data.contributes.configuration.properties[`${extentionName}.enabled`]
        .default,
      true
    )
  })
  test('有効の場合コマンド・メニューを表示', () => {
    strictEqual(
      data.contributes.commands[0].enablement,
      `config.${extentionName}.enabled`
    )
    strictEqual(
      data.contributes.commands[1].enablement,
      `config.${extentionName}.enabled`
    )
    strictEqual(
      data.contributes.menus['editor/context'][0].when,
      `config.${extentionName}.enabled`
    )
    strictEqual(
      data.contributes.menus['editor/context'][1].when,
      `config.${extentionName}.enabled`
    )
  })
})
suite('package-nls.json', () => {
  test('英語対応（コマンド名1）', () => {
    strictEqual(
      data.contributes.commands[0].title,
      `%${extentionName}.toMinuteTitle%`
    )
    strictEqual(typeof dataEn[`${extentionName}.toMinuteTitle`], 'string')
    strictEqual(typeof dataJa[`${extentionName}.toMinuteTitle`], 'string')
  })
  test('英語対応（コマンド名2）', () => {
    strictEqual(
      data.contributes.commands[1].title,
      `%${extentionName}.toQuoteTitle%`
    )
    strictEqual(typeof dataEn[`${extentionName}.toQuoteTitle`], 'string')
    strictEqual(typeof dataJa[`${extentionName}.toQuoteTitle`], 'string')
  })
  test('英語対応（設定の説明）', () => {
    strictEqual(
      data.contributes.configuration.properties[`${extentionName}.enabled`]
        .description,
      `%${extentionName}.enabledDescription%`
    )
    strictEqual(typeof dataEn[`${extentionName}.enabledDescription`], 'string')
    strictEqual(typeof dataJa[`${extentionName}.enabledDescription`], 'string')
  })
})
