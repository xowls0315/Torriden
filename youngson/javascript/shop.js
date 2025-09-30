// item_src: "",
// item_name: "",
// item_sale: "",
// item_price: "",

const shopData = [
  {
    item_src: "../ys_img/product1.jpg",
    item_name:
      "[3종세트] 다이브인 저분자 히알루론산 세럼 50ml + 토너 300ml + 크림80ml+(쇼핑백 증정)",
    item_sale: 42,
    item_price: 64000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/25/09/38/304/304_main_062.jpg",
    item_name: "[라인콜라보] 다이브인 저분자 히알루론산 마스크 27ml 10매",
    item_sale: 50,
    item_price: 30000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/25/08/32/291/176_magnify_054.jpg",
    item_name:
      "[회원전용특가] [2개묶음 기획세트] 다이브인 워터리 모이스처 선크림 60ml 1+1",
    item_sale: 40,
    item_price: 25000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/23/09/39/185/185_magnify_098.jpg",
    item_name: "셀메이징 저분자 콜라겐 탄력 겔 마스크 1매",
    item_sale: 25,
    item_price: 7500,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/25/04/14/245/245_magnify_054.jpg",
    item_name: "[2개묶음] 밸런스풀 시카 마스크 25ml 20매 (10매 x2개)",
    item_sale: 51,
    item_price: 60000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/25/07/31/272/272_add3_050.jpg",
    item_name: "[2개묶음] 다이브인 저분자 히알루론산 클렌징 오일 200ml",
    item_sale: 18,
    item_price: 44000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/25/04/17/253/253_main_034.jpg",
    item_name: "다이브인 저분자 히알루론산 클렌징 오일 200ml",
    item_sale: 18,
    item_price: 22000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/25/08/31/283/283_magnify_091.jpg",
    item_name: "[2개묶음] 밸런스풀 시카 진정 크림 80ml",
    item_sale: 42,
    item_price: 48000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/22/12/51/162/162_magnify_019.jpg",
    item_name: "밸런스풀 시카 진정 크림 80ml",
    item_sale: 30,
    item_price: 24000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/24/12/50/232/232_main_067.jpg",
    item_name: "[2개묶음] 다이브인 저분자 히알루론산 스킨부스터 200ml+200ml",
    item_sale: 19,
    item_price: 36000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/19/09/04/68/68_main_024.jpg",
    item_name:
      "[2종세트] 다이브인 저분자 히알루론산 크림 80ml+스킨부스터 200ml",
    item_sale: 20,
    item_price: 39000,
  },
  {
    item_src:
      "https://torridtr9977.cdn-nhncommerce.com/data/goods/24/10/41/230/230_magnify_0100.jpg",
    item_name: "밸런스풀 시카 각질 토너 250ml",
    item_sale: 0,
    item_price: 24000,
  },
];
document.addEventListener("DOMContentLoaded", () => {
  const shopItemWrap = document.getElementById("shop_item_wrap");

  shopData.forEach((item) => {
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
        <img src="${item.item_src}" alt="${item.item_name}" />
        <a class="shop_heart_btn">
          <img src="../ys_img/icon_heartbtn.svg" alt="좋아요" />
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

    shopItemWrap.appendChild(card);
  });
});

// 마우스 오버 이미지 블러
const shopImages = document.querySelectorAll(".shop_item_img_wrap img");

shopImages.forEach((img) => {
  img.addEventListener("mouseover", () => {
    img.style.transition = "filter 0.15s ease"; // 블러 생기는 시간
    img.style.filter = "blur(2px)";

    // 0.3초 후 블러 제거
    setTimeout(() => {
      img.style.transition = "filter 0.15s ease"; // 선명해지는 시간
      img.style.filter = "blur(0)";
    }, 300); // 블러 유지 시간
  });
});
