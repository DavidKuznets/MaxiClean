import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { HomePage } from "./Page/HomePage/HomePage";
import { Footer } from "./Components/Footer/Footer";
import { ServicesPage } from "./Page/ServicesPage/ServicesPage";
import { AboutUsPage } from "./Page/AboutUsPage/AboutUsPage";
import { ContactsPage } from "./Page/ContactsPage/ContactsPage";
import { ServiceCards } from "./Components/ServiceCards/ServiceCards";
import { ReviewsPage } from "./Page/ReviewsPage/ReviewsPage";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServiceCards />} />
          <Route path="/services/soft-furniture" element={<ServicesPage />} />
          <Route path="/services/carpets" element={<ServicesPage />} />
          <Route path="/services/mattresses" element={<ServicesPage />} />
          <Route path="/services/car-interior" element={<ServicesPage />} />
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
