const hyphenate = (text) => text.toLowerCase().replace(/ /gi, "-");
const deHyphenate = (text) => text.toLowerCase().replace(/-/gi, " ");

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
export { hyphenate, deHyphenate };
