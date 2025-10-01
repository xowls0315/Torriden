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
        document.querySelectorAll(SELECTOR).forEach((el) => {
            // ① 항상 초기 상태로 강제(투명 + 시작 위치)
            reset(el);

            // ② 스와이퍼 내부면 IO로는 관찰하지 않음 (중복 재생 방지)
            if (el.closest('.aboutpage-swiper')) return;

            io.observe(el);
        });
    }

    // Swiper 연동(선택): 활성 슬라이드에서만 재생/리셋
    function hookSwiper(swiper) {
        if (!swiper || !swiper.on) return;

        // 현재 슬라이드의 "보이는" 모션 컨테이너만 골라 reset/play
        const getVisibleContainers = (slide) =>
            Array.from(slide.querySelectorAll(SELECTOR))
                // 1) 자신 또는 조상 중 .is-hidden 이면 제외
                .filter((c) => !c.closest('.is-hidden'))
                // 2) CSS로 숨김(display:none 등) 상태도 제외
                .filter((c) => c.offsetParent !== null);

        // 첫 활성 슬라이드도 즉시 reset (초기 깜빡임 방지)
        const first = swiper.slides?.[swiper.activeIndex];
        if (first) getVisibleContainers(first).forEach(reset);

        swiper.on('slideChangeTransitionStart', () => {
            const slide = swiper.slides[swiper.activeIndex];
            if (!slide) return;
            getVisibleContainers(slide).forEach(reset);
        });

        swiper.on('slideChangeTransitionEnd', () => {
            const slide = swiper.slides[swiper.activeIndex];
            if (!slide) return;
            getVisibleContainers(slide).forEach(play);
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
