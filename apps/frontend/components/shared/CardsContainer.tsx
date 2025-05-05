import React from "react";
import { Cards } from "./Cards";

const CardsContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 container max-w-7xl mx-auto">
      <Cards
        description="Easily navigate through our intuitive platform designed for both
        beginners and experts."
        title="User-Friendly Interface"
      />
      <Cards
        description="Leverage powerful analytics tools to understand video performance
        and viewer engagement."
        title="Advanced Analytics"
      />
      <Cards
        description="Securely store and manage your videos with our reliable cloud
        storage solutions."
        title="Cloud Storage"
      />
    </div>
  );
};

export default CardsContainer;
