import { FAQ } from "../../Components/Question/FAQ";
import { ServiceCards } from "../../Components/ServiceCards/ServiceCards";
import "./ServicePage.scss";

export const ServicePage = () => {
  return (
    <div className="servicePage">
      <ServiceCards />
      <FAQ />
    </div>
  );
};
