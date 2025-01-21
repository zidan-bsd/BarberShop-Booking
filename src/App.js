import "./styles/Global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Booking from "./pages/booking/Booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Booking /> />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
