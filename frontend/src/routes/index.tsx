import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/home";
import Document from "@/pages/document/document";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/documents/:id' element={<Document />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
