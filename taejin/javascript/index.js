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
      <img src="https://torridtr9977.cdn-nhncommerce.com/data/goods/25/08/34/294/246_main_086.jpg" alt="">
      <button class="mainpage_contents3_bests-like-btn" aria-pressed="false" aria-label="찜하기">
        <i class="ri-heart-line" aria-hidden="true"></i>
      </button>
    </div>
    <span>[회원전용특가] [기획세트] 솔리드인 세라마이드 립 에센스 듀오세트</span>
    <div class="product-price">
    <p>
      <strong style="color: #475861">47%</strong>
      <strong>회원특가 9,900원</strong>
      <span
        style="
          font-size: 12px;
          color: gainsboro;
          text-decoration: line-through;
          "
      >19,000원</span>
    </p>
      <i class="ri-shopping-bag-line"></i>
    </div>
  </article>
  `,
    `
  <article class="swiper-slide">
    <div class="product-thumb">
      <img src="https://torridtr9977.cdn-nhncommerce.com/data/goods/25/08/31/285/285_main_094.jpg" alt="">
      <button class="mainpage_contents3_bests-like-btn" aria-pressed="false" aria-label="찜하기">
        <i class="ri-heart-line" aria-hidden="true"></i>
      </button>
    </div>
    <span>[3종세트] 다이브인 포맨 저분자 히알루론산 올인원 200g+다이브인 포맨 스킨 300ml+다이브인 포맨 젤 로션 200ml+(포맨 젤로션 2ml*10매)</span>
    <div class="product-price">
    <p>
    <strong style="color: #475861">40%</strong>
    <strong>39,900원</strong>
    <span
      style="
        font-size: 12px;
        color: gainsboro;
        text-decoration: line-through;
        "
    >67,000원</span>
    </p>
      <i class="ri-shopping-bag-line"></i>
    </div>
  </article>
  `,
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
