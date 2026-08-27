"use client";

import { motion } from "framer-motion";
import { allDestinations } from "@/data/destinations";
import DestinationCard from "./DestinationCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function DestinationsGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full flex-1">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {allDestinations.map((dest) => (
          <DestinationCard key={dest.id} dest={dest} />
        ))}
      </motion.div>
    </div>
  );
}
