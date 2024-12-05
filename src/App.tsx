import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Text from "./pages/Text";
import Home from "./pages/Home";
import Image from "./pages/Image";
import SwitchboardWrapper from "./pages/switchboardexample/SwitchboardWrapper";

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text" element={<Text />} />
        <Route path="/image" element={<Image />} />
        <Route path="/switchboard" element={<SwitchboardWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
