import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { HomePage } from "./Page/HomePage/HomePage";
import { Footer } from "./Components/Footer/Footer";
import { ServicesPage } from "./Page/ServicesPage/ServicesPage";
import { AboutUsPage } from "./Page/AboutUsPage/AboutUsPage";
import { ContactsPage } from "./Page/ContactsPage/ContactsPage";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/reviews" element={<h1>Відгуки</h1>} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
