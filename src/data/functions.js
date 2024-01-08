const hyphenate = (text) => text.toLowerCase().replace(/ /gi, "-");
const deHyphenate = (text) => text.toLowerCase().replace(/-/gi, " ");

const randomProducts = (arr) => arr.sort(() => 0.5 - Math.random());

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
export { hyphenate, deHyphenate, randomProducts };
