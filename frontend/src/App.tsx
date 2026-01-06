import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { HomePage } from "./Page/HomePage/HomePage";
import { Footer } from "./Components/Footer/Footer";
import { AboutUsPage } from "./Page/AboutUsPage/AboutUsPage";
import { ContactsPage } from "./Page/ContactsPage/ContactsPage";
import { ServiceCards } from "./Components/ServiceCards/ServiceCards";
import { ReviewsPage } from "./Page/ReviewsPage/ReviewsPage";
import { ServicePage } from "./Page/ServicePage/ServicePage";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServiceCards />} />
          <Route path="/services/soft-furniture" element={<ServicePage />} />
          <Route path="/services/carpets" element={<ServicePage />} />
          <Route path="/services/mattresses" element={<ServicePage />} />
          <Route path="/services/car-interior" element={<ServicePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
