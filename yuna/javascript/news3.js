const news__table_tbody = document.querySelector(".news__table_tbody");

const news_data3 = [
  {
    num: 7,
    title: "토리든 공식 홈페이지 리뉴얼 안내",
    date: "2022.05.25",
    writer: "관리자",
    view: 386,
  },
  {
    num: 6,
    title: "[당첨자 발표] 토리든X문화재지킴이 페이백 리뷰 이벤트",
    date: "2021.08.04",
    writer: "관리자",
    view: 201,
  },
  {
    num: 5,
    title: "택배노조 총파업으로 인한 택배 배송 지연 안내 (6월2...",
    date: "2021.06.11",
    writer: "관리자",
    view: 713,
  },
  {
    num: 4,
    title: "토리든 멤버십 등급 혜택 변경 안내 (2021/06/0...",
    date: "2021.05.17",
    writer: "관리자",
    view: 833,
  },
  {
    num: 3,
    title: "토리든 택배사 이전 안내",
    date: "2020.11.10",
    writer: "관리자",
    view: 507,
  },
  {
    num: 2,
    title: "✶ 토리든 공식 홈페이지 리뉴얼 안내 ✶",
    date: "2020.10.21",
    writer: "관리자",
    view: 573,
  },
  {
    num: 1,
    title: "다이브인 라인 패키지 리뉴얼 안내",
    date: "2020.10.20",
    writer: "관리자",
    view: 3764,
  },
];

news_data3.forEach((v) => {
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

news_data3.forEach((v) => {
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
