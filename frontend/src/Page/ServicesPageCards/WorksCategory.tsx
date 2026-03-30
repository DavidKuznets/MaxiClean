import { useEffect, useState } from "react";

interface Work {
  id: number;
  name: string;
  description: string | null;
  service_category: { id: number; name: string };
  price: string;
  discount: number;
  work_image: string;
  is_active: boolean;
}

interface WorksCategoryProps {
  category?: string;
}

export const WorksCategory: React.FC<WorksCategoryProps> = ({ category }) => {
  const [works, setWorks] = useState<Work[]>([]);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/works/`)
      .then((res) => res.json())
      .then((data) => {
        let results: Work[] = data.results;

        if (category) {
          results = results.filter(
            (work) =>
              work.service_category.name.toLowerCase() ===
              category.toLowerCase(),
          );
        }

        setWorks(results);
      })
      .catch(console.error);
  }, [category]);

  if (works.length === 0) return <p>Немає робіт для відображення.</p>;

  return (
    <section className="ServicesPrices">
      <h2>Ціни на послуги</h2>

      <div className="ServicesPrices__grid">
        {works.map((work) => (
          <div key={work.id} className="price-card">
            <img src={work.work_image} alt={work.name} />
            <p className="subtitle">
              {work.service_category?.name || "Хімчистка"}
            </p>
            <p>{work.name}</p>
            <span>
              <em>Від</em> {work.price} ₴
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
