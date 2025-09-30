const brandwork__section = document.querySelector(".brandwork__section");

const data = [
  {
    src: "../img/brandwork2/brandwork_11.png",
    span: `토리든X뚝딱씨 콜라보 `,
    p: "Torriden X Prof. Ttuk collabo",
  },
  {
    src: "../img/brandwork2/brandwork_12.png",
    span: `셀메이징 비타앰플 빅슬립샵 콜라보 `,
    p: "Big sleep shop collabo",
  },
  {
    src: "../img/brandwork2/brandwork_13.png",
    span: `2023 올리브영 어워즈 `,
    p: " 2023 Olive young Awards - Torriden ",
  },
  {
    src: "../img/brandwork2/brandwork_14.png",
    span: `Always in me, POSITIVE VIBE With Torriden `,
    p: "나와 닿으며 찾아가는 긍정의 여정",
  },
  {
    src: "../img/brandwork2/brandwork_15.png",
    span: `Commentary Ep 01. NEW ‘DIVE IN FOR MEN’ `,
    p: "다이브인 포맨 런칭",
  },
];

data.forEach((v) => {
  // 1. article
  const article = document.createElement("article");
  article.classList.add("brandwork__contents");

  // 2. img
  const img = document.createElement("img");
  img.src = v.src;
  img.classList.add("brandwork__contents-image");

  // 3. span (innerHTML 사용 → <br> 적용)
  const span = document.createElement("span");
  span.classList.add("brandwork__contents-title");
  span.innerHTML = v.span;

  // 4. p
  const p = document.createElement("p");
  p.classList.add("brandwork__contents-sub");
  p.innerText = v.p;

  // 5. 조립
  article.appendChild(img);
  article.appendChild(span);
  article.appendChild(p);

  // 6. 최종 삽입
  brandwork__section.appendChild(article);
});
