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
    includeHTML('#header', './taejin/pages/header.html');
    includeHTML('#footer', './taejin/pages/footer.html');
});
