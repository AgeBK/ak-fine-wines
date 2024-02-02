import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useGetWinesQuery } from "../../services/API";

function Content({ children }) {
  let content = null;
  const { error, isLoading } = useGetWinesQuery();

  if (error) {
    content = <Error />;
  } else if (isLoading) {
    content = <Loading />;
  } else {
    content = children;
  }
  return <main>{content}</main>;
}

export default Content;
