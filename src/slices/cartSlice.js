import { createSlice } from "@reduxjs/toolkit";
import { checkDiscountCode, checkMultiBuys } from "./cartUtils";

const initialState = {
  cart: {},
  twoForDeals: [],
  tenForDeals: 0,
  promotionCode: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action) => {
      const {
        id,
        name,
        brand,
        shortName,
        price,
        quantity,
        deal,
        discountCode,
      } = action.payload;

      const { cart, twoForDeals, promotionCode } = state;

      if (cart[id]) {
        state.cart[id].quantity += quantity;
      } else {
        state.cart[id] = {
          name,
          brand,
          shortName,
          price,
          quantity,
          deal,
          discountCode,
        };
      }

      // monitor products in multibuy deals
      if (deal && quantity) {
        if (deal.twoFor || deal.tenFor) {
          const twoForDeal = deal.twoFor;
          const tenForDeal = deal.tenFor;

          for (let i = 0; i < quantity; i++) {
            if (twoForDeal) twoForDeals.push(Number(twoForDeal));
            if (tenForDeal) state.tenForDeals += 1;
          }

          if (
            twoForDeal &&
            twoForDeals.filter((val) => val === twoForDeal).length > 1
          ) {
            state.cart = checkMultiBuys(state.cart, deal, false, 2);
          } else if (tenForDeal && state.tenForDeals > 9) {
            state.cart = checkMultiBuys(state.cart, deal, false, 10);
          }
        }
      }

      if (promotionCode) {
        checkDiscountCode(state.cart, state.promotionCode);
      }
    },
    decrement: (state, action) => {
      const { id, all } = action.payload;
      const { twoForDeals } = state;
      const item = state.cart[id];
      const { quantity, deal } = item;

      if (all || quantity === 1) {
        delete state.cart[id];
      } else {
        state.cart[id].quantity = quantity - 1;
      }

      //  check if existing products in cart still qualify for any multibuys
      if (deal) {
        const { twoFor, tenFor } = deal;
        if (twoFor || tenFor) {
          const qty = all ? quantity : 1;
          if (twoFor) {
            for (let i = 0; i < qty; i++) {
              const ind = twoForDeals.indexOf(twoFor);
              twoForDeals.splice(ind, 1);
            }
          } else {
            state.tenForDeals -= quantity;
          }
          if (
            (twoFor &&
              twoForDeals.filter((val) => val === twoFor).length < 2) ||
            (tenFor && state.tenForDeals < 10)
          ) {
            state.cart = checkMultiBuys(state.cart, deal, true, 0);
          }
        }
      }
    },
    applyDiscountCode: (state, action) => {
      state.promotionCode = action.payload;
      checkDiscountCode(state.cart, state.promotionCode);
    },
  },
});

export const { increment, decrement, applyDiscountCode } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
