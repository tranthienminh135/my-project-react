import Home from "./ui/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./ui/Layout";
import CreateSC from "./ui/CreateSC";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreateSC />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
