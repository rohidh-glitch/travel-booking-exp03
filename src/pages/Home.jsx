
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="hero">
      <nav className="navbar">
        <Link className="brand" to="/">TravelGo</Link>
        <div className="nav-links">
          <Link to="/packages">Explore Packages</Link>
          <Link to="/booking">My Cart</Link>
          <Link to="/bookings">Booking History</Link>
        </div>
      </nav>

      <section className="hero-content">
        <p className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>
        <h1>Discover places.<br />Create memories.</h1>
        <p>Find your perfect holiday with TravelGo travel packages.</p>
        <Link className="button" to="/packages">
          Explore Packages
        </Link>
      </section>
    </main>
  );
}
