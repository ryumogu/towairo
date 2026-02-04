// ========================================
// DOMContentLoaded - ページ読み込み完了後に実行
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initAgreementCheckbox();
    initFileUpload();
    initRequestForm();
    initContactForm();
    initFAQ();
    initSmoothScroll();
});

// ========================================
// モバイルメニューの初期化
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // ハンバーガーアイコンのアニメーション
            this.classList.toggle('active');
        });
        
        // メニュー項目をクリックしたらメニューを閉じる
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// ========================================
// 同意チェックボックスの初期化
// ========================================
function initAgreementCheckbox() {
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const proceedButton = document.getElementById('proceedButton');
    
    if (agreeCheckbox && proceedButton) {
        agreeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                proceedButton.classList.remove('disabled');
                proceedButton.disabled = false;
            } else {
                proceedButton.classList.add('disabled');
                proceedButton.disabled = true;
            }
        });
        
        // ボタンクリック時の処理
        proceedButton.addEventListener('click', function() {
            if (!this.disabled) {
                window.location.href = 'request.html';
            }
        });
    }
}

// ========================================
// ファイルアップロードの初期化
// ========================================
function initFileUpload() {
    const fileInput = document.getElementById('petPhotos');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const filePreview = document.getElementById('filePreview');
    
    if (!fileInput || !fileUploadArea || !filePreview) return;
    
    let selectedFiles = [];
    
    // ファイルアップロードエリアのクリックイベント
    fileUploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // ファイル選択時の処理
    fileInput.addEventListener('change', function(e) {
        handleFiles(e.target.files);
    });
    
    // ドラッグ＆ドロップの処理
    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(168, 196, 168, 0.2)';
    });
    
    fileUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.backgroundColor = '';
    });
    
    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.backgroundColor = '';
        handleFiles(e.dataTransfer.files);
    });
    
    // ファイル処理関数
    function handleFiles(files) {
        const maxFiles = 3;
        
        // 最大3枚まで
        if (selectedFiles.length + files.length > maxFiles) {
            alert(`写真は最大${maxFiles}枚までアップロードできます。`);
            return;
        }
        
        Array.from(files).forEach(file => {
            // 画像ファイルかチェック
            if (!file.type.startsWith('image/')) {
                alert('画像ファイルのみアップロード可能です。');
                return;
            }
            
            selectedFiles.push(file);
            displayFilePreview(file);
        });
        
        updateFileInput();
    }
    
    // プレビュー表示
    function displayFilePreview(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'file-preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="プレビュー">
                <button class="remove" type="button" onclick="removeFile('${file.name}')">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            filePreview.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
    }
    
    // ファイル削除関数（グローバルスコープに配置）
    window.removeFile = function(fileName) {
        selectedFiles = selectedFiles.filter(file => file.name !== fileName);
        updatePreview();
        updateFileInput();
    };
    
    // プレビュー更新
    function updatePreview() {
        filePreview.innerHTML = '';
        selectedFiles.forEach(file => displayFilePreview(file));
    }
    
    // FileListの更新
    function updateFileInput() {
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
    }
}

// ========================================
// 制作依頼フォームの初期化
// ========================================
function initRequestForm() {
    const requestForm = document.getElementById('requestForm');
    
    if (!requestForm) return;
    
    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(this);
        
        // バリデーション
        if (!validateRequestForm(formData)) {
            return;
        }
        
        // 送信処理（実際にはサーバーに送信）
        submitRequestForm(formData);
    });
}

// 制作依頼フォームのバリデーション
function validateRequestForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const petName = formData.get('petName');
    const petPhotos = formData.getAll('petPhotos');
    
    if (!name || name.trim() === '') {
        alert('お名前を入力してください。');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        alert('有効なメールアドレスを入力してください。');
        return false;
    }
    
    if (!petName || petName.trim() === '') {
        alert('ペットのお名前を入力してください。');
        return false;
    }
    
    if (!petPhotos || petPhotos.length === 0 || petPhotos[0].size === 0) {
        alert('ペットの写真を1枚以上アップロードしてください。');
        return false;
    }
    
    return true;
}

// 制作依頼フォームの送信処理
function submitRequestForm(formData) {
    // ローディング表示
    const submitButton = document.querySelector('#requestForm button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
    submitButton.disabled = true;
    
    // 実際の実装では、ここでサーバーにデータを送信
    // 例: fetch('/api/request', { method: 'POST', body: formData })
    
    // デモ用のタイムアウト処理
    setTimeout(function() {
        // フォームを非表示
        document.getElementById('requestForm').style.display = 'none';
        
        // 成功メッセージを表示
        document.getElementById('successMessage').style.display = 'block';
        
        // ページトップにスクロール
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // コンソールにデータを出力（デバッグ用）
        console.log('送信データ:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    }, 1500);
}

// ========================================
// お問い合わせフォームの初期化
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        };
        
        // バリデーション
        if (!validateContactForm(formData)) {
            return;
        }
        
        // 送信処理
        submitContactForm(formData);
    });
}

// お問い合わせフォームのバリデーション
function validateContactForm(formData) {
    if (!formData.name || formData.name.trim() === '') {
        alert('お名前を入力してください。');
        return false;
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        alert('有効なメールアドレスを入力してください。');
        return false;
    }
    
    if (!formData.subject || formData.subject === '') {
        alert('件名を選択してください。');
        return false;
    }
    
    if (!formData.message || formData.message.trim() === '') {
        alert('お問い合わせ内容を入力してください。');
        return false;
    }
    
    return true;
}

// お問い合わせフォームの送信処理
function submitContactForm(formData) {
    // ローディング表示
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
    submitButton.disabled = true;
    
    // 実際の実装では、ここでサーバーにデータを送信
    // 例: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    
    // デモ用のタイムアウト処理
    setTimeout(function() {
        // フォームを非表示
        document.getElementById('contactForm').style.display = 'none';
        
        // 成功メッセージを表示
        document.getElementById('contactSuccessMessage').style.display = 'block';
        
        // ページトップにスクロール
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // コンソールにデータを出力（デバッグ用）
        console.log('送信データ:', formData);
    }, 1500);
}

// ========================================
// FAQアコーディオンの初期化
// ========================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // すべてのFAQアイテムを閉じる
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // クリックされたアイテムをトグル
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ========================================
// スムーススクロールの初期化
// ========================================
function initSmoothScroll() {
    // ページ内リンクのスムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // "#"のみの場合は処理しない
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// ユーティリティ関数
// ========================================

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// スクロールアニメーション（オプション）
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// デバッグ用
// ========================================
console.log('Botanical Pet Art - Website Initialized');
console.log('モバイルメニュー: 初期化完了');
console.log('フォーム機能: 初期化完了');
console.log('FAQ機能: 初期化完了');