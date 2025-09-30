const event__section = document.querySelector(".event__section");

const data = [
  {
    src: "../img/event_end3/event_end3_1.jpg",
    span: `Happy Torriden month <br>UP TO 27% SALE...`,
  },
  {
    src: "../img/event_end3/event_end3_2.jpg",
    span: `미리 준비하는 설 선물<br> UP TO 47% SALE`,
  },
  {
    src: "../img/event_end3/event_end3_3.jpg",
    span: `2024 연말결산 세럼대전<br>UP TO 30% SALE `,
  },
  {
    src: "../img/event_end3/event_end3_4.jpg",
    span: `6월 신규회원 혜택`,
  },
  {
    src: "../img/event_end3/event_end3_5.jpg",
    span: `토리든 커넥트 성수 <br>플래그십스토어 OPEN!`,
  },
  {
    src: "../img/event_end3/event_end3_6.jpg",
    span: `인생선크림 준비했SUN <br>UP TO 40% SALE`,
  },
  {
    src: "../img/event_end3/event_end3_7.jpg",
    span: `감사의 달 기프트 기획전 <br>UP TO 40% SALE`,
  },
  {
    src: "../img/event_end3/event_end3_8.jpg",
    span: `봄볕 필수템 특가<br>UP TO 40% SALE`,
  },
  {
    src: "../img/event_end3/event_end3_9.jpg",
    span: `셀메이징 런칭 신상위크 <br> UP TO 40% SALE`,
  },
  {
    src: "../img/event_end3/event_end3_10.jpg",
    span: `설맞이 기프트 기획전 <br> UP TO 40% SALE`,
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
