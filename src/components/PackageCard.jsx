
import { Link } from "react-router-dom";
import { logAction } from "../logger";

export default function PackageCard({ pkg }) {
  const handleViewDetails = () => {
    logAction("View package details clicked", {
      packageId: pkg.id,
      packageName: pkg.name,
      destination: pkg.destination,
    });
  };

  return (
    <article className="package-card">
      <img
        src={pkg.image}
        alt={`${pkg.name} travel destination`}
        loading="lazy"
        decoding="async"
        width="400"
        height="250"
      />

      <div className="package-card-content">
        <p className="destination">{pkg.destination}</p>
        <h2>{pkg.name}</h2>
        <p>{pkg.duration} days · ⭐ {pkg.rating}</p>
        <p className="price">
          ₹{pkg.price.toLocaleString("en-IN")} / person
        </p>

        <Link
          className="button"
          to={`/package/${pkg.id}`}
          onClick={handleViewDetails}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
