import { shopData1 } from "../javascript/data.js";
import { shopData2 } from "../javascript/data.js";
import { shopData3 } from "../javascript/data.js";
import { shopData4 } from "../javascript/data.js";
import { shopData5 } from "../javascript/data.js";
import { shopData6 } from "../javascript/data.js";
import { shopData7 } from "../javascript/data.js";
import { shopData8 } from "../javascript/data.js";
import { shopData9 } from "../javascript/data.js";

document.addEventListener("DOMContentLoaded", () => {
  const shopItemWrap = document.getElementById("shop_item_wrap");

  shopData1.forEach((item) => {
    const card = document.createElement("div");
    card.className = "shop_item_card";

    const hasSale = item.item_sale > 0;
    const priceAfter = hasSale
      ? Math.floor(
          item.item_price * (1 - item.item_sale / 100)
        ).toLocaleString() + "원"
      : item.item_price.toLocaleString() + "원";

    card.innerHTML = `
      <div class="shop_item_img_wrap">
        <img src="${item.item_src}"/>
        <a class="shop_heart_btn">
          <img src="../ys_img/icon_heartbtn.svg" alt="" />
        </a>
      </div>
      <div class="shop_item_info_wrap">
        <div class="shop_item_name">${item.item_name}</div>
        <div class="shop_item_price_wrap">
          ${
            hasSale
              ? `<div class="shop_item_price_sale">${item.item_sale}%</div>`
              : ""
          }
          <div class="shop_item_price_after">${priceAfter}</div>
          ${
            hasSale
              ? `<div class="shop_item_price_before">${item.item_price.toLocaleString()}원</div>`
              : ""
          }
        </div>
      </div>
      <div class="shop_item_cart_wrap">
        <span>장바구니 담기</span>
        <img src="../ys_img/icon_cart.svg" alt="장바구니" />
      </div>
    `;
    // 마우스 오버 이미지 블러
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
});
