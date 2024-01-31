const hyphenate = (text) =>
  typeof text === "string" && text.toLowerCase().replace(/ /gi, "-");

const deHyphenate = (text) =>
  typeof text === "string" && text.toLowerCase().replace(/-/gi, " ");

const randomProducts = (arr) => arr.sort(() => 0.5 - Math.random());

const homePageCarouselProducts = (arr) => {
  console.log(arr);
  const products = randomProducts(arr)
    .filter(({ price: { current, normal } }) => current !== normal)
    .slice(0, 12);
  return products;
};

const productPageCarouselProducts = (arr, wineVariety) => {
  const products = randomProducts(arr)
    .filter(({ variety }) => variety.toLowerCase() === wineVariety)
    .slice(0, 12);
  return products;
};

const checkDeals = (twoFor, tenFor, percentOff) => {
  let deal = 0;
  if (twoFor) {
    deal = { twoFor };
  } else if (tenFor) {
    deal = { tenFor };
  } else if (percentOff) {
    deal = { percentOff };
  }
  return deal;
};

const categoryURLs = {
  "price-drop": (all) => {
    return all.filter(({ price: { current, normal } }) => current !== normal);
  },
  "two-for-deals": (all) => {
    return all.filter(
      ({ promotion: { calloutText } }) =>
        calloutText && calloutText.startsWith("2 for")
    );
  },
  "ten-percent-off": (all) => {
    return all.filter(
      ({ promotion: { calloutText } }) =>
        calloutText && calloutText.startsWith("10% OFF")
    );
  },
  "ten-and-less": (all) => {
    return all.filter(({ price: { current } }) => current <= 10);
  },
  "ten-for-100": (all) => {
    return all.filter(({ price: { tenFor } }) => tenFor === 100);
  },
  "two-for-price": (all, price) => {
    return all.filter(({ price: { twoFor } }) => twoFor === price);
  },
  urlVariety: (all, urlVariety) => {
    return all.filter(
      ({ variety, brand }) =>
        hyphenate(variety) === urlVariety || hyphenate(brand) === urlVariety
    );
  },
  search: (all, query) => {
    return all.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  },
  category: (all, urlCategory) => {
    return all.filter(({ category }) => category.toLowerCase() === urlCategory);
  },
};

export {
  hyphenate,
  deHyphenate,
  randomProducts,
  homePageCarouselProducts,
  productPageCarouselProducts,
  checkDeals,
  categoryURLs,
};

// // remove unused properties
// const promotions = all.map((val) => {
//   console.log(val.id);
//   delete val.promotion.dinkus;
//   delete val.promotion.catalogue;
//   delete val.stock;
//   delete val.campaignId;
//   delete val.sellItemId;
//   delete val.isAvailable;

//   return val;
// });

// console.log(promotions);

// const deals = all.reduce((acc, val) => {
//   const text = val.promotion.calloutText;
//   if (text) {
//     if (acc[text] !== undefined) {
//       const count = acc[text] + 1;
//       acc = { ...acc, [text]: count };
//     } else {
//       acc[text] = 1;
//     }
//   }
//   return acc;
// }, {});

// console.log(deals);

// // only promotions that start with a number
// const promotions = all.map((val) => {
//   const { calloutText } = val.promotion;
//   if (calloutText) {
//     const initial = calloutText[0];
//     if (Number(initial)) {
//       return val;
//     } else {
//       val.promotion.calloutText = null;
//     }
//   }
//   return val;
// });

// console.log(promotions);

// const categoriesObj = all.reduce(
//   (acc, { productId, category, productPicUrl }) => {
//     acc = !acc[category]
//       ? { ...acc, [category]: { productId, category, productPicUrl } }
//       : acc;
//     return acc;
//   },
//   {}
// );
// console.log(categoriesObj);

// const deals = all.reduce((acc, val) => {
//     const text = val.promotion.calloutText;
//     if (text) {
//       if (acc[text] !== undefined) {
//         const count = acc[text] + 1;
//         acc = { ...acc, [text]: count };
//       } else {
//         acc[text] = 1;
//       }
//     }
//     return acc;
//   }, {});

//   console.log(deals);

// const pricefilter = ["0-10", "10-19", "20-29", "30-1000"];
// const pricefilterObj = [
//     { value: "less10", text: "0-10" },
//     { value: "less20", text: "10-19" },
//     { value: "less30", text: "20-29" },
//     { value: "more30", text: "30-1000" },
//   ];

// const twoFor = () => {
//     const arr = [];

//     const arrTwoFor = all.filter(({ promotion: { calloutText } }) => {
//       if (
//         arr.indexOf(calloutText) === -1 &&
//         calloutText &&
//         calloutText.startsWith("2 for")
//       ) {
//         arr.push(calloutText);
//         return true;
//       }
//       return false;
//     });
//     filtered = arrTwoFor;
//   };

// Add property to product object function (2 for deals)
// const test = all.map((val) => {
//     val.price.twoFor = "";
//     if (
//       val.promotion.calloutText &&
//       val.promotion.calloutText.includes("2 for")
//     ) {
//       const twoForPrice = val.promotion.calloutText
//         .split(" ")
//         .pop()
//         .replace("$", "");
//       console.log(val.id);
//       console.log(twoForPrice);
//       val.price.twoFor = Number(twoForPrice);
//     }
//     return val;
//   });

//   console.log(test);
