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

  // 아이템 배포
  const makeItems = (items) => {
    items.forEach((v) => {
      const card = document.createElement("div");
      card.className = "shop_item_card";

      const hasSale = v.item_sale > 0;
      const priceAfter = hasSale
        ? Math.floor(v.item_price * (1 - v.item_sale / 100)).toLocaleString() +
          "원"
        : v.item_price.toLocaleString() + "원";

      card.innerHTML = `
      <div class="shop_item_img_wrap">
        <img src="${v.item_src}" />
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
  };

  makeItems(shopDataArr[0]);

  // 페이지 핸들러부분 더보기버튼, 리스트테이블

  let currentPage = 1;
  moreload.addEventListener("click", () => {
    currentPage++;
    if (currentPage > shopDataArr.length) {
      moreload.style.display = "none";
      return;
    }
    makeItems(shopDataArr[currentPage - 1]);
  });

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
