import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import Home from "./components/Home";
import Category from "./components/Category";
import Product from "./components/Product";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  console.log("App");
  return (
    <Router>
      <MainContainer>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/:category" element={<Category />} />
          <Route exact path="/:category/:variety" element={<Category />} />
          <Route exact path="/:category/:variety/:id" element={<Product />} />
        </Routes>
      </MainContainer>
    </Router>
  );
}

export default App;
