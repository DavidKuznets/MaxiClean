interface Props {
  rating: number;
}

export const StarRating: React.FC<Props> = ({ rating }) => {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(n => (
        <img
          key={n}
          src={n <= rating ? "/ActiveStar.png" : "/Star.png"}
          alt="Star"
          className="star"
        />
      ))}
    </div>
  );
};
