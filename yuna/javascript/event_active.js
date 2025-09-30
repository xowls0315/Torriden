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
