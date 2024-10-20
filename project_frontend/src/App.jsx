import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

import { HomePage } from "./pages/home/HomePage";
import { ArticleDetailPage } from "./pages/articleDetail/ArticleDetailPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { LoginPage } from "./pages/login/LoginPage";
import { Blogs } from "./pages/blogs/Blogs";
import { Mycontext } from "./store/CreateContext";
import { Privateroutes } from "./feature/PrivateRoutes";
import { MyPosts } from "./pages/myPosts/MyPosts";
import { CreateBlog } from "./pages/createArticle/CreateBlog";
import { EditBlog } from "./pages/editArticle/EditBlog";

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
    <Mycontext.Provider value={{userName, setUserName, userEmail, setUserEmail, isAuth, setIsAuth, userId, setUserId}}>
    <div>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<HomePage />} />

        <Route path="/blogs/" element={<Privateroutes isAuth={isAuth} />} >
           <Route path="/blogs/" element={<Blogs />} />
           <Route path="/blogs/:id" element={<ArticleDetailPage />} />
        </Route>

        <Route path="/myposts/" element={<Privateroutes isAuth={isAuth}/>} >
          <Route path="/myposts/" element={<MyPosts />}/>
        </Route>

        <Route path="/create/" element={<Privateroutes isAuth={isAuth}/>} >
          <Route path="/create/" element={<CreateBlog />}/>
        </Route>

        <Route path="/edit/:id" element={<Privateroutes isAuth={isAuth}/>} >
          <Route path="/edit/:id" element={<EditBlog />}/>
        </Route>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setIsAuth={setIsAuth}/>} />
      </Routes>
      <Toaster />
    </div>
    </Mycontext.Provider>
    </>
  );
}

export default App;
