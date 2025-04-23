import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const CommonTabs = ({ tabOptions, categoryindex = 0 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryIndex = searchParams.get("tab") || categoryindex;
  const [activeTab, setActiveTab] = useState(Number(queryIndex));

  const tabContainerRef = useRef(null);
  const tabRefs = useRef([]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setSearchParams({ tab: index });
    if (index !== 0) scrollToTab(index - 1); // shift because "All" is outside scroll
  };

  const scrollToTab = (index) => {
    if (tabContainerRef.current && tabRefs.current[index]) {
      const container = tabContainerRef.current;
      const tab = tabRefs.current[index];

      const containerCenter = container.offsetWidth / 2;
      const tabLeft = tab.offsetLeft + tab.offsetWidth / 2;
      const scrollPosition = tabLeft - containerCenter;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (Number(queryIndex) !== 0) {
      scrollToTab(Number(queryIndex) - 1); // -1 for offset due to "All"
    }
  }, [queryIndex]);

  return (
    <div className="w-full flex items-center space-x-2 px-2">
      {/* Fixed "All" button */}
      <button
        className={`px-4 py-2 mb-0 md:mb-4 whitespace-nowrap rounded-md transition-all ${
          activeTab === 0 ? "bg-black text-white" : "bg-gray-200 text-black"
        }`}
        onClick={() => handleTabClick(0)}
      >
        All
      </button>

      {/* Scrollable tab container */}
      <div
        ref={tabContainerRef}
        className="flex-1 overflow-x-auto scrollbar-hide"
      >
        <div className="flex space-x-2  w-max">
          {tabOptions.map((tab, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              className={`px-4 py-2 whitespace-nowrap rounded-md transition-all ${
                activeTab === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleTabClick(index + 1)}
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
