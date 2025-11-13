import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";

import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Redirect home "/" to /posts */}
          <Route path="/" element={<Navigate to="/posts" replace />} />

          {/* All posts list */}
          <Route path="/posts" element={<BlogPostsPage />} />

          {/* Individual post page */}
          <Route path="/post/:id" element={<IndividualPostPage />} />

          {/* Contact page */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
