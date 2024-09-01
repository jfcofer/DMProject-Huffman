import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
