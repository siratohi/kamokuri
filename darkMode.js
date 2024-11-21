// ダークモードのトグル状態をローカルストレージに保存/読み込みする関数
function syncDarkMode() {
    const htmlElement = document.documentElement;
    const darkModeToggle = document.getElementById('darkModeToggle');
  
    // ローカルストレージからダークモード状態を読み込み
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
    if (isDarkMode) {
        htmlElement.setAttribute('theme', 'dark-mode');
        darkModeToggle.style.backgroundImage = "url('sun.png')";
    } else {
        htmlElement.removeAttribute('theme');
        darkModeToggle.style.backgroundImage = "url('moon.png')";
    }
  }
  
  // ページ読み込み時にダークモードを同期
  window.addEventListener('load', syncDarkMode);
  
  // ダークモードトグルボタンのクリックイベントリスナー
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', () => {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.hasAttribute('theme');
  
    // ダークモード状態をローカルストレージに保存
    localStorage.setItem('darkMode', !isDarkMode);
  
    // ダークモードを同期
    syncDarkMode();
  });