import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import Navbar from "./components/Navbar";
import "./styles/global.css";
import MyFiles from "./pages/MyFiles";


function App() {
  return (
    <BrowserRouter>
      <Navbar />   

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send" element={<Send />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/my-files" element={<MyFiles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
