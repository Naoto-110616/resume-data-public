# フロントエンドエンジニア レベルアップロードマップ

> 作成日: 2026-05-19  
> 対象: Next.js / React をメインに使うフロントエンドエンジニア

---

## 現状レベルの診断

| 領域 | レベル | 詳細 |
|------|--------|------|
| 実務スタック選定 | ⭐⭐⭐ | Zustand / TanStack Query / App Router を実務で使いこなしている |
| 概念・仕組みの理解 | ⭐⭐ | 「使える」が「なぜ動くか説明できない」状態 |
| TypeScript | ⭐ | 基本的な型は書けるが、型設計・Generics の理解が薄い |
| CSS / レイアウト | ⭐⭐ | Tailwind で実装できるが、プロパティの詳細は曖昧 |

**一言診断：「動くものは作れるが、なぜ動くかを説明できないレベル」**

これはミドルレベルへの入口。「説明できる・設計できる」レベルに上がることで、
シニアエンジニアとして評価されるようになる。

---

## ロードマップ全体像

```
現在 ──→ Phase 1 ──→ Phase 2 ──→ Phase 3 ──→ Phase 4
        仕組みを知る  TypeScript  設計力をつける  発信・証明する
        (1〜2ヶ月)   (1〜2ヶ月)  (2〜3ヶ月)     (継続)
```

---

## Phase 1：「なぜ動くか」を説明できるようになる（1〜2ヶ月）

### 目標
コードを書けるだけでなく、レビューや面接で「なぜそう書いたか」を説明できる。

### 1-1. React の仕組みを深める

#### useEffect の依存配列
```tsx
// NG: 毎レンダーで実行される
useEffect(() => { document.title = `Count: ${count}`; });

// OK: count が変わったときだけ実行
useEffect(() => { document.title = `Count: ${count}`; }, [count]);

// OK: マウント時の1回だけ
useEffect(() => { /* 初期化 */ }, []);
```

**理解すべきこと**
- レンダーのたびに useEffect が走るとどんな問題が起きるか
- クリーンアップ関数（return）が必要なケース（タイマー、イベントリスナー）
- `useEffect` を使わずに済む場面（派生データは `useMemo` で十分なことが多い）

#### React のレンダリングの仕組み
- state が変わると何が起きるか（仮想DOM → 差分検出 → 実DOM反映）
- `React.memo` / `useMemo` / `useCallback` をいつ使うべきか（早期最適化は悪）

### 1-2. Next.js App Router の深掘り

| コンポーネント | できること | できないこと |
|--------------|-----------|-------------|
| Server Component | DB直接アクセス, async/await | useState, useEffect, イベントハンドラ |
| Client Component | useState, useEffect, ブラウザAPI | サーバーリソースへの直接アクセス |

**理解すべきこと**
- `'use client'` を書く最小限の範囲に抑える設計
- Server Component でデータfetchして Client Component に props で渡すパターン
- `loading.tsx` / `error.tsx` / `not-found.tsx` の役割

### 1-3. TanStack Query の仕組み

```tsx
const { data } = useQuery({
  queryKey: ['user', userId], // ← キャッシュのキー（ここが重要）
  queryFn: () => fetchUser(userId),
});
```

**理解すべきこと**
- queryKey がキャッシュキーである理由（userId が変わると別クエリ）
- `staleTime` と `gcTime` の違い
- `useMutation` で更新後に `invalidateQueries` してキャッシュを更新するパターン
- Server Component の fetch との使い分け（Server → TQ不要 / Client → TQが便利）

---

## Phase 2：TypeScript を「防御手段」として使えるようになる（1〜2ヶ月）

### 目標
型エラーに「なぜ？」と思わず、型設計でバグを未然に防げる。

### 2-1. よく使う型パターン

```tsx
// Nullable を明示する
function getUser(id: string): User | undefined {
  return users.find(u => u.id === id);
}

// Union Types でステートを型安全に
type Status = 'idle' | 'loading' | 'success' | 'error';

// Generics で再利用可能な型
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Props に型をつける（interfaceでもtypeでもOK）
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};
```

### 2-2. 実務でよく使うユーティリティ型

