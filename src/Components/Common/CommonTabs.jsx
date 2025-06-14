import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CommonTabs = ({ tabOptions }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("cat") || "all";

  const tabRefs = useRef({}); // To hold refs for each tab

  const changeQueryInURL = (slug) => {
    const query = slug !== "all" ? `?cat=${slug}` : "";
    navigate(`/stories${query}`);
    scrollToTab(slug);
  };

  const scrollToTab = (slug) => {
    const tabElement = tabRefs.current[slug];
    if (tabElement && tabElement.scrollIntoView) {
      tabElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  // Scroll on mount based on URL
  useEffect(() => {
    scrollToTab(urlQuery);
  }, [urlQuery]);

  return (
    <div className="w-full flex items-center space-x-2 px-2">
      <button
        onClick={() => changeQueryInURL("all")}
        ref={(el) => (tabRefs.current["all"] = el)}
        className={`lg:mb-4 mb-0 px-4 py-2 whitespace-nowrap rounded-md transition-all ${
          urlQuery === "all" ? "bg-black text-white" : ""
        }`}
      >
        All
      </button>

      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 w-max">
          {tabOptions.map((tab, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[tab?.slug] = el)}
              onClick={() => changeQueryInURL(tab?.slug)}
              className={`px-4 py-2 whitespace-nowrap rounded-md transition-all ${
                urlQuery === tab?.slug ? "bg-black text-white" : ""
              }`}
            >
              {tab?.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonTabs;
