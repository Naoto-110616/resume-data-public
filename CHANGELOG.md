# CHANGELOG

## [Unreleased]

### Changed

- 原稿を `documents/`、PDF 用スタイルを `styles/pdf.css` に整理（ルート直下の散在を解消）
- `md-to-pdf` を `package.json` の devDependency と `npm run pdf:*` で利用できるようにした
- `sample/` の提出フォーマットに合わせて、履歴書を JIS 規格風 2 カラム（A3 横）、職務経歴書を ◼︎ 見出し+案件別テーブル形式（A4 縦）に刷新
- スタイルシートを `styles/resume.css` / `styles/career.css` に分割し、`pdf.css` は廃止
- `package.json` の `pdf:*` スクリプトに `--pdf-options` を追加し、用紙サイズと向きを指定
- 履歴書の写真欄を JIS 履歴書フォーマットに合わせ、ふりがな・氏名・生年月日 行の右側に rowspan で配置（写真の下は電話欄として現住所・連絡先と共有）
- 履歴書の写真欄に `sample/sample.jpg` を埋め込み（30mm × 40mm、`object-fit: cover`）
- `scripts/build-pdf.js` を追加。`{{TODAY}}` トークンを実行日に置換し、`exports/{name}_{YYYYMMDD}.pdf` として履歴保存
- `package.json` の `pdf:*` スクリプトを `node scripts/build-pdf.js` に切り替え
- `documents/*.md` の固定日付を `{{TODAY}}` プレースホルダ化
- 出力ファイル名を提出用書式 `{氏名}_{YYYYMMDD}_{書類種類}.pdf` に変更（例: `山田太郎_20260427_履歴書.pdf`）
- 個人情報を `.env` から読み込む方式に変更し、公開用の `.env.example` を追加
- `documents/*.md` の氏名・住所・電話番号などを環境変数トークン化

### Fixed

- 履歴書 PDF の写真がリンク切れになる問題を修正。`{{PHOTO}}` トークンを base64 data URI に置換する方式に変更し、md-to-pdf のローカルサーバー経由の相対パス解決に依存しない実装に

### Added

- `career_ja.md` に前職（2021年5月〜2022年3月）の職務経歴を追加
- `resume_ja.md` の免許・資格欄に普通自動車第一種運転免許（2018年）を追加
- 前職の会社都合に伴う現職への移籍（2026年4月）を `resume_ja.md` および `career_ja.md` に追加
- `resume_ja.md` の学歴・職歴欄に前職の在籍歴を追加し、作成日を更新
- `career_ja.md` のスキル欄を拡充し、現職・前職の実績を追記
- `resume_ja.md`、`career_ja.md`、`CHANGELOG.md` の会社名表記を統一
- `career_ja.md` のプロジェクト経歴欄を実案件ベースの内容に更新
- PDFの既存提出書類を参照し、`resume_ja.md` に学歴・旧職歴・自己PRを追記
- PDFの既存提出書類を参照し、`career_ja.md` に職務要約、得意分野、言語経験・スキル、案件ごとの具体実績を追記

## [1.0.0] - 2025-04-14

### Initial Release

- 初版作成
- `resume_ja.md`（履歴書）
- `career_ja.md`（職務経歴書）
