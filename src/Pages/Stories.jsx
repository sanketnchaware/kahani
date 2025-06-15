import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, TrendingUp, Users, ChevronRight } from "lucide-react";
import UserContext from "../Context/userContext";
import CreateStory from "../Components/Modals/CreateStory";
import axiosInstance from "../utils/axiosInstance";
import { showToastMessage } from "../utils/helpers";
import CommonButton from "../Components/Common/CommonButton";

import { fetchUsers } from "../features/users";
import LoaderContext from "../Context/loaderContext";
import CommonTabs from "../Components/Common/CommonTabs";
import Pagination from "../Components/Common/Pagination";

const Home = () => {
  const { stories } = useSelector((state) => state.stories);

  const { users } = useSelector((state) => state.users);

  const {
    auth: { user, isAuthenticated },
  } = useContext(UserContext);

  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const category = query.get("cat") || "all";

  const { setLoading } = useContext(LoaderContext);

  const dispatch = useDispatch();

  const main = useRef(null);

  const { categories } = useSelector((state) => state.dropdown);

  const [openCreateStory, setCreateOpenStory] = useState(false);

  const [storyId, SetStoryId] = useState("");

  const [searchKey, setSearchKey] = useState("");

  const [debounceValue, setDebounceValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const storiesPerPage = 4;

  // ✅ Step 1: Filter stories first
  const filteredStories = stories.filter((story) => {
    const matchesCategory =
      category === "all" || story?.category?.slug === category;

    const matchesSearch =
      debounceValue.trim() === "" ||
      story?.title?.toLowerCase().includes(debounceValue.toLowerCase()) ||
      story?.description?.toLowerCase().includes(debounceValue.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Calculate totalPages AFTER filtering
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);

  //Clamp currentPage if it's greater than totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredStories, totalPages]);

  // Apply pagination AFTER filtering
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * storiesPerPage,
    currentPage * storiesPerPage
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchKey);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKey]);

  const handleSearchKey = (e) => {
    setSearchKey(e.target.value);
  };

  const fields = {
    title: "",
    description: "",
    tags: [],
  };

  const [params, setParams] = useState(fields);

  const toggleStoryModal = () => setCreateOpenStory(!openCreateStory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = storyId ? `/stories/${storyId}` : "/stories";
    const method = storyId ? "put" : "post";

    setLoading(true);
    axiosInstance[method](endpoint, { ...params, user: user?.id })
      .then(() => {
        showToastMessage(
          `Story ${storyId ? "updated" : "created"} successfully`,
          "success"
        );
        SetStoryId("");
        setParams(fields);
        toggleStoryModal();
        setLoading(false);
      })
      .catch((err) => {
        "err:", err;
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <div ref={main} className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-7/12 space-y-6">
              {/* Search Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                {/* <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold">For You</h4>
                  {isAuthenticated && (
                    <button
                      onClick={toggleStoryModal}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
                    >
                      <BookOpen className="w-4 h-4" />
                      Write Story
                    </button>
                  )}
                </div> */}
                <div className="relative">
                  <input
                    onChange={handleSearchKey}
                    placeholder="Search stories..."
                    type="text"
                    className="w-full text-black pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <CommonTabs urlQuery={category} tabOptions={categories} />

              {/* Stories List */}
              {paginatedStories?.length > 0 ? (
                <div className="space-y-6">
                  {React.Children.toArray(
                    paginatedStories?.map((item) => (
                      <div
                        key={item?._id}
                        className="w-full bg-white p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Story Content */}
                          <div className="w-full space-y-4">
                            {/* Title & Category */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h2 className="text-xl font-bold text-gray-800 hover:text-gray-700">
                                {item?.title}
                              </h2>
                              <span className="text-sm font-medium text-gray-500">
                                ({item?.category?.name})
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm line-clamp-3">
                              {item?.description}
                            </p>

                            {/* Footer: Author Info & Read More */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-2 border-t border-gray-200 mt-2">
                              {/* Author Info */}
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                  <img
                                    className="w-full h-full object-cover"
                                    src={
                                      item?.user?.profile_pic ||
                                      "/assets/images/fallback-user.svg"
                                    }
                                    alt="user"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "/fallback-user.png";
                                    }}
                                  />
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-800 block">
                                    {item?.user?.firstname}{" "}
                                    {item?.user?.lastname}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    2 hours ago
                                  </span>
                                </div>
                              </div>

                              {/* Read More Button */}
                              <Link
                                to={`/stories/${item?._id}`}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition"
                              >
                                Read More
                                <ChevronRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[40vh] bg-white rounded-2xl">
                  <p className="text-gray-500 text-lg">No Stories Found!</p>
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-5/12 space-y-6">
              {!isAuthenticated && (
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
                  <p className="text-gray-600 mb-4">
                    Create an account to share your stories and connect with
                    other writers.
                  </p>
                  <Link to="/signup">
                    <CommonButton styles="w-full text-xl py-3" size="sm">
                      Create Account
                    </CommonButton>
                  </Link>
                </div>
              )}

              {/* Trending Section */}
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                {/* Heading */}
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-gray-700" />
                  <h3 className="text-xl font-bold text-gray-800">Trending</h3>
                </div>

                {/* Trending Stories List */}
                <div className="space-y-2">
                  {React.Children.toArray(
                    stories?.slice(0, 4)?.map((item) => (
                      <Link
                        to={`/stories/${item?._id}`}
                        key={item?._id}
                        className="flex gap-4 p-2 rounded-xl hover:bg-gray-50 transition duration-200"
                      >
                        {/* Optional Thumbnail — Uncomment if needed */}
                        {/* 
          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src={item?.thumbnail || fallbackImage}
              alt={item?.title}
            />
          </div> 
          */}

                        {/* Content */}
                        <div className="flex-1">
                          {/* Title & Category */}
                          <div className="flex justify-between items-start gap-4">
                            <p className="text-base font-semibold text-gray-800 line-clamp-2">
                              {item?.title}
                            </p>
                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                              ({item?.category?.name})
                            </span>
                          </div>

                          {/* Author Info */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100">
                              <img
                                className="w-full h-full object-cover"
                                src={
                                  item?.user?.profile_pic ||
                                  "/assets/images/fallback-user.svg"
                                }
                                alt="Author"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/fallback-user.png";
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {item?.user?.firstname} {item?.user?.lastname}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Recommended Users */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Recommended Users</h3>
                </div>
                <div className="space-y-4">
                  {React.Children.toArray(
                    users?.map((item) => (
                      <div
                        key={item?._id}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src={
                                item?.profile_pic ||
                                "/assets/images/fallback-user.svg"
                              }
                              alt="user"
                              onError={(e) => {
                                e.target.onerror = null; // Prevents infinite loop
                                e.target.src = "/fallback-user.png"; // Secondary fallback
                              }}
                            />
                          </div>
                          <div>
                            <span className="font-semibold block">
                              {item?.firstname} {item?.lastname}
                            </span>
                            {/* <span className="text-sm text-gray-500">
                            {" "}
                            {item?.user?.firstname} {item?.user?.lastname}
                          </span> */}
                          </div>
                        </div>
                        {/* <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition duration-200">
                          Follow
                        </button> */}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateStory
        params={params}
        setParams={setParams}
        handleChange={handleChange}
        open={openCreateStory}
        storyId={storyId}
        fields={fields}
        toggleOpen={toggleStoryModal}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Home;
