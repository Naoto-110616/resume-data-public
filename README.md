# resume-data

履歴書・職務経歴書を Markdown から PDF に変換するためのテンプレート兼ビルド環境です。

個人情報は `.env` から読み込みます。公開リポジトリには `.env.example` のようなダミー値だけを置き、実データ・本人写真・生成済み PDF は Git 管理しない運用を前提にしています。

## ファイル構成

```text
resume-data/
├── documents/         # 履歴書・職務経歴書の Markdown 原稿
│   ├── resume_ja.md   # 履歴書（JIS 規格風 / A3 横）
│   └── career_ja.md   # 職務経歴書（A4 縦）
├── styles/
│   ├── resume.css     # 履歴書用スタイル
│   └── career.css     # 職務経歴書用スタイル
├── scripts/
│   └── build-pdf.js   # PDF 出力スクリプト（.env 読み込み + トークン置換）
├── sample/            # 参考用サンプル PDF / ローカル写真
├── exports/           # 出力した PDF を日付付きで保存（Git 管理外）
├── .env.example       # 公開用のダミー設定
├── package.json       # PDF 出力ツール（md-to-pdf）の依存関係
├── CHANGELOG.md       # 更新履歴
└── README.md
```

## 個人情報の設定

`.env.example` をコピーして `.env` を作成し、自分の情報に書き換えます。

```bash
cp .env.example .env
```

`.env` は Git 管理しません。氏名、住所、電話番号、メールアドレス、写真パスなどの公開したくない値は `.env` にだけ置いてください。

主な設定値:

```env
OWNER_NAME=山田 太郎
OWNER_FURIGANA=やまだ　たろう
OWNER_FILENAME=山田太郎
BIRTH_DATE=2000-01-01
POSTAL_CODE=000-0000
ADDRESS=東京都千代田区丸の内1-1-1
PHONE=000-0000-0000
SHOW_CONTACT=false
EMAIL=example@example.com
PHOTO_PATH=
```

`SHOW_CONTACT=true` にすると、`CONTACT_FURIGANA`、`CONTACT_POSTAL_CODE`、`CONTACT_ADDRESS`、`CONTACT_PHONE` の値を履歴書の「連絡先（現住所以外に連絡を希望する場合のみ記入）」欄に出力します。未設定または `false` の場合、この連絡先欄の詳細だけが空になります。現住所、現住所側の電話番号、メールアドレスなどには影響しません。

`PHOTO_PATH` にはプロジェクトルートからの相対パスを指定できます。未指定またはファイルが存在しない場合は、PDF にはプレースホルダー画像が入ります。

## PDF出力方法

[md-to-pdf](https://github.com/simonhaenisch/md-to-pdf) を **プロジェクトの devDependency** として入れています。グローバルインストールより、クローン後に `npm install` するだけで同じバージョンが揃います。

リポジトリのルートで:

```bash
npm install

# どちらか一方
npm run pdf:resume
npm run pdf:career

# 両方まとめて
npm run pdf
```

> 履歴書は JIS 規格風の 2 カラムレイアウトのため **A3 横**、職務経歴書は **A4 縦** で出力されます。

### 出力の仕組み

`scripts/build-pdf.js` が以下を自動で行います。

1. `.env` と環境変数から個人情報を読み込む
2. Markdown 内の `{{TODAY}}` や `{{OWNER_NAME}}` などのトークンを置換
3. `exports/{OWNER_FILENAME}_{YYYYMMDD}_{書類種類}.pdf` というファイル名で保存（同日に複数回実行すれば上書き）

出力例:

```text
exports/山田太郎_20260427_履歴書.pdf
exports/山田太郎_20260427_職務経歴書.pdf
```

書類のヘッダー部の日付も `{{TODAY}}` トークンで管理しているため、原稿側に書き込む必要はありません。

## 公開リポジトリとしての運用

- `.env`、`exports/`、本人写真は Git 管理しない
- `documents/*.md` には個人情報を直書きせず、`{{OWNER_NAME}}` のようなトークンを使う
- 公開前に `git ls-files` で PDF・写真・実データが追跡されていないことを確認する
- 既に個人情報をコミットした履歴がある場合は、Public 化前に履歴を洗浄するか、新規リポジトリへ公開可能なファイルだけコピーする

## 更新ルール

- 変更は `CHANGELOG.md` に記録する
- PDF 書き出しは `npm run pdf` で `exports/` に保存する（日付付きファイル名で自動保存、Git 管理外）
