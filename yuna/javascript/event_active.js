const event__section = document.querySelector(".event__section");

const data = [
  {
    src: "../img/event_active/event_active_1.jpg",
    span: `한가위 추석 선물 기획전🎁<br>UP TO 51%`,
  },
  {
    src: "../img/event_active/event_active_2.jpg",
    span: `끈적임 zero, 수분감 max<br> 다이브인 포맨~40% 할인...`,
  },
  {
    src: "../img/event_active/event_active_3.jpg",
    span: `토리든 카카오톡 플러스친구 혜택`,
  },
  {
    src: "../img/event_active/event_active_4.jpg",
    span: `토리든<br>신규회원 혜택`,
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
  location.href = "http://127.0.0.1:5500/yuna/pages/event_active.html";
});
