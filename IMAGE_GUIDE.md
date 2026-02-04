# 画像配置ガイド

## 📸 画像の配置方法

### 1. フォルダ構造

```
images/
├── gallery/
│   ├── dog-before-1.jpg
│   ├── dog-after-1.jpg
│   ├── dog-before-2.jpg
│   ├── dog-after-2.jpg
│   ├── cat-before-1.jpg
│   ├── cat-after-1.jpg
│   ├── cat-before-2.jpg
│   ├── cat-after-2.jpg
│   ├── rabbit-before-1.jpg
│   ├── rabbit-after-1.jpg
│   ├── rabbit-before-2.jpg
│   └── rabbit-after-2.jpg
├── hero/
│   └── sample-art.jpg
└── logo.png (オプション)
```

### 2. 画像の推奨サイズ

#### ギャラリー画像（Before/After）
- **サイズ**: 600x600px（正方形）
- **形式**: JPG または PNG
- **容量**: 500KB以下推奨

#### ヒーローセクションのサンプルアート
- **サイズ**: 800x800px（正方形）
- **形式**: JPG または PNG
- **容量**: 1MB以下推奨

#### ロゴ（オプション）
- **サイズ**: 200x50px程度
- **形式**: PNG（透過推奨）
- **容量**: 100KB以下推奨

### 3. HTMLの修正箇所

#### 3-1. ヒーローセクションのサンプルアート（index.html 72行目付近）

**変更前（プレースホルダー）:**
```html
<div class="artwork-placeholder">
    <i class="fas fa-paw"></i>
    <p>水彩画風<br>ボタニカルアート</p>
</div>
```

**変更後（実際の画像）:**
```html
<img src="images/hero/sample-art.jpg" alt="ボタニカルペットアート作品例" class="sample-art-image">
```

**CSSも追加が必要:**
```css
.sample-art-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 15px;
}
```

#### 3-2. ギャラリーの犬セクション（index.html 150行目付近）

**変更前（プレースホルダー）:**
```html
<div class="image-box before">
    <div class="image-placeholder">
        <i class="fas fa-camera"></i>
        <p>Before</p>
        <span>お写真</span>
    </div>
</div>
```

**変更後（実際の画像）:**
```html
<div class="image-box before">
    <img src="images/gallery/dog-before-1.jpg" alt="柴犬まるちゃんの写真" class="gallery-image">
    <span class="image-label">Before</span>
</div>
```

**After側も同様に:**
```html
<div class="image-box after">
    <img src="images/gallery/dog-after-1.jpg" alt="柴犬まるちゃんのボタニカルアート" class="gallery-image">
    <span class="image-label">After</span>
</div>
```

**CSSも追加が必要:**
```css
.image-box {
    position: relative;
}

.gallery-image {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 10px;
}

.image-label {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 12px;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: 600;
}
```

### 4. 自動的に画像を配置する方法

上記の修正を自動で適用したい場合は、以下の手順で実行してください：

1. `images/gallery/` フォルダに画像を配置
2. 「画像を配置する」とお知らせください
3. 自動的にHTMLとCSSを修正します

### 5. 画像がない場合の代替案

実際の制作事例がまだない場合：

#### オプションA: プレースホルダー画像サービスを使う
```html
<img src="https://placehold.co/600x600/A8C4A8/FFFFFF?text=Sample+Art" alt="サンプル">
```

#### オプションB: Unsplashの無料画像を使う（商用利用可）
```html
<img src="https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=600&fit=crop" alt="犬の写真">
```

#### オプションC: 「準備中」表示を残す
現在のプレースホルダーのままにして、実際の制作事例ができたら順次追加

---

## 🎨 実際に画像を配置する手順（詳細版）

### ステップ1: 画像ファイルを準備
1. ペット写真とイラストを用意
2. 画像編集ソフトで600x600pxにリサイズ
3. 適切なファイル名に変更

### ステップ2: 画像をアップロード
1. プロジェクトの `images/gallery/` フォルダに画像を配置
2. ファイル名は上記の命名規則に従う

### ステップ3: 「画像を配置してください」と依頼
私がHTMLとCSSを自動的に修正します！

---

## ❓ よくある質問

**Q: 画像のサイズが揃っていない場合は？**
A: CSSの `object-fit: cover;` で自動的にトリミングされます

**Q: 画像が重くてページ表示が遅い場合は？**
A: 画像圧縮ツール（TinyPNG等）で最適化してください

**Q: 将来的に画像を追加したい場合は？**
A: 同じパターンでHTMLをコピーして、画像パスを変更すればOK

---

準備ができたら、「画像を配置したい」とお知らせください！
具体的な修正コードを提供します。