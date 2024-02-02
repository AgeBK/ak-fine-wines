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
      console.log(
        id,
        name,
        brand,
        shortName,
        price,
        quantity,
        deal,
        discountCode
      );

      const { cart, twoForDeals, promotionCode } = state;
      let qty = cart[id] ? cart[id].qty + quantity : quantity;

      state.cart[id] = {
        name,
        brand,
        shortName,
        price,
        qty,
        deal,
        discountCode,
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
          state.cart = checkMultiBuys(state.cart, deal, false, 2);
        } else if (tenForDeal && state.tenForDeals > 9) {
          state.cart = checkMultiBuys(state.cart, deal, false, 10);
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
        state.cart[id].qty = qty - 1;
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
          state.cart = checkMultiBuys(state.cart, deal, true);
        }
      }
    },
    applyDiscountCode: (state, action) => {
      state.promotionCode = action.payload;
      checkDiscountCode(state.cart, state.promotionCode);
    },
  },
});

export const { increment, decrement, selectCount, applyDiscountCode } =
  cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
