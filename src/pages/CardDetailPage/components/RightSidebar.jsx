import React from "react";
import WriteReviewCard from "./WriteReviewCard";
import QuickActions from "./QuickActions";
import OpeningHours from "./OpeningHours";

const RightSidebar = () => {
  return (
    <div className="space-y-6">
      <WriteReviewCard />
      <QuickActions />
      <OpeningHours />
    </div>
  );
};

export default React.memo(RightSidebar);
