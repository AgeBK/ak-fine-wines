import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
// import { fetchCart } from "./cartAPI"; ??

const initialState = { cart: {}, twoForDeals: [], tenForDeals: [] };

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// export const incrementAsync = createAsyncThunk(
//   "cart/fetchCart",
//   async (amount) => {
//     const response = await fetchCart(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

// TODO: error handling/JSONBin

const checkDiscountCode = (cart, codeUserEntered) => {
  for (const cartItem in cart) {
    const item = cart[cartItem];
    const {
      price,
      deal,
      discountCode,
      deal: { percentOff },
    } = item;

    if (
      deal &&
      percentOff &&
      discountCode.toLowerCase() === codeUserEntered.toLowerCase()
    ) {
      item.dealPrice = ((price / 100) * (100 - percentOff)).toFixed(2);
    }
  }
  return cart;
};

const checkApplyDeal = (cart, deal, dealPrice, dealAmount) => {
  for (const cartItem in cart) {
    const item = cart[cartItem];
    const currentDeal = item.deal;
    if (currentDeal[deal] && currentDeal[deal] === dealPrice) {
      item.dealPrice = dealPrice / dealAmount;
      console.log(item);
    }
  }
  return cart;
};

// const checkTwoForDeals = (cart, deal) => {
//   for (const cartItem in cart) {
//     const item = cart[cartItem];
//     if (item.deal && item.deal.twoFor && item.deal.twoFor === deal) {
//       item.dealPrice = deal / 2;
//       console.log(item);
//     }
//   }
//   return cart;
// };

const checkRemoveDeal = (cart, deal, dealPrice) => {
  for (const cartItem in cart) {
    const currentItem = cart[cartItem];
    const currentDeal = currentItem.deal;
    if (currentDeal[deal] === dealPrice) {
      delete currentItem.dealPrice;
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
      // console.log(action);
      console.log(id, name, brand, shortName, price, quantity, deal);

      const { cart, twoForDeals, tenForDeals } = state;
      let qty = cart[id] ? cart[id].qty + quantity : quantity;

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

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
          if (tenForDeal) tenForDeals.push(tenForDeal);
        }
        if (twoForDeals.filter((val) => val === twoForDeal).length > 1) {
          // state.cart = checkTwoForDeals({ ...state.cart }, twoForDeal);
          state.cart = checkApplyDeal(
            { ...state.cart },
            "twoFor",
            twoForDeal,
            2
          );
          // state.cart[id].dealPrice = twoForDeal / 2;
        } else {
          if (state.cart[id].dealPrice) delete state.cart[id].dealPrice;
        }

        // if (twoForDeals.filter((val) => val === twoForDeal).length > 9) {
        //   // state.cart = checkTwoForDeals({ ...state.cart }, twoForDeal);
        //   state.cart = checkApplyDeal({ ...state.cart }, "twoFor", twoForDeal);
        //   // state.cart[id].dealPrice = twoForDeal / 2;
        // } else {
        //   if (state.cart[id].dealPrice) delete state.cart[id].dealPrice;
        // }
      }

      console.log(state.cart);
    },
    decrement: (state, action) => {
      const {
        payload: { id, all },
      } = action;

      const { cart, twoForDeals, tenForDeals } = state;

      const item = state.cart[id];
      console.log(current(item));
      console.log(current(twoForDeals));

      const {
        qty,
        deal,
        deal: { twoFor },
      } = item;
      // console.log(current(qty));
      // console.log(current(deal));

      if (all || qty === 1) {
        delete state.cart[id];
      } else {
        state.cart = { ...state.cart, [id]: { ...item, qty: qty - 1 } };
      }

      //  check if the product was in a '2 for' deal
      if (twoFor) {
        // const currentDeal = twoFor;
        const ind = twoForDeals.indexOf(twoFor);
        twoForDeals.splice(ind, 1);
        console.log(current(twoForDeals));
        // const twoForDeal = deal.twoFor;
        // const tenForDeal = deal.tenFor;
        if (twoForDeals.filter((val) => val === twoFor).length < 2) {
          // check products in cart that have the same deal as the removed product
          state.cart = checkRemoveDeal(state.cart, "twoFor", twoFor);
        }
      }
    },
    applyDiscountCode: (state, action) => {
      console.log(action);
      state.cart = checkDiscountCode(state.cart, action.payload);
    },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  //   // The `extraReducers` field lets the slice handle actions defined elsewhere,
  //   // including actions generated by createAsyncThunk or in other slices.
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, (state) => {
  //         state.status = "loading";
  //       })
  //       .addCase(incrementAsync.fulfilled, (state, action) => {
  //         state.status = "idle";
  //         state.value += action.payload;
  //       });
  //   },
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

export const applyDiscounts = (discountCode) => {
  const cart = selectCart();
  checkDiscountCode(cart, discountCode);
};

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCart(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default cartSlice.reducer;
