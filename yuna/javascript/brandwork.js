const brandwork__section = document.querySelector(".brandwork__section");

const data = [
  {
    src: "../img/brandwork/brandwork_first.png",
    span: `Commentary Ep 05. NEW CELLMAZING <br />Brightening Spot Toning Pad`,
    p: "셀메이징 비타패드 런칭",
  },
  {
    src: "../img/brandwork/brandwork_second.png",
    span: `2025 올리브영 페스타`,
    p: "2025 OlLIVE YOUNG FESTA - Torriden",
  },
  {
    src: "../img/brandwork/brandwork_third.png",
    span: `CONNECT TO POSITIVE CYCLE!`,
    p: "토리도원 기획세트",
  },
  {
    src: "../img/brandwork/brandwork_fourth.png",
    span: `토리든 커넥트 성수`,
    p: "Torriwave Club Open!",
  },
  {
    src: "../img/brandwork/brandwork_5.png",
    span: `Commentary Ep 04. NEW 'CELLMAZING PORE <br />PERFECTING AMPOULE`,
    p: "셀메이징 모공 탄력앰플 런칭",
  },
  {
    src: "../img/brandwork/brandwork_6.png",
    span: `토리든 커넥트 성수`,
    p: "가장 맑고 청아한 공간, 토리도원",
  },
  {
    src: "../img/brandwork/brandwork_7.png",
    span: `Commentary Ep 03. Don’t worry be Sunny`,
    p: "토리든 x 크리에이터 해쭈",
  },
  {
    src: "../img/brandwork/brandwork_8.png",
    span: `Commentary Ep 02. NEW ‘DIVE IN Cleansing Oil’`,
    p: "다이브인 클렌징 오일 런칭",
  },
  {
    src: "../img/brandwork/brandwork_9.png",
    span: `2024 HOLIDAY NIGHT – MINI CONCERT`,
    p: "토리든 x søye (소이에)",
  },
  {
    src: "../img/brandwork/brandwork_10.png",
    span: `토리든 커넥트 성수`,
    p: "Connect to Positive Cycle!",
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
// 버튼 클릭시 페이지 이동 (Web)
const brandwork__pageButton_first = document.querySelector(
  ".brandwork__pageButton-first"
);
const brandwork__pageButton_second = document.querySelector(
  ".brandwork__pageButton-second"
);

brandwork__pageButton_first.addEventListener("click", () => {
  a.href = "http://127.0.0.1:5500/yuna/pages/brandwork.html";
});

brandwork__pageButton_second.addEventListener("click", () => {
  a.href = "http://127.0.0.1:5500/yuna/pages/brandwork2.html";
});
// // 버튼 클릭시 페이지 이동 (mobile)
// const left = document.querySelector(".left");
// const right = document.querySelector(".ri-arrow-right-s-line");

// left.addEventListener("click", () => {
//   location.href = "/Torriden/yuna/pages/brandwork.html";
// });
// right.addEventListener("click", () => {
//   location.href = "/Torriden/yuna/pages/brandwork.html";
// });
