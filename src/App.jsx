import "./CSS/index.css";
import "./CSS/App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Main from "./pages/Main/Main";
import DealMain from "./pages/nearbyStockDeals/DealMain";
import DealDetail from "./pages/nearbyStockDeals/DealDetail";
import Advertise from "./pages/Advertise/Advertise";
import OutputText from "./pages/Advertise/OutputText";
import ChatMain from "./pages/Chat/ChatMain";
import ChatRoom from "./pages/Chat/ChatRoom";
import StoreMain from "./pages/MyStore/StoreMain";

function App() {
  return (
    <Router>
      <div className="App relative">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/deals" element={<DealMain />} />
          <Route path="/deals/:id" element={<DealDetail />} />
          <Route path="/write" element={<Advertise />} />
          <Route path="/output" element={<OutputText />} />
          <Route path="/chat" element={<ChatMain />} />
          <Route path="/chat/:roomId" element={<ChatRoom />} />
          <Route path="/store" element={<StoreMain />} />
        </Routes>
        <Menu />
      </div>
    </Router>
  );
}

export default App;
