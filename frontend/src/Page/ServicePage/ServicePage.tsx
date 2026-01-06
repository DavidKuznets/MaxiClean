import { FAQ } from "../../Components/Question/FAQ";
import { ServicesBlock } from "../ServicesBlock/ServicesBlock";
import "./ServicePage.scss";

export const ServicePage = () => {
  return (
    <div className="servicePage">
      <ServicesBlock />
      <FAQ />
    </div>
  );
};
