import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import Home from "./components/Home";
import Category from "./components/Category";
import Product from "./components/Product";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <MainContainer>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/:category/:variety" element={<Category />} />
          <Route path="/:category/:variety/:id" element={<Product />} />
        </Routes>
      </MainContainer>
    </Router>
  );
}

export default App;
