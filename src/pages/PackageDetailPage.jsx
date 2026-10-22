
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPackageById } from "../services/api";
import useBookingCart from "../context/useBookingCart";

export default function PackageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useBookingCart();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    getPackageById(id).then(setPkg);
  }, [id]);

  if (!pkg) {
    return (
      <main className="page">
        <p>Package not found.</p>
        <Link to="/packages">Back to packages</Link>
      </main>
    );
  }

  const handleBooking = () => {
    addToCart(pkg);
    navigate("/booking");
  };

  return (
    <main className="page detail-page">
      <Link to="/packages">← Back to packages</Link>
      <img className="detail-image" src={pkg.image} alt={pkg.name} />
      <p className="destination">{pkg.destination}</p>
      <h1>{pkg.name}</h1>
      <p>{pkg.description}</p>
      <p>{pkg.duration} days · ⭐ {pkg.rating}</p>
      <h2>₹{pkg.price.toLocaleString("en-IN")} / person</h2>
      <button className="button" onClick={handleBooking}>
        Add to Cart & Book
      </button>
    </main>
  );
}