```tsx
// Partial: 全プロパティをオプションに
type UpdateUserInput = Partial<User>;

// Pick: 必要なプロパティだけ取り出す
type UserPreview = Pick<User, 'id' | 'name' | 'avatar'>;

// Omit: 特定プロパティを除外
type UserWithoutPassword = Omit<User, 'password'>;

// Record: キーと値の型を定義
type PageViews = Record<string, number>;
```

### 2-3. 型推論を信頼する

```tsx
// ❌ 全部に型をつけようとする（過剰）
const name: string = 'Naoto';
const double = (n: number): number => n * 2;

// ✅ TypeScript が推論できる場所は任せる
const name = 'Naoto'; // string と推論される
const double = (n: number) => n * 2; // 戻り値も推論される
```

**学習リソース**
- [TypeScript Deep Dive（日本語）](https://typescript-jp.gitbook.io/deep-dive/)
- [type-challenges](https://github.com/type-challenges/type-challenges)（ゲーム感覚で型を鍛える）

---

## Phase 3：設計力・パフォーマンス意識を持つ（2〜3ヶ月）

### 目標
「動く」から「速くて・壊れにくくて・チームで保守できる」コードを書ける。

### 3-1. コンポーネント設計

```
悪い例：1つのコンポーネントに全部書く（500行の UserPage）

良い例：責務を分ける
├── UserPage（データ取得・ページ構成）
├── UserProfile（表示ロジック）
├── UserAvatar（アバター表示）
└── useUser（データfetchのカスタムフック）
```

**意識すべき原則**
- 1コンポーネント = 1責務
- カスタムフックでロジックをUIから分離
- Props のバケツリレーが3段を超えたら Zustand か Context を検討

### 3-2. パフォーマンス（Core Web Vitals）

| 指標 | 意味 | 目標値 |
|------|------|--------|
| LCP | 最大コンテンツの表示速度 | 2.5秒以下 |
| FID / INP | インタラクションの応答速度 | 200ms以下 |
| CLS | レイアウトのズレ | 0.1以下 |

**Next.js でできる改善**
- `next/image` で画像を最適化（自動WebP変換・遅延読み込み）
- `next/font` でフォントの最適化
- Dynamic Import（`next/dynamic`）で初期バンドルを減らす
- Server Component を使ってクライアントJSを減らす

### 3-3. CSS の理解を深める

```css
/* flex の省略形を正確に理解する */
flex: 1;
/* = flex-grow: 1（伸びる）flex-shrink: 1（縮む）flex-basis: 0%（基準0） */

/* Grid も使えると表現の幅が広がる */
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1rem;
```

**Tailwindを使いながら理解を深める方法**
- Tailwindのクラス名を使うとき「これは何のCSSか」を意識する
- `flex-1` は `flex: 1 1 0%` だと知っておく

---

## Phase 4：発信・証明する（継続）

転職活動では「作れる」を証明するものが必要。

### ポートフォリオに入れるべき要素

- **Server Component + Client Component の使い分け**が見えるNext.jsアプリ
- **TypeScript** で全ファイルに型をつける
- **TanStack Query** でデータfetchを管理
- **Zustand** でグローバルな状態管理
- パフォーマンス改善の実績（Lighthouseスコアのbefore/after）

### 技術的な説明ができるようにする

面接でよく聞かれる質問への準備：
- 「useEffect の依存配列を説明してください」
- 「Server Component と Client Component の違いは？」
- 「状態管理ライブラリをなぜ選びましたか？」
- 「パフォーマンスで気にしていることは？」

---

## 優先順位まとめ

```
今すぐやること（Phase 1）
  └─ useEffect の依存配列を完全に理解する
  └─ Server/Client Component の使い分けを言語化できるにする
  └─ TanStack Query の queryKey とキャッシュの仕組みを理解する

1〜2ヶ月後（Phase 2）
  └─ TypeScript の型設計を実務コードに適用する
  └─ type-challenges の初級〜中級を解く

2〜4ヶ月後（Phase 3）
  └─ コンポーネント分割の設計を意識する
  └─ Core Web Vitals を計測・改善する

継続（Phase 4）
  └─ 作ったものを GitHub / Zenn で公開する
  └─ 面接でこれらを説明できるようにする
```
