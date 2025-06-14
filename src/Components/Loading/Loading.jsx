import React, { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black z-[9999] flex flex-col justify-center items-center gap-6 p-4">
      <div className="flex items-center gap-4">
        <p className="text-2xl text-yellow-500 animate-pulse">Loading</p>
        <div className="w-6 h-6 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="font-bold text-center text-yellow-500">
        Since free hosting service is used, it might take a few seconds to load.
        Please hold on!
      </p>
    </div>
  );
};

export default Loading;
