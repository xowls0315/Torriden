const event__section = document.querySelector(".event__section");

const data = [
  {
    src: "../img/event_end/event_end_1.jpg",
    span: `9월 신규회원 특가`,
  },
  {
    src: "../img/event_end/event_end_2.jpg",
    span: `여름 흔적 말끔하게 삭제💛<br>애프터 썸머케어`,
  },
  {
    src: "../img/event_end/event_end_3.jpg",
    span: `토리든 SALE FESTA<br>UP TO 58%`,
  },
  {
    src: "../img/event_end/event_end_4.jpg",
    span: `365일 컨보속촉 선케어! <br>토리튼 선크림 1+1`,
  },
  {
    src: "../img/event_end/event_end_5.jpg",
    span: `여름피부 고민 bye~🖐️<br> 모공 깨끗, 진정 쏙쏙!`,
  },
  {
    src: "../img/event_end/event_end_6.jpg",
    span: `흔적고민 종결!<br>NEW 비타 흔적 토닝 패드 본품 체험단 OPEN...`,
  },
  {
    src: "../img/event_end/event_end_7.jpg",
    span: `HOT 썸머위크🌊 <br> 최대 46% 할인!`,
  },
  {
    src: "../img/event_end/event_end_8.jpg",
    span: `7월 신규회원 혜택`,
  },
  {
    src: "../img/event_end/event_end_9.jpg",
    span: `토리든 커넥트 성수 <𝗧𝗼𝗿𝗿𝗶𝘄𝗮𝘃𝗲 𝗖𝗹𝘂𝗯> OPEN🏄‍♂️`,
  },
  {
    src: "../img/event_end/event_end_10.jpg",
    span: `NEW⭐흔적 밀착 토닝 케어! 셀메이징 비타 흔적 패드...`,
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
  location.href = "http://127.0.0.1:5500/yuna/pages/event_ended2.html";
});
