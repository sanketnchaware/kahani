import React from "react";

const Loading = () => {
  return (
    <div className="lg:p-0  p-4 flex gap-4 flex-col loading-overlay">
      <div className="flex items-center gap-4 ">
        <p className="text-2xl text-yellow-500">Loading</p>
        <div className="spinner"></div>
      </div>
      <p className="font-bold text-center text-yellow-500">
        Since free hosting service is used, it might take a few seconds to load.
        Please hold on !
      </p>
    </div>
  );
};

export default Loading;
