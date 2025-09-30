document.addEventListener('click', (e) => {
    const btn = e.target.closest('.mainpage_contents3_bests-like-btn');
    if (!btn) return;
    const icon = btn.querySelector('i');
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', (!pressed).toString());
    icon.classList.toggle('ri-heart-line', pressed); // 꺼짐 상태로 되돌릴 때
    icon.classList.toggle('ri-heart-fill', !pressed); // 켜짐 상태
});
