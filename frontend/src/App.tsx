import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { HomePage } from "./Page/HomePage/HomePage";
import { Footer } from "./Components/Footer/Footer";
import { AboutUsPage } from "./Page/AboutUsPage/AboutUsPage";
import { ContactsPage } from "./Page/ContactsPage/ContactsPage";
import { ReviewsPage } from "./Page/ReviewsPage/ReviewsPage";
import { MattressPage } from "./Page/ServicesPageCards/MattressPage/MattressPage";
import { ChairPage } from "./Page/ServicesPageCards/ChairPage/ChairPage";
import { CarpetsPage } from "./Page/ServicesPageCards/CarpetsPage/CarpetsPage";
import { SofaPage } from "./Page/ServicesPageCards/SofaPage/SofaPage";
import { ServicePage } from "./Page/ServicePage/ServicePage";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/services/sofa" element={<SofaPage />} />
          <Route path="/services/carpets" element={<CarpetsPage />} />
          <Route path="/services/mattresses" element={<MattressPage />} />
          <Route path="/services/chair" element={<ChairPage />} />
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
