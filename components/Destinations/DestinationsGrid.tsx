import { allDestinations } from "@/data/destinations";
import DestinationCard from "./DestinationCard";

export default function DestinationsGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {allDestinations.map((dest) => (
          <DestinationCard key={dest.id} dest={dest} />
        ))}
      </div>
    </div>
  );
}
