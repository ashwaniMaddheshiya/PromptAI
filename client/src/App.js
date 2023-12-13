import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PromptCategories from "./pages/PromptCategories";
import PromptDetail from "./pages/PromptDetail";
import PromptForm from "./pages/PromptForm";
import { selectToken } from "./reducers/authReducer";
import PageNotFound from "./pages/PageNotFound";
import Prompts from "./pages/Prompts";
import EmailConfirmation from "./pages/EmailConfirmation";
import Chat from "./pages/Chat";
import PasswordReset from "./pages/PasswordReset";
import UpdatePassword from "./pages/UpdatePassword";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.withCredentials = true;

const App = () => {
  const token = useSelector(selectToken);

  let routes;
  if (!token) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/verifyemail/:token/*" element={<EmailConfirmation />} />
        <Route exact path="/reset" element={<PasswordReset />} />
        <Route exact path="/resetpassword/:token/*" element={<UpdatePassword />} />
        <Route exact path="/prompt" element={<PromptCategories />} />
        <Route exact path="/prompt/:categoryId" element={<Prompts />} />
        <Route
          exact
          path="/prompt/:categoryId/:promptId"
          element={<PromptDetail />}
        />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/chat" element={<Chat />} />

        <Route exact path="/prompt" element={<PromptCategories />} />
        <Route exact path="/prompt/new" element={<PromptForm />} />
        <Route exact path="/prompt/:categoryId" element={<Prompts />} />
        <Route
          exact
          path="/prompt/:categoryId/:promptId"
          element={<PromptDetail />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
      <div className="container m-auto min-h-screen">
        <ToastContainer position="top-center" autoClose={2000} />
        <Navbar />
        {routes}
      </div>
      <Footer />
    </div>
  );
};

export default App;
