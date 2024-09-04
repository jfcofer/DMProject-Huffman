import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Compression from "./pages/Compression/Compression";
import Decompression from "./pages/Decompression/Decompression";

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Compression />} />
          <Route path="/decompress" element={<Decompression />} />
          <Route path="/compress" element={<Compression />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
