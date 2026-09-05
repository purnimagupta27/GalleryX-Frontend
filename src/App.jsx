import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import { ProfilePage } from "./pages/ProfilePage";
import UserProfilePage from "./pages/UserProfilePage";
import { BookmarkPage } from "./pages/BookmarkPage";
import { BookmarkPostPage } from "./pages/BookmarkPostPage";

const App = () => {
  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:userId" element={<UserProfilePage />} />
        <Route path="my-bookmarks" element={<BookmarkPage />} />
        <Route path="/bookmarks/:bookmarkId" element={<BookmarkPostPage />} />
      </Routes>
    </>
  );
};

export default App;
