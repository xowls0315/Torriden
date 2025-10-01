let productsSwiper; // 공통으로 사용하기 위해 바깥에 선언

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

    // ── 상품 스와이퍼 ──
    productsSwiper = new Swiper('.products-swiper', {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        loopPreventsSliding: false,
        loopAdditionalSlides: 6,
        watchSlidesProgress: true,
        speed: 600,
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

    // ── about (세로 풀페이지) 스와이퍼 ──
    const el = document.querySelector('.aboutpage-swiper');
    if (!el) return;

    const aboutSwiper = new Swiper('.aboutpage-swiper', {
        direction: 'vertical',
        // 핵심: 슬라이드 높이를 각자 계산
        slidesPerView: 'auto',
        autoHeight: false, // 컨테이너 높이는 고정(뷰포트) 유지
        speed: 1000,
        mousewheel: {
            forceToAxis: true,
            releaseOnEdges: true, // 마지막/처음에서 부드럽게 멈춤
            thresholdDelta: 30,
            sensitivity: 1.2,
        },
        nested: true,
        watchSlidesProgress: true,
        resistanceRatio: 0.85,
    });
      

    // (선택) Motion과 연동해서 활성 슬라이드에서만 data-motion 재생
    if (window.Motion?.hookSwiper) {
        Motion.hookSwiper(aboutSwiper);
    }

    // ── 2번 슬라이드 내부 단계 상태/애니메이션 ──
    const slide2 = document.querySelector('.aboutpage_content2');
    if (!slide2) return;

    const step1Wrap = slide2.querySelector('.aboutpage_content2-1'); // 2-1 컨테이너 (data-motion 달려있음)
    const step2Wrap = slide2.querySelector('.aboutpage_content2-2'); // 2-2 컨테이너
    const step2Motion = step2Wrap.querySelector('[data-motion]'); // 2-2의 실제 모션 대상(.aboutpage_content2-2_text)

    let step = 1; // 1: 2-1 보임 / 2: 2-2 보임
    let animating = false;

    // 즉시 보임/숨김만 세팅(애니메이션 없음)
    function setStepInstant(to) {
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
    }

    // 간단한 fade-in-up(등장) 헬퍼
    function fadeInUp(el, duration = 400, distance = 20, delay = 0) {
        return new Promise((resolve) => {
            const a = el.animate(
                [
                    { transform: `translateY(${distance}px)`, opacity: 0 },
                    { transform: 'translateY(0)', opacity: 1 },
                ],
                { duration, easing: 'ease', fill: 'forwards', delay }
            );
            a.onfinish = resolve;
        });
    }

    // 간단한 fade-out-up(사라질 때) 헬퍼
    function fadeOutUp(container, duration = 400, distance = 20) {
        return new Promise((resolve) => {
            const targets = container.children.length
                ? Array.from(container.children)
                : [container];
            let done = 0;
            targets.forEach((el) => {
                const a = el.animate(
                    [
                        { transform: 'translateY(0)', opacity: 1 },
                        { transform: `translateY(-${distance}px)`, opacity: 0 },
                    ],
                    { duration, easing: 'ease', fill: 'forwards' }
                );
                a.onfinish = () => {
                    done += 1;
                    if (done === targets.length) resolve();
                };
            });
        });
    }

    // 메인 스와이프 잠금/해제
    function lockSwiper(lock) {
        aboutSwiper.allowSlideNext = !lock;
        aboutSwiper.allowSlidePrev = !lock;
        if (lock) aboutSwiper.mousewheel.disable();
        else aboutSwiper.mousewheel.enable();
    }

    // 내부 전환 (2-1 ↔ 2-2) : 기존 로직 유지
    async function goStep(to) {
        if (animating || step === to) return;
        animating = true;
        lockSwiper(true);

        if (to === 2) {
            // 2-1 → 2-2
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
            // 2-2 → 2-1
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
    }

    // ✅ “2번 슬라이드로 들어갈 때” 방향에 따라 초기 상태 + 등장 애니메이션
    aboutSwiper.on('slideChangeTransitionStart', () => {
        if (aboutSwiper.activeIndex !== 1) return;
        const comingDown = aboutSwiper.previousIndex < aboutSwiper.activeIndex; // 1→2 내려옴?
        // 내려오면 2-1부터, 올라오면 2-2부터
        setStepInstant(comingDown ? 1 : 2);

        // 재생 전 상태 초기화만 먼저
        if (window.Motion) {
            if (step === 1) {
                Motion.reset(step1Wrap);
            } else {
                Motion.reset(step2Motion || step2Wrap);
            }
        }
    });

    aboutSwiper.on('slideChangeTransitionEnd', () => {
        if (aboutSwiper.activeIndex !== 1) return;
        // 여기서 실제 등장 애니메이션 재생
        if (window.Motion) {
            if (step === 1) {
                // ✅ 1→2로 내려올 때 2-1 fade-up
                Motion.play(step1Wrap);
            } else {
                // ✅ 3→2로 올라올 때 2-2 fade-up
                Motion.play(step2Motion || step2Wrap);
            }
        }
    });

    // 2번 슬라이드에서만 휠 입력 가로채기 (내부 단계 전환)
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

    // ── 4번 슬라이드 내부 단계 전환 (한 화면 교차) ──
    const slide4 = document.querySelector('.aboutpage_content4');
    if (slide4) {
        const panels = Array.from(slide4.querySelectorAll('.panel')); // 4개
        const total = panels.length; // 4
        let step4 = 1; // 1~4
        let anim4 = false; // 중복 입력 방지

        // 헬퍼: 모든 애니메이션 취소
        function cancelAnims4() {
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
        }

        // 즉시 상태 세팅(보임/숨김만)
        function setStep4Instant(to) {
            cancelAnims4();
            step4 = to;
            panels.forEach((p, i) => {
                const visible = i === step4 - 1;
                p.classList.toggle('is-visible', visible);
                p.classList.toggle('is-hidden', !visible);
            });
        }

        // 현재 보이는 패널의 data-motion만 재생
        function playVisibleMotion4() {
            const active = panels[step4 - 1];
            if (!active || !window.Motion) return;
            const targets = active.querySelectorAll('[data-motion]');
            targets.forEach((t) => {
                Motion.reset(t);
                Motion.play(t);
            });
        }

        // 교차 전환(2번 슬라이드 패턴과 동일: 먼저 out → 그다음 in)
        // 이미지 컬럼도 함께 out/in 대상에 포함
        async function crossSwap4(to) {
            if (anim4 || to === step4) return;

            // 바깥 스와이퍼 잠금
            aboutSwiper.allowSlideNext = false;
            aboutSwiper.allowSlidePrev = false;
            aboutSwiper.mousewheel.disable();
            anim4 = true;

            const fromPanel = panels[step4 - 1];
            const toPanel = panels[to - 1];

            // 패널 내부의 "첫 번째 래퍼(.aboutpage_content4-*)"의 자식(= 컬럼들: 텍스트/이미지)
            const getCols = (panel) => {
                const wrap = panel.firstElementChild; // .aboutpage_content4-N
                return wrap ? Array.from(wrap.children) : [];
            };

            // 1) OUT (2번 슬라이드와 동일: 400ms / 20px 위로)
            const FROM_DUR = 400;
            const FROM_DIST = 20;

            // from: data-motion 타깃들
            const fromMotionTargets = Array.from(
                fromPanel.querySelectorAll('[data-motion]')
            );

            // from: data-motion이 없는 '컬럼'(= 이미지 컬럼 등)도 함께 out
            const fromColsNoMotion = getCols(fromPanel).filter(
                (col) => !col.querySelector('[data-motion]')
            );

            // 동시에 out
            await Promise.all([
                ...fromMotionTargets.map((n) =>
                    fadeOutUp(n, FROM_DUR, FROM_DIST)
                ),
                ...fromColsNoMotion.map((n) =>
                    fadeOutUp(n, FROM_DUR, FROM_DIST)
                ),
            ]);

            // 2) 가시성 토글
            fromPanel.classList.remove('is-visible');
            fromPanel.classList.add('is-hidden');

            toPanel.classList.remove('is-hidden');
            toPanel.classList.add('is-visible');

            // 3) IN
            //    - 텍스트(= data-motion 있는 요소)는 Motion으로 (2번 슬라이드와 동일)
            //    - 이미지 컬럼(= data-motion 없는 컬럼)은 fadeInUp으로 짧게 들어오게
            const toMotionTargets = Array.from(
                toPanel.querySelectorAll('[data-motion]')
            );
            const toColsNoMotion = getCols(toPanel).filter(
                (col) => !col.querySelector('[data-motion]')
            );

            // 이미지 컬럼 등 non-motion 컬럼 먼저 자연스럽게 등장
            await Promise.all(toColsNoMotion.map((n) => fadeInUp(n, 400, 20)));

            // 텍스트는 기존처럼 모션 엔진으로 (stagger/길이감 유지)
            if (window.Motion) {
                toMotionTargets.forEach((n) => Motion.reset(n));
                toMotionTargets.forEach((n) => Motion.play(n));
            }

            step4 = to;

            // 잠금 해제
            setTimeout(() => {
                aboutSwiper.allowSlideNext = true;
                aboutSwiper.allowSlidePrev = true;
                aboutSwiper.mousewheel.enable();
                anim4 = false;
            }, 50);
        }

        // 휠로 내부 단계 전환 (4번 슬라이드에 있을 때만)
        slide4.addEventListener(
            'wheel',
            (e) => {
                if (aboutSwiper.activeIndex !== 3) return; // 0:1번, 1:2번, 2:3번, 3:4번
                if (anim4) {
                    e.preventDefault();
                    return;
                }

                const dy = e.deltaY || 0;
                if (dy > 30) {
                    // 아래로
                    if (step4 < total) {
                        e.preventDefault();
                        crossSwap4(step4 + 1);
                    }
                    // step4 === 4 이면 밖으로(5번 슬라이드) 넘어가도록 둠
                } else if (dy < -30) {
                    // 위로
                    if (step4 > 1) {
                        e.preventDefault();
                        crossSwap4(step4 - 1);
                    }
                    // step4 === 1 이면 밖으로(3번 슬라이드) 올라가도록 둠
                }
            },
            { passive: false }
        );

        // 4번 슬라이드에 "들어올 때" 방향 따라 초기 단계 세팅
        aboutSwiper.on('slideChangeTransitionStart', () => {
            if (aboutSwiper.activeIndex === 3) {
                const comingDown =
                    aboutSwiper.previousIndex < aboutSwiper.activeIndex; // 3→4 내려옴?
                setStep4Instant(comingDown ? 1 : total); // 3→4면 1부터, 5→4면 4부터
            }
        });

        // 4번으로 들어온 직후 보이는 패널만 모션 재생
        aboutSwiper.on('slideChangeTransitionEnd', () => {
            if (aboutSwiper.activeIndex === 3) playVisibleMotion4();
        });
    }

    // ── 6번 슬라이드 내부 스크롤 보호 (휠 전파 방지) ──
    const scroller6 = document.querySelector(
        '.aboutpage_content6 .content6_scroller'
    );
    if (scroller6) {
        scroller6.addEventListener(
            'wheel',
            (e) => {
                // 6번 슬라이드가 활성일 때만 처리
                if (aboutSwiper.activeIndex !== 5) return; // 0-based 인덱스: 6번째 = 5
                const el = scroller6;
                const atTop = el.scrollTop <= 0;
                const atBottom =
                    el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

                // 내부 스크롤 여유가 있으면 스와이퍼로 전파 막기
                if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
                    e.stopPropagation();
                    // (passive:false 가 아니면 preventDefault는 생략)
                }
            },
            { passive: true }
        );
    }
});

// 공통: 슬라이드 세트 교체 함수
function setSlides(htmlArray) {
    productsSwiper.loopDestroy();
    productsSwiper.removeAllSlides();
    productsSwiper.appendSlide(htmlArray);
    productsSwiper.loopCreate();
    productsSwiper.update();
    productsSwiper.slideToLoop(0, 0);
}
