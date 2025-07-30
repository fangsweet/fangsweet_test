// script.js - 網站互動功能

document.addEventListener('DOMContentLoaded', function() {
    // 獲取移動導航切換按鈕 (漢堡圖標)
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    // 獲取主導航列
    const mainNav = document.querySelector('.main-nav');

    // 獲取所有有子選單的導航項目 (用於手機版點擊展開/收合子選單)
    const navItemsWithSubmenu = document.querySelectorAll('.main-nav ul li:has(.submenu) > a');

    // 漢堡選單切換功能
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active'); // 切換 'active' 類別
            // 點擊漢堡選單時，收合所有已展開的子選單
            // 在手機版切換主導覽列時，子選單應全部收合
            navItemsWithSubmenu.forEach(item => {
                const submenu = item.nextElementSibling;
                if (submenu && submenu.classList.contains('active-mobile-submenu')) {
                    submenu.classList.remove('active-mobile-submenu');
                }
            });
        });
    }

    // 手機版子選單點擊開合功能
    if (navItemsWithSubmenu.length > 0) {
        navItemsWithSubmenu.forEach(item => {
            item.addEventListener('click', function(event) {
                // 檢查是否為手機版模式 (主導航列為激活狀態)
                if (window.innerWidth <= 992 && mainNav.classList.contains('active')) {
                    const submenu = this.nextElementSibling; // 獲取緊鄰的子選單
                    if (submenu && submenu.classList.contains('submenu')) {
                        event.preventDefault(); // 阻止連結的預設行為 (跳轉頁面)
                        submenu.classList.toggle('active-mobile-submenu'); // 切換手機版子選單的 'active' 類別

                        // 收合其他已打開的子選單
                        navItemsWithSubmenu.forEach(otherItem => {
                            if (otherItem !== this) {
                                const otherSubmenu = otherItem.nextElementSibling;
                                if (otherSubmenu && otherSubmenu.classList.contains('active-mobile-submenu')) {
                                    otherSubmenu.classList.remove('active-mobile-submenu');
                                }
                            }
                        });
                    }
                }
            });
        });
    }

    // 當視窗大小改變時，如果從手機版變為桌面版，則移除 active 類別
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            mainNav.classList.remove('active');
            // 移除手機版子選單的 active 類別
            navItemsWithSubmenu.forEach(item => {
                const submenu = item.nextElementSibling;
                if (submenu && submenu.classList.contains('active-mobile-submenu')) {
                    submenu.classList.remove('active-mobile-submenu');
                }
            });
        }
    });
});