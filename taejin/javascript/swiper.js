// ─────────────────────────────────────────────
// swiper.js (전체)
// ─────────────────────────────────────────────

let productsSwiper; // 다른 파일(index.js)에서도 접근하는 공용 인스턴스

/**
 * 현재 스와이퍼 상태(실제 슬라이드 수, slidesPerView)에 맞게
 * loop를 켜거나 끄고, 맵핑을 안정화한다.
 */
function normalizeLoop(swiper) {
    if (!swiper || !swiper.el) return;

    // 1) 실제(복제 제외) 슬라이드 개수
    const wrapper = swiper.el.querySelector('.swiper-wrapper');
    const realCount = wrapper
        ? wrapper.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)')
              .length
        : 0;

    // 2) 현재 보이는 슬라이드 개수 판정
    //    - 숫자면 그대로, 'auto'면 실제 동적 개수 사용
    const raw = swiper.params.slidesPerView;
    const spv =
        raw === 'auto'
            ? Math.max(1, Math.ceil(swiper.slidesPerViewDynamic()))
            : typeof raw === 'number'
            ? raw
            : 1;

    const needLoop = realCount > spv;

    // 3) 루프 재구성
    swiper.loopDestroy(); // 기존 복제 제거
    swiper.params.loop = needLoop; // 이번 데이터에서 루프 필요 여부
    swiper.params.loopedSlides = realCount; // 맵핑 안정화(중요)

    if (needLoop) swiper.loopCreate(); // 필요하면 복제 생성

    swiper.update(); // 크기/진행바/네비 갱신

    // 네비게이션 disabled 클래스가 남는 경우가 있어 명시 갱신
    if (swiper.navigation && typeof swiper.navigation.update === 'function') {
        swiper.navigation.update();
    }
}

/**
 * productsSwiper의 슬라이드를 통째로 교체하고
 * 루프를 새 데이터 기준으로 정규화.
 * (index.js에서 BEST/NEW 버튼이 이 함수를 호출)
 */
function setSlides(htmlArray) {
    if (!productsSwiper) return;

    // 1) 기존 루프/슬라이드 제거 + 새 슬라이드 삽입
    productsSwiper.loopDestroy();
    productsSwiper.removeAllSlides();
    productsSwiper.appendSlide(htmlArray);

    // 2) 새 데이터 기준으로 루프 정규화
    normalizeLoop(productsSwiper);

    // 3) 시작 위치로 안전 이동
    if (
        productsSwiper.params.loop &&
        typeof productsSwiper.slideToLoop === 'function'
    ) {
        productsSwiper.slideToLoop(0, 0, false);
    } else {
        productsSwiper.slideTo(0, 0, false);
    }
}

// 다른 스크립트(index.js)에서 직접 호출 가능하도록 노출(선택)
window.setSlides = setSlides;
window.normalizeLoop = normalizeLoop;

