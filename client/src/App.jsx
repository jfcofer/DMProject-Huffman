import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Compression from "./pages/Compression";
import Decompression from "./pages/Decompression";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decompress" element={<Decompression />} />
          <Route path="/compress" element={<Compression />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
