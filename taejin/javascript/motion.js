// motion.js — reusable motion engine with presets (fade-up/left/right/scale)
(() => {
    const SELECTOR = '[data-motion]';

    // ms/s 보조
    const ms = (s) => Math.max(0, Number(s || 0) * 1000);

    // 프리셋 정의 (keyframes creator)
    const PRESETS = {
        'fade-up': (el) => {
            const d = Number(
                el.closest('[data-motion]')?.dataset.distance ?? 50
            );
            return [
                { transform: `translateY(${d}px)`, opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 },
            ];
        },
        'fade-down': (el) => {
            const d = Number(
                el.closest('[data-motion]')?.dataset.distance ?? 50
            );
            return [
                { transform: `translateY(-${d}px)`, opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 },
            ];
        },
        'fade-left': (el) => {
            const d = Number(
                el.closest('[data-motion]')?.dataset.distance ?? 50
            );
            return [
                { transform: `translateX(${d}px)`, opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 },
            ];
        },
        'fade-right': (el) => {
            const d = Number(
                el.closest('[data-motion]')?.dataset.distance ?? 50
            );
            return [
                { transform: `translateX(-${d}px)`, opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 },
            ];
        },
        scale: (el) => {
            const s = Number(
                el.closest('[data-motion]')?.dataset.scale ?? 0.95
            );
            return [
                { transform: `scale(${s})`, opacity: 0 },
                { transform: 'scale(1)', opacity: 1 },
            ];
        },
    };

    const BASE = { duration: 800, easing: 'ease', fill: 'forwards' };

    // 현재 요소에 적용할 프리셋 키 결정
    function getPresetKey(container) {
        const key = (container.getAttribute('data-motion') || '').trim();
        // 공백으로 여러 값을 주었다면, 첫 번째 유효 프리셋만 적용
        const tokens = key.split(/\s+/);
        for (const t of tokens) {
            if (PRESETS[t]) return t;
        }
        return 'fade-up'; // 디폴트
    }

    function reset(container) {
        const preset = getPresetKey(container);
        const d = Number(container.dataset.distance ?? 50);
        const s = Number(container.dataset.scale ?? 0.95);

        Array.from(container.children).forEach((el) => {
            if (el.getAnimations) el.getAnimations().forEach((a) => a.cancel());
            el.style.opacity = '0';
            switch (preset) {
                case 'fade-left':
                    el.style.transform = `translateX(${d}px)`;
                    break;
                case 'fade-right':
                    el.style.transform = `translateX(-${d}px)`;
                    break;
                case 'fade-down':
                    el.style.transform = `translateY(-${d}px)`;
                    break;
                case 'scale':
                    el.style.transform = `scale(${s})`;
                    break;
                case 'fade-up':
                default:
                    el.style.transform = `translateY(${d}px)`;
                    break;
            }
        });
    }

    function play(container) {
        const preset = getPresetKey(container);
        const stagger = Number(container.dataset.stagger ?? 0.08);
        const delay = Number(container.dataset.delay ?? 0);

        const makeFrames = PRESETS[preset] || PRESETS['fade-up'];

        Array.from(container.children).forEach((el, i) => {
            if (el.getAnimations) el.getAnimations().forEach((a) => a.cancel());
            const frames = makeFrames(el);
            el.animate(frames, { ...BASE, delay: ms(delay + i * stagger) });
        });
    }

    // IO (스크롤 진입)
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const el = entry.target;
                const once = el.getAttribute('data-once') !== 'false'; // default true
                if (entry.isIntersecting) {
                    play(el);
                    if (once) io.unobserve(el);
                } else if (!once) {
                    reset(el);
                }
            });
        },
        { threshold: 0.2 }
    );

    function scan() {
        document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    }

    // Swiper 연동(선택): 활성 슬라이드에서만 재생/리셋
    function hookSwiper(swiper) {
        if (!swiper || !swiper.on) return;
        swiper.on('slideChangeTransitionStart', () => {
            const slide = swiper.slides[swiper.activeIndex];
            if (!slide) return;
            slide.querySelectorAll(SELECTOR).forEach(reset);
        });
        swiper.on('slideChangeTransitionEnd', () => {
            const slide = swiper.slides[swiper.activeIndex];
            if (!slide) return;
            slide.querySelectorAll(SELECTOR).forEach(play);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        scan();
        const hero = document.querySelector('.hero-swiper');
        const instance = hero && hero.swiper;
        if (instance) hookSwiper(instance);
    });

    // 전역 노출
    window.Motion = { play, reset, scan, hookSwiper, PRESETS };
})();
