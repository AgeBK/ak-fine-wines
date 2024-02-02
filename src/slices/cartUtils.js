const checkDiscountCode = (cart, promotionCode) => {
  for (const cartItem in cart) {
    const item = cart[cartItem];
    const {
      price,
      discountCode,
      deal: { percentOff },
    } = item;

    if (discountCode) {
      if (discountCode.toLowerCase() === promotionCode.toLowerCase()) {
        item.dealPrice = ((price / 100) * (100 - percentOff)).toFixed(2);
      } else if (
        discountCode.toLowerCase() !== promotionCode.toLowerCase() &&
        item.dealPrice
      ) {
        delete item.dealPrice;
      }
    }
  }

  return cart;
};

const checkMultiBuys = (cart, deal, isRemove, items) => {
  console.log("checkMultiBuys");
  const dealType = Object.keys(deal)[0];
  const dealPrice = Object.values(deal)[0];

  for (const cartItem in cart) {
    const item = cart[cartItem];
    const currentDeal = item.deal;
    if (currentDeal) {
      const currentDealType = Object.keys(currentDeal)[0];
      const currentDealPrice = Object.values(currentDeal)[0];
      if (currentDealType === dealType && currentDealPrice === dealPrice) {
        isRemove ? delete item.dealPrice : (item.dealPrice = dealPrice / items);
      }
    }
  }
  return cart;
};

export { checkDiscountCode, checkMultiBuys };
