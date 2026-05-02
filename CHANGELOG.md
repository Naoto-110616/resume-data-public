# CHANGELOG

## [Unreleased]

### Changed

- `career_ja.md` スキルマトリクスの整合性を修正（REVIEW_FEEDBACK P1-1）
  - JavaScript 1年→5年（Next.js / React 開発を通じて常用）
  - React.js 1年→3年（Next.js を通じて使用）
  - TypeScript 備考に「2022年以降の Next.js プロジェクトで主に使用」を追記
  - Next.js 備考に「App Router / Pages Router 双方の経験あり」を追記
  - 「その他」カテゴリを「CMS / EC」へ改称し、Shopify Plus の備考を具体化
- `career_ja.md` 直近3案件の▼実績を技術選定・設計判断ベースに深掘り追記（REVIEW_FEEDBACK P1-2）
  - アトムズ自社コーポレートサイト：Contentful / Vercel / Resend の選定理由、App Router + API Routes + TanStack Query 構成、reCAPTCHA / レート制限 / 冪等性を含む問い合わせフローの設計判断を追記。利用技術にも実構成を反映
  - 株式会社レオソフィアグループ EC：時差運用ルール（Linear チケット詳細化）、Shopify ↔ GitHub 自動デプロイ導入によるデグレ「ほぼゼロ」化と仕組み化観点を追記
  - 株式会社コーセー ネイル販売 EC：AWS Lambda 採用理由（Shopify 制約超過のカスタムロジック）、コードレビュー方針（保守性・可読性・分割の妥当性）、オフショアレビュー文化の醸成を追記
- `career_ja.md` 自己PR を強化（REVIEW_FEEDBACK P2）
  - 設計思想の理由付け（影響範囲の局所化・テスタビリティ・レビュー容易性）、品質保証への姿勢（仕組みで担保）、デザイン関心（XD→Figma 移行・トークン運用）を織り込み
- `resume_ja.md` 「志望の動機・特技…」欄を career_ja.md と整合（自動デプロイ整備・品質保証の仕組み化を追記）
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

- `career_ja.md` スキルマトリクスに以下のカテゴリを追加（REVIEW_FEEDBACK P3）
  - テスト / コンポーネント：Storybook（実務2年）、Vitest / Jest（学習中）、Playwright（学習中）
  - CI/CD・運用：GitHub Actions、Vercel、Shopify ↔ GitHub 自動デプロイ
  - デザイン：Figma（読み取り運用・XD 移行提案・トークン関心）、Adobe XD
- `documents/templates/expected_questions.md` を追加（想定質問14問の回答ドラフト、PREP・STAR形式での回答例、話し方チェックリストを収録）
- `documents/templates/reverse_questions.md` を追加（カジュアル面談・面接用の逆質問リスト、鉄板3問+カテゴリ別14問）
- `documents/templates/scout_reply.md` を追加（Findy等のスカウト返信テンプレート、3パターン）
- `TODO.md` を追加（5フェーズのロードマップと進捗ログ）
- `documents/転職tips/` 配下に面接対策資料5本を追加（技術面接 / 共通項 / 一般質問 / 言語化チェックリスト / リーダー層深掘り）
- `career_ja.md` に前職（2021年5月〜2022年3月）の職務経歴を追加
- `resume_ja.md` の免許・資格欄に普通自動車第一種運転免許（2018年）を追加
- 前職の会社都合に伴う現職への移籍（2026年4月）を `resume_ja.md` および `career_ja.md` に追加
- `resume_ja.md` の学歴・職歴欄に前職の在籍歴を追加し、作成日を更新
- `career_ja.md` のスキル欄を拡充し、現職・前職の実績を追記
- `resume_ja.md`、`career_ja.md`、`CHANGELOG.md` の会社名表記を統一
- `career_ja.md` のプロジェクト経歴欄を実案件ベースの内容に更新
- PDFの既存提出書類を参照し、`resume_ja.md` に学歴・旧職歴・自己PRを追記
- PDFの既存提出書類を参照し、`career_ja.md` に職務要約、得意分野、言語経験・スキル、案件ごとの具体実績を追記
- `documents/templates/self_introduction.md` を追加（カジュアル面談用の自己紹介スクリプト、1分30秒版と45秒版を収録）

## [1.0.0] - 2025-04-14

### Initial Release

- 初版作成
- `resume_ja.md`（履歴書）
- `career_ja.md`（職務経歴書）
