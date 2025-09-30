// document.addEventListener('click', (e) => {
//     const btn = e.target.closest('.mainpage_contents3_bests-like-btn');
//     if (!btn) return;
//     const icon = btn.querySelector('i');
//     const pressed = btn.getAttribute('aria-pressed') === 'true';
//     btn.setAttribute('aria-pressed', (!pressed).toString());
//     icon.classList.toggle('ri-heart-line', pressed); // 꺼짐 상태로 되돌릴 때
//     icon.classList.toggle('ri-heart-fill', !pressed); // 켜짐 상태
// });

const wrapper = document.querySelector('.products-swiper .swiper-wrapper');
// 초기(BEST) 슬라이드 HTML을 배열로 백업
const bestSlides = Array.from(wrapper.children).map((el) => el.outerHTML);

// 예시 2개만 적음 — 나머지도 같은 형식으로 6개 채워 주세요
const newSlides = [
    `
  <article class="swiper-slide">
    <div class="product-thumb">
      <img src="https://torridtr9977.cdn-nhncommerce.com/data/goods/25/09/37/299/299_main_081.jpg" alt="">
      <button class="mainpage_contents3_bests-like-btn" aria-pressed="false" aria-label="찜하기">
        <i class="ri-heart-line" aria-hidden="true"></i>
      </button>
    </div>
    <span>[가나디 콜라보] [1+1 기획세트] 다이브인 저분자 히알루론산수딩 크림 100ml+(파우치키링)</span>
    <div class="product-price">
      <p><strong>19,900원</strong></p>
      <i class="ri-shopping-bag-line"></i>
    </div>
  </article>
  `,
    `
  <article class="swiper-slide">
    <div class="product-thumb">
      <img src="https://torridtr9977.cdn-nhncommerce.com/data/goods/25/09/37/298/298_main_018.jpg" alt="">
      <button class="mainpage_contents3_bests-like-btn" aria-pressed="false" aria-label="찜하기">
        <i class="ri-heart-line" aria-hidden="true"></i>
      </button>
    </div>
    <span>[가나디 콜라보] [총 100ml] 다이브인 저분자 히알루론산 세럼 50ml (+리필50ml+인형키링)</span>
    <div class="product-price">
      <p><strong>22,900원</strong></p>
      <i class="ri-shopping-bag-line"></i>
    </div>
  </article>
  `,
    `
  <article class="swiper-slide">
    <div class="product-thumb">
      <img src="https://torridtr9977.cdn-nhncommerce.com/data/goods/25/09/37/298/298_main_018.jpg" alt="">
      <button class="mainpage_contents3_bests-like-btn" aria-pressed="false" aria-label="찜하기">
        <i class="ri-heart-line" aria-hidden="true"></i>
      </button>
    </div>
    <span>[가나디 콜라보] [총 100ml] 다이브인 저분자 히알루론산 세럼 50ml (+리필50ml+인형키링)</span>
    <div class="product-price">
      <p><strong>22,900원</strong></p>
      <i class="ri-shopping-bag-line"></i>
    </div>
  </article>
  `,
    `
  <article class="swiper-slide">
    <div class="product-thumb">
      <img src="https://torridtr9977.cdn-nhncommerce.com/data/goods/25/09/37/298/298_main_018.jpg" alt="">
      <button class="mainpage_contents3_bests-like-btn" aria-pressed="false" aria-label="찜하기">
        <i class="ri-heart-line" aria-hidden="true"></i>
      </button>
    </div>
    <span>[가나디 콜라보] [총 100ml] 다이브인 저분자 히알루론산 세럼 50ml (+리필50ml+인형키링)</span>
    <div class="product-price">
      <p><strong>22,900원</strong></p>
      <i class="ri-shopping-bag-line"></i>
    </div>
  </article>
  `,
    `
  <article class="swiper-slide">
    <div class="product-thumb">
      <img src="https://torridtr9977.cdn-nhncommerce.com/data/goods/25/09/37/298/298_main_018.jpg" alt="">
      <button class="mainpage_contents3_bests-like-btn" aria-pressed="false" aria-label="찜하기">
        <i class="ri-heart-line" aria-hidden="true"></i>
      </button>
    </div>
    <span>[가나디 콜라보] [총 100ml] 다이브인 저분자 히알루론산 세럼 50ml (+리필50ml+인형키링)</span>
    <div class="product-price">
      <p><strong>22,900원</strong></p>
      <i class="ri-shopping-bag-line"></i>
    </div>
  </article>
  `,
    `
  <article class="swiper-slide">
    <div class="product-thumb">
      <img src="https://torridtr9977.cdn-nhncommerce.com/data/goods/25/09/37/298/298_main_018.jpg" alt="">
      <button class="mainpage_contents3_bests-like-btn" aria-pressed="false" aria-label="찜하기">
        <i class="ri-heart-line" aria-hidden="true"></i>
      </button>
    </div>
    <span>[가나디 콜라보] [총 100ml] 다이브인 저분자 히알루론산 세럼 50ml (+리필50ml+인형키링)</span>
    <div class="product-price">
      <p><strong>22,900원</strong></p>
      <i class="ri-shopping-bag-line"></i>
    </div>
  </article>
  `,
    // ...총 6개
];

const btnBest = document.getElementById('btnBest');
const btnNew = document.getElementById('btnNew');

function setActive(btn) {
    [btnBest, btnNew].forEach((b) =>
        b.classList.toggle('is-active', b === btn)
    );
}

btnBest.addEventListener('click', () => {
    setSlides(bestSlides);
    setActive(btnBest);
});

btnNew.addEventListener('click', () => {
    setSlides(newSlides);
    setActive(btnNew);
});

document.querySelector('.products-swiper').addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.mainpage_contents3_bests-like-btn');
    if (!likeBtn) return;
    const pressed = likeBtn.getAttribute('aria-pressed') === 'true';
    likeBtn.setAttribute('aria-pressed', String(!pressed));
});
