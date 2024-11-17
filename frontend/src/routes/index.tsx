import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home/home";
import Document from "@/pages/document/document";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/documents/:id' element={<Document />} />
    </Routes>
  );
};

export default AppRoutes;