document.addEventListener('DOMContentLoaded', () => {
    // ── 홈 히어로 스와이퍼 ──
    const heroSwiper = new Swiper('.mainpage_contents2 .swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 800,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        navigation: {
            nextEl: '.mainpage_contents2 .swiper-button-next',
            prevEl: '.mainpage_contents2 .swiper-button-prev',
        },
        pagination: {
            el: '.mainpage_contents2 .swiper-pagination',
            type: 'progressbar',
        },
    });

    // (선택) 히어로에도 모션 훅 연결하고 싶다면
    if (window.Motion?.hookSwiper) {
        try {
            window.Motion.hookSwiper(heroSwiper);
        } catch (e) {}
    }

    // ── 상품 스와이퍼 ──
    productsSwiper = new Swiper('.products-swiper', {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 20,
        speed: 600,

        // ✅ 루프 기본 ON (데이터/뷰포트에 따라 normalizeLoop가 상황에 맞게 켜고 끔)
        loop: true,
        loopAdditionalSlides: 2, // 과도하게 키우면 맵핑이 꼬일 수 있어 2~3 권장
        watchSlidesProgress: false, // 특별히 쓰지 않으면 false 권장

        breakpoints: {
            0: { slidesPerView: 1.2, slidesPerGroup: 1, spaceBetween: 12 },
            768: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16 },
            1024: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 20 },
        },
        navigation: {
            nextEl: '.products-next',
            prevEl: '.products-prev',
        },
        pagination: {
            el: '.products-pagination',
            type: 'progressbar',
        },
    });

    // 초기 1회 정규화
    normalizeLoop(productsSwiper);

    // 브레이크포인트 전환/리사이즈 시에도 정규화
    productsSwiper.on('resize', () => normalizeLoop(productsSwiper));

    // ── about (세로 풀페이지) 스와이퍼 ──
    const aboutEl = document.querySelector('.aboutpage-swiper');
    if (aboutEl) {
        const aboutSwiper = new Swiper('.aboutpage-swiper', {
            direction: 'vertical',
            slidesPerView: 'auto', // 각 슬라이드가 자신의 높이를 가짐
            autoHeight: false, // 컨테이너는 뷰포트 고정
            speed: 1000,
            mousewheel: {
                forceToAxis: true,
                releaseOnEdges: true,
                thresholdDelta: 30,
                sensitivity: 1.2,
            },
            nested: true,
            watchSlidesProgress: true,
            resistanceRatio: 0.85,
        });

        if (window.Motion?.hookSwiper) {
            try {
                window.Motion.hookSwiper(aboutSwiper);
            } catch (e) {}
        }

        // ── 2번 슬라이드 내부 단계 전환 ──
        const slide2 = document.querySelector('.aboutpage_content2');
        if (slide2) {
            const step1Wrap = slide2.querySelector('.aboutpage_content2-1');
            const step2Wrap = slide2.querySelector('.aboutpage_content2-2');
            const step2Motion = step2Wrap?.querySelector('[data-motion]');
            let step = 1;
            let animating = false;

            const fadeInUp = (el, duration = 400, distance = 20, delay = 0) =>
                new Promise((resolve) => {
                    const a = el.animate(
                        [
                            {
                                transform: `translateY(${distance}px)`,
                                opacity: 0,
                            },
                            { transform: 'translateY(0)', opacity: 1 },
                        ],
                        { duration, easing: 'ease', fill: 'forwards', delay }
                    );
                    a.onfinish = resolve;
                });

            const fadeOutUp = (container, duration = 400, distance = 20) =>
                new Promise((resolve) => {
                    const targets = container.children.length
                        ? Array.from(container.children)
                        : [container];
                    let done = 0;
                    targets.forEach((el) => {
                        const a = el.animate(
                            [
                                { transform: 'translateY(0)', opacity: 1 },
                                {
                                    transform: `translateY(-${distance}px)`,
                                    opacity: 0,
                                },
                            ],
                            { duration, easing: 'ease', fill: 'forwards' }
                        );
                        a.onfinish = () => {
                            done += 1;
                            if (done === targets.length) resolve();
                        };
                    });
                });

            const setStepInstant = (to) => {
                if (to === 1) {
                    step1Wrap.classList.add('is-visible');
                    step1Wrap.classList.remove('is-hidden');
                    step2Wrap.classList.add('is-hidden');
                    step2Wrap.classList.remove('is-visible');
                    step = 1;
                } else {
                    step2Wrap.classList.add('is-visible');
                    step2Wrap.classList.remove('is-hidden');
                    step1Wrap.classList.add('is-hidden');
                    step1Wrap.classList.remove('is-visible');
                    step = 2;
                }
            };

            const lockSwiper = (lock) => {
                aboutSwiper.allowSlideNext = !lock;
                aboutSwiper.allowSlidePrev = !lock;
                if (lock) aboutSwiper.mousewheel.disable();
                else aboutSwiper.mousewheel.enable();
            };

            const goStep = async (to) => {
                if (animating || step === to) return;
                animating = true;
                lockSwiper(true);

                if (to === 2) {
                    await fadeOutUp(step1Wrap, 400, 20);
                    step1Wrap.classList.add('is-hidden');
                    step1Wrap.classList.remove('is-visible');

                    step2Wrap.classList.remove('is-hidden');
                    step2Wrap.classList.add('is-visible');

                    if (window.Motion) {
                        Motion.reset(step2Motion || step2Wrap);
                        Motion.play(step2Motion || step2Wrap);
                    }
                    step = 2;
                } else {
                    await fadeOutUp(step2Motion || step2Wrap, 400, 20);
                    step2Wrap.classList.add('is-hidden');
                    step2Wrap.classList.remove('is-visible');

                    step1Wrap.classList.remove('is-hidden');
                    step1Wrap.classList.add('is-visible');

                    if (window.Motion) {
                        Motion.reset(step1Wrap);
                        Motion.play(step1Wrap);
                    }
                    step = 1;
                }

                setTimeout(() => {
                    lockSwiper(false);
                    animating = false;
                }, 50);
            };

            // 2번 슬라이드로 들어갈 때 초기 상태 + 모션 재생
            aboutSwiper.on('slideChangeTransitionStart', () => {
                if (aboutSwiper.activeIndex !== 1) return;
                const comingDown =
                    aboutSwiper.previousIndex < aboutSwiper.activeIndex;
                setStepInstant(comingDown ? 1 : 2);
                if (window.Motion) {
                    if (step === 1) Motion.reset(step1Wrap);
                    else Motion.reset(step2Motion || step2Wrap);
                }
            });
            aboutSwiper.on('slideChangeTransitionEnd', () => {
                if (aboutSwiper.activeIndex !== 1) return;
                if (window.Motion) {
                    if (step === 1) Motion.play(step1Wrap);
                    else Motion.play(step2Motion || step2Wrap);
                }
            });

            // 2번 슬라이드에서만 내부 단계 전환
            slide2.addEventListener(
                'wheel',
                (e) => {
                    if (aboutSwiper.activeIndex !== 1) return;
                    if (animating) {
                        e.preventDefault();
                        return;
                    }
                    const dy = e.deltaY || 0;
                    if (dy > 30 && step === 1) {
                        e.preventDefault();
                        goStep(2);
                    } else if (dy < -30 && step === 2) {
                        e.preventDefault();
                        goStep(1);
                    }
                },
                { passive: false }
            );
        }

        // ── 4번 슬라이드 내부 교차 전환 ──
        const slide4 = document.querySelector('.aboutpage_content4');
        if (slide4) {
            const panels = Array.from(slide4.querySelectorAll('.panel'));
            const total = panels.length;
            let step4 = 1;
            let anim4 = false;

            const cancelAnims4 = () => {
                panels.forEach((p) =>
                    p.getAnimations?.().forEach((a) => a.cancel())
                );
                panels.forEach((p) =>
                    p
                        .querySelectorAll('[data-motion]')
                        .forEach((n) =>
                            n.getAnimations?.().forEach((a) => a.cancel())
                        )
                );
            };

            const setStep4Instant = (to) => {
                cancelAnims4();
                step4 = to;
                panels.forEach((p, i) => {
                    const visible = i === step4 - 1;
                    p.classList.toggle('is-visible', visible);
                    p.classList.toggle('is-hidden', !visible);
                });
            };

            const playVisibleMotion4 = () => {
                const active = panels[step4 - 1];
                if (!active || !window.Motion) return;
                const targets = active.querySelectorAll('[data-motion]');
                targets.forEach((t) => {
                    Motion.reset(t);
                    Motion.play(t);
                });
            };

            const fadeInUp = (el, duration = 400, distance = 20, delay = 0) =>
                new Promise((resolve) => {
                    const a = el.animate(
                        [
                            {
                                transform: `translateY(${distance}px)`,
                                opacity: 0,
                            },
                            { transform: 'translateY(0)', opacity: 1 },
                        ],
                        { duration, easing: 'ease', fill: 'forwards', delay }
                    );
                    a.onfinish = resolve;
                });

            const fadeOutUp = (container, duration = 400, distance = 20) =>
                new Promise((resolve) => {
                    const targets = container.children.length
                        ? Array.from(container.children)
                        : [container];
                    let done = 0;
                    targets.forEach((el) => {
                        const a = el.animate(
                            [
                                { transform: 'translateY(0)', opacity: 1 },
                                {
                                    transform: `translateY(-${distance}px)`,
                                    opacity: 0,
                                },
                            ],
                            { duration, easing: 'ease', fill: 'forwards' }
                        );
                        a.onfinish = () => {
                            done += 1;
                            if (done === targets.length) resolve();
                        };
                    });
                });

            const crossSwap4 = async (to) => {
                if (anim4 || to === step4) return;

                aboutSwiper.allowSlideNext = false;
                aboutSwiper.allowSlidePrev = false;
                aboutSwiper.mousewheel.disable();
                anim4 = true;

                const fromPanel = panels[step4 - 1];
                const toPanel = panels[to - 1];

                const getCols = (panel) => {
                    const wrap = panel.firstElementChild;
                    return wrap ? Array.from(wrap.children) : [];
                };

                const FROM_DUR = 400;
                const FROM_DIST = 20;

                const fromMotionTargets = Array.from(
                    fromPanel.querySelectorAll('[data-motion]')
                );
                const fromColsNoMotion = getCols(fromPanel).filter(
                    (col) => !col.querySelector('[data-motion]')
                );

                await Promise.all([
                    ...fromMotionTargets.map((n) =>
                        fadeOutUp(n, FROM_DUR, FROM_DIST)
                    ),
                    ...fromColsNoMotion.map((n) =>
                        fadeOutUp(n, FROM_DUR, FROM_DIST)
                    ),
                ]);

                fromPanel.classList.remove('is-visible');
                fromPanel.classList.add('is-hidden');

                toPanel.classList.remove('is-hidden');
                toPanel.classList.add('is-visible');

                const toMotionTargets = Array.from(
                    toPanel.querySelectorAll('[data-motion]')
                );
                const toColsNoMotion = getCols(toPanel).filter(
                    (col) => !col.querySelector('[data-motion]')
                );

                await Promise.all(
                    toColsNoMotion.map((n) => fadeInUp(n, 400, 20))
                );
                if (window.Motion) {
                    toMotionTargets.forEach((n) => Motion.reset(n));
                    toMotionTargets.forEach((n) => Motion.play(n));
                }

                step4 = to;

                setTimeout(() => {
                    aboutSwiper.allowSlideNext = true;
                    aboutSwiper.allowSlidePrev = true;
                    aboutSwiper.mousewheel.enable();
                    anim4 = false;
                }, 50);
            };

            slide4.addEventListener(
                'wheel',
                (e) => {
                    if (aboutSwiper.activeIndex !== 3) return;
                    if (anim4) {
                        e.preventDefault();
                        return;
                    }
                    const dy = e.deltaY || 0;
                    if (dy > 30) {
                        if (step4 < total) {
                            e.preventDefault();
                            crossSwap4(step4 + 1);
                        }
                    } else if (dy < -30) {
                        if (step4 > 1) {
                            e.preventDefault();
                            crossSwap4(step4 - 1);
                        }
                    }
                },
                { passive: false }
            );

            aboutSwiper.on('slideChangeTransitionStart', () => {
                if (aboutSwiper.activeIndex === 3) {
                    const comingDown =
                        aboutSwiper.previousIndex < aboutSwiper.activeIndex;
                    setStep4Instant(comingDown ? 1 : total);
                }
            });
            aboutSwiper.on('slideChangeTransitionEnd', () => {
                if (aboutSwiper.activeIndex === 3) playVisibleMotion4();
            });
        }

        // ── 6번 슬라이드 내부 스크롤 보호 ──
        const scroller6 = document.querySelector(
            '.aboutpage_content6 .content6_scroller'
        );
        if (scroller6) {
            scroller6.addEventListener(
                'wheel',
                (e) => {
                    if (!aboutEl) return;
                    const inst = aboutEl.swiper;
                    if (!inst || inst.activeIndex !== 5) return;
                    const el = scroller6;
                    const atTop = el.scrollTop <= 0;
                    const atBottom =
                        el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
                    if (
                        (e.deltaY < 0 && !atTop) ||
                        (e.deltaY > 0 && !atBottom)
                    ) {
                        e.stopPropagation();
                    }
                },
                { passive: true }
            );
        }
    }
});
