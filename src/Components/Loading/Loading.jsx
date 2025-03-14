import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center gap-4 loading-overlay">
      <p className="text-3xl">Loading</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
