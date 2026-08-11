import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ImageUploadPage from "./pages/ImageUploadPage";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/create-post" element={<ImageUploadPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
      </Routes>
    </>
  );
};

export default App;
