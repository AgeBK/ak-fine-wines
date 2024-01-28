import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
// import { fetchCart } from "./cartAPI"; ??

const initialState = {
  cart: {},
  twoForDeals: [],
  tenForDeals: 0,
  promotionCode: "",
};

const checkDiscountCode = (cart, promotionCode) => {
  for (const cartItem in cart) {
    const item = cart[cartItem];
    const {
      price,
      discountCode,
      deal: { percentOff },
    } = item;

    if (
      discountCode &&
      discountCode.toLowerCase() === promotionCode.toLowerCase()
    ) {
      item.dealPrice = ((price / 100) * (100 - percentOff)).toFixed(2);
    } else if (
      discountCode &&
      discountCode.toLowerCase() !== promotionCode.toLowerCase() &&
      item.dealPrice
    ) {
      delete item.dealPrice;
    }
  }

  return cart;
};

const applyMultiBuy = (cart, deal, items) => {
  const dealType = Object.keys(deal)[0];
  const dealPrice = Object.values(deal)[0];

  for (const cartItem in cart) {
    const item = cart[cartItem];
    const currentDeal = item.deal;
    if (currentDeal) {
      const currentDealType = Object.keys(currentDeal)[0];
      const currentDealPrice = Object.values(currentDeal)[0];
      if (currentDealType === dealType && currentDealPrice === dealPrice) {
        item.dealPrice = dealPrice / items;
      }
    }
  }
  return cart;
};

const checkRemoveDeal = (cart, deal) => {
  const dealType = Object.keys(deal)[0];
  const dealPrice = Object.values(deal)[0];

  for (const cartItem in cart) {
    const item = cart[cartItem];
    const currentDeal = item.deal;
    if (currentDeal) {
      const currentDealType = Object.keys(currentDeal)[0];
      const currentDealPrice = Object.values(currentDeal)[0];
      if (currentDealType === dealType && currentDealPrice === dealPrice) {
        delete item.dealPrice;
      }
    }
  }
  return cart;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state, action) => {
      console.log("incremement");
      const {
        payload: {
          id,
          name,
          brand,
          shortName,
          price,
          quantity,
          deal,
          discountCode,
        }, // TODO: name is reserved??
      } = action;
      console.log(id, name, brand, shortName, price, quantity, deal, discountCode);

      const { cart, twoForDeals, tenForDeals, promotionCode } = state;
      let qty = cart[id] ? cart[id].qty + quantity : quantity;
      console.log("qty " + qty);
      console.log("tenForDeals: " + tenForDeals);

      state.cart = {
        ...state.cart,
        [id]: { name, brand, shortName, price, qty, deal, discountCode },
      };

      // keep track of products in multibuy deals
      if (deal.twoFor || deal.tenFor) {
        const twoForDeal = deal.twoFor;
        const tenForDeal = deal.tenFor;

        for (let i = 0; i < quantity; i++) {
          if (twoForDeal) twoForDeals.push(twoForDeal);
          if (tenForDeal) state.tenForDeals += 1;
        }

        if (
          twoForDeal &&
          twoForDeals.filter((val) => val === twoForDeal).length > 1
        ) {
          state.cart = applyMultiBuy(state.cart, deal, 2);
        } else if (tenForDeal && state.tenForDeals > 9) {
          state.cart = applyMultiBuy(state.cart, deal, 10);
        }
      }

      if (promotionCode) {
        checkDiscountCode(state.cart, state.promotionCode);
      }

      console.log(state.cart);
    },
    decrement: (state, action) => {
      const { id, all } = action.payload;
      const { twoForDeals } = state;
      const item = state.cart[id];
      const {
        qty,
        deal,
        deal: { twoFor, tenFor },
      } = item;

      if (all || qty === 1) {
        delete state.cart[id];
      } else {
        state.cart = { ...state.cart, [id]: { ...item, qty: qty - 1 } };
      }

      //  check if existing products in cart still qualify for any multibuys
      if (twoFor || tenFor) {
        const quantity = all ? qty : 1;
        if (twoFor) {
          for (let i = 0; i < quantity; i++) {
            const ind = twoForDeals.indexOf(twoFor);
            twoForDeals.splice(ind, 1);
          }
        } else {
          state.tenForDeals -= quantity;
        }
        if (
          (twoFor && twoForDeals.filter((val) => val === twoFor).length < 2) ||
          (tenFor && state.tenForDeals < 10)
        ) {
          state.cart = checkRemoveDeal(state.cart, deal);
        }
      }
    },
    applyDiscountCode: (state, action) => {
      state.promotionCode = action.payload;
      checkDiscountCode(state.cart, state.promotionCode);
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  selectCount,
  applyDiscountCode,
  toggleCart,
} = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.cart.value)`
export const selectCart = (state) => state.cart.cart;
export const getPromotionCode = (state) => state.cart.promotionCode; // TODO: why .cart?

// export const applyDiscounts = (discountCode) => {
//   console.log(discountCode);
//   const cart = selectCart();
//   checkDiscountCode(cart, discountCode);
// };

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCart(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default cartSlice.reducer;

// const checkRemoveDeal = (cart, deal) => {
//   const dealType = Object.keys(deal)[0];
//   const dealPrice = Object.values(deal)[0];
//   for (const cartItem in cart) {
//     const currentItem = cart[cartItem];
//     const currentDeal = currentItem.deal;
//     if (currentDeal[dealType] === dealPrice) {
//       delete currentItem.dealPrice;
//     }
//   }
//   return cart;
// };
