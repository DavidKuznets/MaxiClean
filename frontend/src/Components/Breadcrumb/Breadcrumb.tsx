import { Link } from "react-router-dom";
import "./Breadcrumb.scss";

interface BreadcrumbProps {
  current: string;
  previousLabel?: string;
  previousLink?: string;
}

export const Breadcrumb = ({
  current,
  previousLabel = "Послуги",
  previousLink = "/services",
}: BreadcrumbProps) => (
  <nav className="breadcrumb" aria-label="breadcrumb">
    <Link to={previousLink} className="breadcrumb__link">
      {previousLabel}
    </Link>
    <span className="breadcrumb__separator">→</span>
    <span className="breadcrumb__current">{current}</span>
  </nav>
);
