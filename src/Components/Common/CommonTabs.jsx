import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const CommonTabs = ({ tabOptions, categoryindex = 0 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryIndex = searchParams.get("tab") || categoryindex; // Get index from URL or use default
  const [activeTab, setActiveTab] = useState(Number(queryIndex));

  const tabContainerRef = useRef(null);
  const tabRefs = useRef([]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setSearchParams({ tab: index }); // Update URL with tab index
    scrollToTab(index);
  };

  const scrollToTab = (index) => {
    if (tabContainerRef.current && tabRefs.current[index]) {
      const container = tabContainerRef.current;
      const tab = tabRefs.current[index];

      // Calculate the scroll position to center the selected tab
      const containerCenter = container.offsetWidth / 2;
      const tabLeft = tab.offsetLeft + tab.offsetWidth / 2;
      const scrollPosition = tabLeft - containerCenter;

      // Smooth scroll effect
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToTab(Number(queryIndex)); // Scroll to tab from URL
  }, [queryIndex]);

  return (
    <div className="w-full flex justify-center">
      <div
        ref={tabContainerRef}
        className="relative w-full max-w-full overflow-x-auto scrollbar-hide flex"
      >
        <div className="flex space-x-4 p-2 border-gray-300">
          {tabOptions.map((tab, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              className={`px-4 py-2 whitespace-nowrap rounded-md transition-all ${
                activeTab === index
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonTabs;
