import {
  shopData1,
  shopData2,
  shopData3,
  shopData4,
  shopData5,
  shopData6,
  shopData7,
  shopData8,
  shopData9,
} from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const shopItemWrap = document.getElementById("shop_item_wrap");
  const moreload = document.querySelector(".shop_page_moreload");

  // 데이터 배열을 번호 순서대로 묶기
  const shopDataArr = [
    shopData1,
    shopData2,
    shopData3,
    shopData4,
    shopData5,
    shopData6,
    shopData7,
    shopData8,
    shopData9,
  ];

  let currentPage = 1; // 현재 불러온 페이지(1부터 시작)

  // 아이템 렌더링 함수
  function renderItems(data) {
    data.forEach((v) => {
      const card = document.createElement("div");
      card.className = "shop_item_card";

      const hasSale = v.item_sale > 0;
      const priceAfter = hasSale
        ? Math.floor(v.item_price * (1 - v.item_sale / 100)).toLocaleString() +
          "원"
        : v.item_price.toLocaleString() + "원";

      card.innerHTML = `
        <div class="shop_item_img_wrap">
          <img src="${v.item_src}"/>
          <a class="shop_heart_btn">
            <img src="../ys_img/icon_heartbtn.svg" alt="" />
          </a>
        </div>
        <div class="shop_item_info_wrap">
          <div class="shop_item_name">${v.item_name}</div>
          <div class="shop_item_price_wrap">
            ${
              hasSale
                ? `<div class="shop_item_price_sale">${v.item_sale}%</div>`
                : ""
            }
            <div class="shop_item_price_after">${priceAfter}</div>
            ${
              hasSale
                ? `<div class="shop_item_price_before">${v.item_price.toLocaleString()}원</div>`
                : ""
            }
          </div>
        </div>
        <div class="shop_item_cart_wrap">
          <span>장바구니 담기</span>
          <img src="../ys_img/icon_cart.svg" alt="" />
        </div>
      `;

      // 이미지 마우스오버 효과
      const img = card.querySelector(".shop_item_img_wrap img");
      img.addEventListener("mouseover", () => {
        img.style.transition = "filter 0.1s ease";
        img.style.filter = "blur(1px)";
        setTimeout(() => {
          img.style.filter = "blur(0)";
        }, 200);
      });

      shopItemWrap.appendChild(card);
    });
  }

  // 초기 1페이지 아이템 렌더링
  renderItems(shopDataArr[0]);

  // 더보기 버튼 클릭 시
  moreload.addEventListener("click", () => {
    currentPage++;
    if (currentPage > shopDataArr.length) {
      // 더 이상 불러올 페이지가 없으면 버튼 숨기기
      moreload.style.display = "none";
      return;
    }
    renderItems(shopDataArr[currentPage - 1]);
  });

  // 페이지네이션 버튼 클릭 이벤트 (기존 코드)
  document.querySelectorAll(".shop_pagehandler li").forEach((v) => {
    v.onclick = () => {
      document
        .querySelector(".shop_page_selected")
        ?.classList.remove("shop_page_selected");
      v.classList.add("shop_page_selected");

      const pageNum = v.innerText;
      location.href = `shop${pageNum}.html`;
    };
  });
});
