document.addEventListener('DOMContentLoaded', () => {
    const menus = document.querySelectorAll('.menu');

    menus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            // 클릭 시 로그 확인 또는 페이지 이동 전 효과
            console.log(`${menu.getAttribute('href')}로 이동합니다.`);
        });
    });
});