import { Route, Routes } from "react-router-dom";
import BlogSection from "./BlogSection";
import Home from "./Home";
import SkinAI from "./skinai";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Home />
          <BlogSection />
        </>
      } />

      <Route path="/skinai" element={<SkinAI />} />
    </Routes>
  );
}