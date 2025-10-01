let productsSwiper; // 공통으로 사용하기 위해 바깥에 선언

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

    productsSwiper = new Swiper('.products-swiper', {
        slidesPerView: 3, // 한 화면 3장
        slidesPerGroup: 1, // ← 한 칸씩 이동
        spaceBetween: 20,

        // 루프 관련
        loop: true,
        loopPreventsSliding: false, // ⬅️ 끝단에서 계속 드래그해도 막지 않음
        loopAdditionalSlides: 6, // ⬅️ 복제 슬라이드 여유 (슬라이드 적을 때 유용)
        watchSlidesProgress: true, // ⬅️ 루프+프로그레스바 안정화에 도움
        speed: 600,

        // 반응형
        breakpoints: {
            0: { slidesPerView: 1.2, slidesPerGroup: 1, spaceBetween: 12 },
            768: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16 },
            1024: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 20 },
        },

        navigation: {
            nextEl: '.products-next', // ⬅️ 래퍼 바깥의 버튼
            prevEl: '.products-prev',
        },
        pagination: {
            el: '.products-pagination', // ⬅️ 래퍼 바깥의 프로그레스바
            type: 'progressbar',
        },
    });
});

// 공통: 슬라이드 세트 교체 함수
function setSlides(htmlArray) {
    // 1) 루프 해제 (복제 슬라이드 제거)
    productsSwiper.loopDestroy();

    // 2) 기존 슬라이드 전부 제거
    productsSwiper.removeAllSlides();

    // 3) 새 슬라이드 추가
    productsSwiper.appendSlide(htmlArray);

    // 4) 루프 다시 생성 + 업데이트
    productsSwiper.loopCreate();
    productsSwiper.update();

    // 5) 첫 슬라이드로 점프(애니메이션 없이)
    productsSwiper.slideToLoop(0, 0);
}
