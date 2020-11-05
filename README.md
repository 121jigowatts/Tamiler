# Tamiler

A bot that can talk in Tamil.

## Discription

LINEボットアプリケーション用のGoogle Apps Scriptコード。

## Feature

- タミル語で返信できる
- 会話できる
- 画像からカロリーを判定できる

## Usage

各種アカウント、トークン、API-KEYを取得。

- [LINE Developsers](https://developers.line.biz/ja/services/messaging-api/)
- [Talk API](http://a3rt.recruit-tech.co.jp/product/talkAPI/)
- [AIメーカー](https://aimaker.io/image/classification/detail/id/5643)

プロジェクトのプロパティ - スクリプトのプロパティに以下を設定。

|プロパティ|説明|
|-|-|
|CHANNEL_ACCESS_TOKEN|Messaging API設定のチャネルアクセストークン|
|TALK_API_KEY|Talk APIのAPI KEY|
|AIMAKER_API_KEY|AIメーカーのAPI KEY|
|AIMAKER_MODEL_ID|AIメーカーのモデルID|

翻訳言語サポートは以下のリファレンスを参照。

- [Translation API](https://cloud.google.com/translate/docs/languages)
