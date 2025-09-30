document.addEventListener('DOMContentLoaded', () => {
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

    const productsSwiper = new Swiper('.products-swiper', {
        slidesPerView: 3, // 한 화면 3장
        slidesPerGroup: 1, // ← 한 칸씩 이동
        spaceBetween: 20,
        loop: true,
        speed: 600,

        // 반응형
        breakpoints: {
            0: { slidesPerView: 1.2, slidesPerGroup: 1, spaceBetween: 12 },
            768: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16 },
            1024: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 20 },
        },

        // 루프 시 자연스러운 복제 슬라이드 수(슬라이드가 적을 때 대비)
        loopAdditionalSlides: 6,

        navigation: {
            nextEl: '.products-swiper .swiper-button-next',
            prevEl: '.products-swiper .swiper-button-prev',
        },
        pagination: {
            el: '.products-swiper .swiper-pagination',
            type: 'progressbar',
        },

        // 스와이프/드래그 포인터
        grabCursor: true,
    });
});
