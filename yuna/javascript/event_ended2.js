const event__section = document.querySelector(".event__section");

const data = [
  {
    src: "../img/event_end2/event_end2_1.jpg",
    span: `2025 상반기 결산! 전품목 할인`,
  },
  {
    src: "../img/event_end2/event_end2_2.jpg",
    span: `수분가득! 썸머케어💙<br> UP TO 46% SALE`,
  },
  {
    src: "../img/event_end2/event_end2_3.jpg",
    span: `선착순 500명! NEW 밸런스풀 시카 세럼 0원 체험`,
  },
  {
    src: "../img/event_end2/event_end2_4.jpg",
    span: `가정의 달 할인! UP TO 55% 할인`,
  },
  {
    src: "../img/event_end2/event_end2_5.jpg",
    span: `모공 딥 클렌징! NEW 다이브인 클렌징오일`,
  },
  {
    src: "../img/event_end2/event_end2_6.jpg",
    span: `다이브인 선크림 신상런칭`,
  },
  {
    src: "../img/event_end2/event_end2_7.jpg",
    span: `민감피부 집중 <br> 환절기 시카 케어`,
  },
  {
    src: "../img/event_end2/event_end2_8.jpg",
    span: `토리든 커넥트 성수 <토리도원> 💚OPEN💚`,
  },
  {
    src: "../img/event_end2/event_end2_9.jpg",
    span: `DIVE IN SPRING <br> UP TO 35% SALE`,
  },
  {
    src: "../img/event_end2/event_end2_10.jpg",
    span: `토리든 커넥트 성수 AMAZING CANDY BAR! ...`,
  },
];
data.forEach((v) => {
  // 1. article
  const article = document.createElement("article");
  article.classList.add("event__section-contents");

  // 2. img
  const img = document.createElement("img");
  img.src = v.src;
  img.classList.add("event__section-image");

  // 3. span (innerHTML 사용 → <br> 적용)
  const span = document.createElement("span");
  span.classList.add("event__section-title");
  span.innerHTML = v.span;

  // 4. 조립
  article.appendChild(img);
  article.appendChild(span);

  // 5. 최종 삽입
  event__section.appendChild(article);
});

// 버튼 클릭시 페이지 이동

//이벤트 진행 관련
const event__buttons_active = document.querySelector(".event__buttons-active");
const event__buttons_ended = document.querySelector(".event__buttons-ended");

event__buttons_active.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/event_active.html";
});
event__buttons_ended.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/event_ended.html";
});

//페이지 관련
const event__pageButton_first = document.querySelector(
  ".event__pageButton-first"
);
const event__pageButton_second = document.querySelector(
  ".event__pageButton-second"
);
const event__pageButton_third = document.querySelector(
  ".event__pageButton-third"
);

event__pageButton_first.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/event_ended.html";
});
event__pageButton_second.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/event_ended2.html";
});
event__pageButton_third.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/event_ended3.html";
});
// 버튼 클릭시 페이지 이동 (mobile)
const left = document.querySelector(".ri-arrow-left-s-line");
const right = document.querySelector(".ri-arrow-right-s-line");

left.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/event_ended.html";
});
right.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/event_ended3.html";
});
