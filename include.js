// 재사용 가능한 include 함수
function includeHTML(selector, file) {
    fetch(file)
        .then((res) => res.text())
        .then((html) => {
            const mount = document.querySelector(selector);
            if (mount) mount.innerHTML = html;
        })
        .catch((err) => console.error(`❌ ${file} 로드 실패:`, err));
}

// DOM 준비되면 실행
document.addEventListener('DOMContentLoaded', () => {
    const baseURL = new URL(import.meta.url); // /include.js의 위치
    const headerURL = new URL('./taejin/pages/header.html', baseURL).href;
    const footerURL = new URL('./taejin/pages/footer.html', baseURL).href;

    includeHTML('#header', headerURL);
    includeHTML('#footer', footerURL);
});
