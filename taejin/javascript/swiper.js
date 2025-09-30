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
});
