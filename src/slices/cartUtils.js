const checkDiscountCode = (cart, promotionCode) => {
  Object.values(cart).forEach((cartItem) => {
    const { price, discountCode, deal } = cartItem;
    if (discountCode && deal) {
      const { percentOff } = deal;
      if (
        percentOff &&
        discountCode.toLowerCase() === promotionCode.toLowerCase()
      ) {
        cartItem.dealPrice = Number(
          ((price / 100) * (100 - percentOff)).toFixed(2)
        );
      } else if (
        discountCode.toLowerCase() !== promotionCode.toLowerCase() &&
        cartItem.dealPrice
      ) {
        delete cartItem.dealPrice;
      }
    }
  });

  return cart;
};

const checkMultiBuys = (cart, deal, isRemove, items) => {
  const dealType = Object.keys(deal)[0];
  const dealPrice = Object.values(deal)[0];

  Object.values(cart).forEach((cartItem) => {
    const { deal } = cartItem;
    if (deal) {
      const currentDealType = Object.keys(deal)[0];
      const currentDealPrice = Object.values(deal)[0];
      if (currentDealType === dealType && currentDealPrice === dealPrice) {
        if (isRemove) {
          delete cartItem.dealPrice;
        } else {
          cartItem.dealPrice = dealPrice / items;
        }
      }
    }
  });
  return cart;
};

export { checkDiscountCode, checkMultiBuys };
