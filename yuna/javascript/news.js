const news_data1 = [
  {
    num: 27,
    title: "10월 추석연휴 CS & 배송 휴무 공지",
    date: "2025.09.29",
    writer: "관리자",
    view: 53,
  },
  {
    num: 26,
    title: "8월 광복절 CS & 배송 휴무 공지",
    date: "2025.08.12",
    writer: "관리자",
    view: 485,
  },
  {
    num: 25,
    title: "6월 공휴일 CS & 배송 휴무 공지",
    date: "2025.05.29",
    writer: "관리자",
    view: 1113,
  },
  {
    num: 24,
    title: "5월 근로자의 날 CS & 배송 휴무 공지",
    date: "2025.04.28",
    writer: "관리자",
    view: 665,
  },
  {
    num: 23,
    title: "경북지역 산불 화재로 인한 배송 지연 공지",
    date: "2025.03.27",
    writer: "관리자",
    view: 1232,
  },
  {
    num: 22,
    title: "토리든 가품 피해 방지",
    date: "2025.03.07",
    writer: "관리자",
    view: 1753,
  },
  {
    num: 21,
    title: "3월 대체공휴일 CS & 배송 휴무 공지",
    date: "2025.02.27",
    writer: "관리자",
    view: 338,
  },
  {
    num: 20,
    title: "1월 설 연휴 CS & 배송 휴무 공지",
    date: "2025.01.22",
    writer: "관리자",
    view: 1258,
  },
  {
    num: 19,
    title: "토리든 공신 판매처 안내 공지",
    date: "2025.01.06",
    writer: "관리자",
    view: 1485,
  },
  {
    num: 18,
    title: "1월 신정 CS & 배송 휴무 공지",
    date: "2024.12.23",
    writer: "관리자",
    view: 436,
  },
];
/*웹버전*/
const news__table_tbody = document.querySelector(".news__table_tbody");

news_data1.forEach((v) => {
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

news_data1.forEach((v) => {
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
