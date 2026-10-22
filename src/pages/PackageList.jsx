
import { Link } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import useBookingSearch from "../hooks/useBookingSearch";

export default function PackageList() {
  const {
    packages,
    loading,
    error,
    search,
    setSearch,
    destination,
    setDestination,
    destinations,
    maxBudget,
    setMaxBudget,
  } = useBookingSearch();

  return (
    <main className="page">
      <nav className="navbar">
        <Link className="brand" to="/">TravelGo</Link>
        <div className="nav-links">
          <Link to="/booking">My Cart</Link>
          <Link to="/bookings">Booking History</Link>
        </div>
      </nav>

      <h1>Explore Travel Packages</h1>
      <p>Find a destination for your next trip.</p>

      <section className="filters">
        <label>
          Search packages
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination or package"
          />
        </label>

        <label>
          Destination
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {destinations.map((place) => (
              <option key={place} value={place}>{place}</option>
            ))}
          </select>
        </label>

        <label>
          Maximum budget: ₹{maxBudget.toLocaleString("en-IN")}
          <input
            type="range"
            min="5000"
            max="20000"
            step="500"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
          />
        </label>
      </section>

      {loading && <p role="status">Loading packages...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        packages.length ? (
          <section className="package-grid">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </section>
        ) : (
          <p>No packages match your filters.</p>
        )
      )}
    </main>
  );
}
