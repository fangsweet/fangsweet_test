// script.js - 網站互動功能

document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle'); // 漢堡圖標按鈕
    const mainNav = document.querySelector('.main-nav'); // 主導航列
    const allNavLinks = document.querySelectorAll('.main-nav ul li a'); // 所有主選單連結 (現在不含子選單連結)

    // 創建一個疊加層元素
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // 1. 漢堡選單切換功能
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // 阻止點擊事件冒泡到 document，避免立即觸發外部關閉
            mainNav.classList.toggle('active'); // 切換 'active' 類別來顯示/隱藏主選單
            overlay.classList.toggle('active'); // 切換疊加層的顯示

            // 同步切換漢堡圖示為 X 或 Bars
            const icon = mobileNavToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // 變為 X 圖示
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // 變回 Bars 圖示
            }
        });
    }

    // 2. 點擊選單外部區域或疊加層關閉選單
    document.addEventListener('click', function(event) {
        // 如果選單是開啟的，且點擊的目標不是選單內部，也不是漢堡按鈕本身
        if (mainNav.classList.contains('active') &&
            !mainNav.contains(event.target) &&
            !mobileNavToggle.contains(event.target)) {

            mainNav.classList.remove('active');
            overlay.classList.remove('active'); // 關閉疊加層
            // 變回 Bars 圖示
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 3. 點擊選單內的連結後自動關閉選單
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // 對於所有連結，點擊後關閉主選單
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                overlay.classList.remove('active'); // 關閉疊加層
                // 變回 Bars 圖示
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 4. 處理視窗大小改變時的選單狀態 (桌面版自動隱藏手機版選單，並重置狀態)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            // 如果從手機版切換到桌面版，確保主選單狀態重置
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});