import Loading from "../Loading";
import Error from "../Error";
import { useGetWinesQuery } from "../../services/API";

const Content = ({ children }) => {
  let content = null;
  const { error, isLoading, data } = useGetWinesQuery();
  const dataIsArray = Array.isArray(data);

  if (error) {
    content = <Error />;
  } else if (isLoading) {
    content = <Loading />;
  } else if (dataIsArray) {
    content = children;
  } else {
    content = <Error />;
  }
  return <main>{content}</main>;
};

export default Content;
