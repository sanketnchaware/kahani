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

const Home = () => {
  const { stories } = useSelector((state) => state.stories);

  const { users } = useSelector((state) => state.users);

  const {
    auth: { user, isAuthenticated },
  } = useContext(UserContext);

  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const categoryindex = +query.get("tab");

  const { setLoading } = useContext(LoaderContext);

  const dispatch = useDispatch();

  const main = useRef(null);

  const tabOptions = [
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Historical Fiction",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "Western",
    "Dystopian",
    "Magical Realism",
    "Realist",
    "Satire",
    "Tragedy",
    "Mythology",
    "Folklore",
    "Fairy Tale",
    "Parable",
  ];

  const filteredStories = stories.filter(
    (item) => item?.category?.name === tabOptions[categoryindex]
  );

  const [openCreateStory, setCreateOpenStory] = useState(false);

  const [storyId, SetStoryId] = useState("");

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
                    placeholder="Search stories..."
                    type="text"
                    className="w-full text-black pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <CommonTabs
                categoryindex={categoryindex}
                tabOptions={tabOptions}
              />

              {/* Stories List */}
              {filteredStories?.length > 0 ? (
                <div className="space-y-6">
                  {React.Children.toArray(
                    filteredStories.map((item) => (
                      <div
                        key={item?.id}
                        className="w-full   bg-white  p-2 lg:p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* <div className="">
                          <div className="h-40 aspect-video w-40 rounded-xl overflow-hidden">
                            <img
                              className="w-full h-full object-cover hover:scale-105 transition duration-200"
                              src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt={item?.title}
                            />
                          </div>
                        </div> */}
                          <div className="w-full space-y-3">
                            <div className="flex justify-between items-center w-full">
                              <h2 className="text-xl font-bold hover:text-gray-700">
                                {item?.title}
                              </h2>

                              <p className="text-gray-600 title5 font-bold line-clamp-3">
                                ({item?.category?.name})
                              </p>
                            </div>
                            <p className="text-gray-600 line-clamp-3">
                              {item?.description}
                            </p>
                            <div className="flex lg:gap-0 gap-4  lg:flex-row flex-col justify-between lg:items-center pt-2">
                              <div className="flex items-center gap-3">
                                <img
                                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                  src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                                  alt="author"
                                />
                                <div>
                                  <span className="font-semibold block">
                                    {item?.user?.firstname}{" "}
                                    {item?.user?.lastname}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    2 hours ago
                                  </span>
                                </div>
                              </div>
                              <Link
                                to={`/stories/${item?._id}`}
                                className="flex lg:justify-center justify-end  items-center gap-2 px-0 lg:px-4 py-2 bg-transparent lg:bg-black text-black lg:text-white rounded-lg hover:bg-gray-800 transition duration-200"
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
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Trending</h3>
                </div>
                <div className="space-y-4">
                  {React.Children.toArray(
                    stories?.map((item) => (
                      <Link
                        to={`/stories/${item?._id}`}
                        key={item?.id}
                        className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition duration-200 cursor-pointer"
                      >
                        {/* <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt={item?.title}
                        />
                      </div> */}
                        <div className="w-full ">
                          <div className=" gap-4 flex items-center justify-between">
                            <p className="title5 font-semibold line-clamp-2">
                              {item?.title}
                            </p>
                            <p className="title5 font-semibold line-clamp-2">
                              ({item?.category?.name})
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt="author"
                            />
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
                        key={item?.id}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="user"
                          />
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
                        <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition duration-200">
                          Follow
                        </button>
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
