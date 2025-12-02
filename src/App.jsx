import "./CSS/index.css";
import "./CSS/App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Menu from "./components/Menu";
import Main from "./pages/Main/Main";
import DealMain from "./pages/nearbyStockDeals/DealMain";
import DealDetail from "./pages/nearbyStockDeals/DealDetail";
import Advertise from "./pages/Advertise/Advertise";
import OutputText from "./pages/Advertise/OutputText";
import ChatMain from "./pages/Chat/ChatMain";
import ChatRoom from "./pages/Chat/ChatRoom";
import StoreMain from "./pages/MyStore/StoreMain";
import SalesHistory from "./pages/MyStore/SalesHistory/SalesHistory";
import Bookmark from "./pages/MyStore/Bookmark";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function AppContent() {
  const location = useLocation();

  const hideMenuPaths = ["/login", "/signup"];

  const shouldHideMenu = hideMenuPaths.includes(
    location.pathname.toLowerCase()
  );

  return (
    <div className="App relative">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
        <Route path="/deals" element={<DealMain />} />
        <Route path="/deals/:id" element={<DealDetail />} />
        <Route path="/write" element={<Advertise />} />
        <Route path="/output" element={<OutputText />} />
        <Route path="/chat" element={<ChatMain />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
        <Route path="/store" element={<StoreMain />} />
        <Route path="/SalesHistory" element={<SalesHistory />} />
        <Route path="/Bookmark" element={<Bookmark />} />
      </Routes>

      {!shouldHideMenu && <Menu />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
