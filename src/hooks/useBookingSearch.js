
import { useEffect, useState } from "react";
import { getPackages } from "../services/api";
import { logAction } from "../logger";

export default function useBookingSearch() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("All");
  const [maxBudget, setMaxBudget] = useState(20000);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPackages() {
      try {
        setLoading(true);
        setError("");

        logAction("Loading travel packages");

        const data = await getPackages({
          signal: controller.signal,
        });

        setPackages(data);

        logAction("Travel packages loaded successfully", {
          totalPackages: data.length,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load packages. Please try again.");

          logAction("Failed to load travel packages", {
            error: err.message,
          });
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPackages();

    return () => controller.abort();
  }, []);

  const destinations = [
    "All",
    ...new Set(packages.map((pkg) => pkg.destination)),
  ];

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      `${pkg.name} ${pkg.destination}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDestination =
      destination === "All" || pkg.destination === destination;

    return matchesSearch && matchesDestination && pkg.price <= maxBudget;
  });

  useEffect(() => {
    logAction("Package search or filter changed", {
      searchTerm: search,
      destination,
      maxBudget,
      resultsCount: filteredPackages.length,
    });
  }, [search, destination, maxBudget, filteredPackages.length]);

  const handleSearchChange = (value) => {
    setSearch(value);

    logAction("Package search entered", {
      searchTerm: value,
    });
  };

  const handleDestinationChange = (value) => {
    setDestination(value);

    logAction("Destination filter changed", {
      destination: value,
    });
  };

  const handleMaxBudgetChange = (value) => {
    const budget = Number(value);
    setMaxBudget(budget);

    logAction("Maximum budget changed", {
      maxBudget: budget,
    });
  };

  return {
    packages: filteredPackages,
    loading,
    error,
    search,
    setSearch: handleSearchChange,
    destination,
    setDestination: handleDestinationChange,
    destinations,
    maxBudget,
    setMaxBudget: handleMaxBudgetChange,
  };
}
