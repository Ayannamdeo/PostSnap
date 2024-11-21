
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/home/HomePage").then(module => ({default: module.HomePage})));
const ArticleDetailPage = lazy(() => import("./pages/articleDetail/ArticleDetailPage").then(module => ({default: module.ArticleDetailPage})));
const RegisterPage = lazy(()=> import("./pages/register/RegisterPage").then(module => ({default: module.RegisterPage})));
const LoginPage = lazy(() => import("./pages/login/LoginPage").then(module => ({default: module.LoginPage})));
const Blogs = lazy(()=> import("./pages/blogs/Blogs").then(module => ({default: module.Blogs})));
const MyPosts = lazy(()=> import("./pages/myPosts/MyPosts").then(module => ({default: module.MyPosts})));
const CreateBlog = lazy(()=> import("./pages/createArticle/CreateBlog").then(module => ({default: module.CreateBlog})));
const EditBlog = lazy(()=> import("./pages/editArticle/EditBlog").then(module => ({default: module.EditBlog})));
const Privateroutes = lazy(()=> import("./feature/PrivateRoutes").then(module => ({default: module.Privateroutes})));

import { Mycontext } from "./store/CreateContext";
import { MainLayout } from "./components";

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <Mycontext.Provider
        value={{ userName, setUserName, userEmail, setUserEmail, isAuth, setIsAuth, userId, setUserId, }} >
        <Routes>
          <Route element={<MainLayout />}>
            {/* Lazy loading each route individually */}
            <Route path="/" element={
                <Suspense fallback={<div>Loading HomePage...</div>}>
                  <HomePage />
                </Suspense>
              } />
            <Route path="/blogs" element={
                <Suspense fallback={<div>Loading Blogs...</div>}>
                  <Blogs />
                </Suspense>
              } />
            <Route path="/blogs/:id" element={
                <Suspense fallback={<div>Loading ArticleDetail...</div>}>
                  <ArticleDetailPage />
                </Suspense>
              } />
            <Route path="/register" element={
                <Suspense fallback={<div>Loading RegisterPage...</div>}>
                  <RegisterPage />
                </Suspense>
              } />
            <Route path="/login" element={
                <Suspense fallback={<div>Loading LoginPage...</div>}>
                  <LoginPage />
                </Suspense>
              } />
            {/* Private Routes */}
            <Route element={
                <Suspense fallback={<div>Loading PrivateRoutes...</div>}>
                  <Privateroutes />
                </Suspense>
              } >
              <Route path="/myposts" element={
                  <Suspense fallback={<div>Loading MyPosts...</div>}>
                    <MyPosts />
                  </Suspense>
                } />
              <Route path="/create" element={
                  <Suspense fallback={<div>Loading CreateBlog...</div>}>
                    <CreateBlog />
                  </Suspense>
                } />
              <Route path="/edit/:id" element={
                  <Suspense fallback={<div>Loading EditBlog...</div>}>
                    <EditBlog />
                  </Suspense>
                } />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Mycontext.Provider>
    </>
  );
}

export default App;

