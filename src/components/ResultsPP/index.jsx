import Button from "../Button";

const ResultsPP = ({ paging, updatePaging }) => {
  const pageSizes = [20, 40, 60, 80];

  const handlePageSize = ({ target: { textContent } }) => {
    console.log(textContent);
    updatePaging({ page: 1, pageSize: Number(textContent) });
  };

  return pageSizes.map((val) => (
    <Button css="resultsPP" onClick={handlePageSize} key={`btn${val}`}>
      {paging.pageSize === val ? <span>{val}</span> : val}
    </Button>
  ));
};

export default ResultsPP;
