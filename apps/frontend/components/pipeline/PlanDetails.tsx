import Link from "next/link";
import React from "react";

const PlanDetails = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-black dark:text-white">
        You're currently on the free plan
      </h1>
      <p className="text-gray-500">
        Upgrade to a paid plan to get more features{" "}
        <Link className="underline text-blue-500" href="/profile">
          Change Plan.
        </Link>
      </p>
    </div>
  );
};

export default PlanDetails;
