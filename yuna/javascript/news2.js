const news__table_tbody = document.querySelector(".news__table_tbody");

const data = [
  {
    num: 17,
    title: "12월 크리스마스 CS & 배송 휴무 공지",
    date: "2024.12.23",
    writer: "관리자",
    view: 471,
  },
  {
    num: 16,
    title: "폭설로 인한 배송 지연 안내",
    date: "2024.11.28",
    writer: "관리자",
    view: 606,
  },
  {
    num: 15,
    title: "토리든 휴먼 계정 관리 방식 변경 안내",
    date: "2024.10.21",
    writer: "관리자",
    view: 3189,
  },
  {
    num: 14,
    title: "토리든 마일리지 소멸제도 변경 안내",
    date: "2024.07.18",
    writer: "관리자",
    view: 288,
  },
  {
    num: 13,
    title: "토리든 개인회원 정보 이관 안내",
    date: "2024.07.18",
    writer: "관리자",
    view: 184,
  },
  {
    num: 12,
    title: "토리든 멤버쉽 등급 혜택 변경 안내",
    date: "2024.07.18",
    writer: "관리자",
    view: 262,
  },
  {
    num: 11,
    title: "[당첨자 발표] 토리든X올리브영 셀메이징 브라이트닝 앰..",
    date: "2024.03.06",
    writer: "관리자",
    view: 252,
  },
  {
    num: 10,
    title: "[당첨자 발표] 토리든 밸러스풀 크림 구매 인증 이벤트",
    date: "2023.02.17",
    writer: "관리자",
    view: 548,
  },
  {
    num: 9,
    title: "토리든 신규 로고 및 패키지 변경 안내",
    date: "2022.07.08",
    writer: "관리자",
    view: 1310,
  },
  {
    num: 8,
    title: "토리든 멤버쉽 등급 혜택 변경 안내 (2022/07/1..",
    date: "2022.07.01",
    writer: "관리자",
    view: 543,
  },
];

data.forEach((v) => {
  // 1. tr
  const tr = document.createElement("tr");
  tr.classList.add("news__table_row");

  // 2. num
  const news__table_num = document.createElement("td");
  news__table_num.innerText = v.num;
  news__table_num.classList.add("news__table_num");

  // 3. title
  const news__table_title = document.createElement("td");
  news__table_title.innerText = v.title;
  news__table_title.classList.add("news__table_title");

  // 4. date
  const news__table_date = document.createElement("td");
  news__table_date.innerText = v.date;
  news__table_date.classList.add("news__table_date");

  // 5. writer
  const news__table_writer = document.createElement("td");
  news__table_writer.innerText = v.writer;
  news__table_writer.classList.add("news__table_writer");

  // 6. view
  const news__table_view = document.createElement("td");
  news__table_view.innerText = v.view;
  news__table_view.classList.add("news__table_view");

  // 최종 삽입
  tr.appendChild(news__table_num);
  tr.appendChild(news__table_title);
  tr.appendChild(news__table_date);
  tr.appendChild(news__table_writer);
  tr.appendChild(news__table_view);

  // tbody에 추가
  news__table_tbody.appendChild(tr);
});

/*모바일 버전*/
const news__mobile_section = document.querySelector(".news__mobile_section");

data.forEach((v) => {
  // 1. article
  const article = document.createElement("article");
  article.classList.add("news__mobile_contens");

  // 2. H3
  const news__mobile_contents_title = document.createElement("h3");
  news__mobile_contents_title.innerText = v.title;
  news__mobile_contents_title.classList.add("news__mobile_contents_title");

  // 3. news__mobile_contents_w_date
  const news__mobile_contents_w_date = document.createElement("div");
  news__mobile_contents_w_date.classList.add("news__mobile_contents_w_date");

  // 4. news__mobile_contents_writer
  const news__mobile_contents_writer = document.createElement("p");
  news__mobile_contents_writer.innerText = v.writer;
  news__mobile_contents_writer.classList.add("news__mobile_contents_writer");

  // 5.news__mobile_contents_date
  const news__mobile_contents_date = document.createElement("p");
  news__mobile_contents_date.innerText = v.date;
  news__mobile_contents_date.classList.add("news__mobile_contents_date");

  // 6. news__mobile_contents_r_view
  const news__mobile_contents_r_view = document.createElement("div");
  news__mobile_contents_r_view.classList.add("news__mobile_contents_r_view");

  // 7. news__mobile_contents_recommend
  const news__mobile_contents_recommend = document.createElement("p");
  news__mobile_contents_recommend.innerText = "추천수 : 0";
  news__mobile_contents_recommend.classList.add(
    "news__mobile_contents_recommend"
  );

  // 8.news__mobile_contents_view
  const news__mobile_contents_view = document.createElement("p");
  news__mobile_contents_view.innerText = "조회수 : " + v.view;
  news__mobile_contents_view.classList.add("news__mobile_contents_view");

  // 최종 삽입
  news__mobile_section.appendChild(article);
  article.appendChild(news__mobile_contents_title);
  article.appendChild(news__mobile_contents_w_date);
  news__mobile_contents_w_date.appendChild(news__mobile_contents_writer);
  news__mobile_contents_w_date.appendChild(news__mobile_contents_date);
  article.appendChild(news__mobile_contents_r_view);
  news__mobile_contents_r_view.appendChild(news__mobile_contents_recommend);
  news__mobile_contents_r_view.appendChild(news__mobile_contents_view);
});

// 버튼 클릭시 페이지 이동
const news__pageButton_first = document.querySelector(
  ".news__pageButton-first"
);
const news__pageButton_second = document.querySelector(
  ".news__pageButton-second"
);
const news__pageButton_third = document.querySelector(
  ".news__pageButton-third"
);

news__pageButton_first.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/news.html";
});

news__pageButton_second.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/news2.html";
});

news__pageButton_third.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/news3.html";
});
// 버튼 클릭시 페이지 이동 (mobile)
const left = document.querySelector(".left");
const right = document.querySelector(".right");

left.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/news.html";
});
right.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/yuna/pages/news3.html";
});
