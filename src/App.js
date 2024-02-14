import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp.js";
import Header from "./components/Header.js"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { UserProvider } from './components/UserContext.js';
import MyOrders from './pages/MyOrders.js';

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
        <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<SignUp />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/myorder" element={<MyOrders />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
