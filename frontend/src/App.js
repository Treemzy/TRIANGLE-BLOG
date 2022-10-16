import './App.css';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import PostScreen from "./screens/PostScreen";
import LoginScreen from "./screens/LoginScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import PostEditScreen from "./screens/PostEditScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PostListScreen from "./screens/PostListScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CreateCategoryScreen from "./screens/CreateCategoryScreen";
import CategoryEditScreen from "./screens/CategoryEditScreen";
import CommentsListScreen from "./screens//CommentsListScreen";

function App() {
  return (
   <Router>
      <Header/>
        <main className="py-3">
            <Container className="marginTop">
               <Routes>
                  <Route path="/" element={<HomeScreen />} exact />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/createpost" element={<CreatePostScreen />} />
                  <Route path="/post/:id/edit" element={<PostEditScreen />} />
                  <Route path="/FAQ" element={<AboutScreen />} />
                  <Route path="/post/:id" element={<PostScreen />} />
                  <Route path="/admin/userlist" element={<UserListScreen />} />
                  <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
                  <Route path="/admin/postlist" element={<PostListScreen />} />
                  <Route path="/admin/category" element={<CategoryScreen />} />

                  <Route path="/admin/comments" element={<CommentsListScreen />} />
                  <Route path="/admin/category/create" element={<CreateCategoryScreen />} />
                  <Route path="/admin/category/:id/edit" element={<CategoryEditScreen />} />
                  
               </Routes>
            </Container>
        </main>
      <Footer/>
   </Router>
  );
}

export default App;
