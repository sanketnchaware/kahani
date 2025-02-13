import React, { useContext, useEffect, useRef, useState } from "react";
import CreateStory from "../Components/Modals/CreateStory";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import axiosInstance from "../utils/axiosInstance";
import cross from "../assets/icons/cross.svg";
import Loading from "../Components/Loading/Loading";
import { showToastMessage } from "../utils/helpers";
import CommonButton from "../Components/Common/CommonButton";
import { useNavigate } from "react-router-dom";
import UserContext from "../userContext/userContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../features/stories";
const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  gsap.registerPlugin(ScrollTrigger);

  const {
    auth: { user },
  } = useContext(UserContext);

  const token = localStorage.getItem("authToken");

  const [openCreateStory, setCreateOpenStory] = useState();
  const [loading, setLoading] = useState(false);

  const { stories } = useSelector((state) => state.stories);

  const [storiesById, setStoriesById] = useState([]);
  const [storyId, SetStoryId] = useState("");

  const toggleStoryModal = () => {
    setCreateOpenStory(!openCreateStory);
  };

  const fields = {
    title: "",
    description: "",
    tags: [],
    category: "",
  };

  const [params, setParams] = useState(fields);

  const [errors, setErrors] = useState(fields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const main = useRef(null);

  function GetStoriesByUserId() {
    setLoading(true);
    axiosInstance
      .get(`/stories/user/${user?.id}`)
      .then((res) => {
        setStoriesById(res.data.stories);
      })
      .catch((err) => {
        console.log("err:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function deleteStory(id) {
    console.log("Sending DELETE request for story ID:", id); // Debug log
    axiosInstance
      .delete(`/stories/${id}`)
      .then((res) => {
        console.log("Story deleted successfully:", res);
        GetStoriesByUserId();
        dispatch(fetchStories());
      })
      .catch((err) => {
        console.log("Error deleting story:", err);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    storyId
      ? axiosInstance
          .put(`/stories/${storyId}`, { ...params, user: user?.id })
          .then((res) => {
            GetStoriesByUserId();
            SetStoryId("");
            setParams(fields);
            toggleStoryModal();
            showToastMessage("Story updated successfully", "success");
            dispatch(fetchStories());
          })
          .catch((err) => {
            console.log("err:", err);
          })
          .finally(() => {})
      : axiosInstance
          .post("/stories", { ...params, user: user?.id })
          .then((res) => {
            toggleStoryModal();
            setParams(fields);
            showToastMessage("Story Added successfully", "success");
            dispatch(fetchStories());
            GetStoriesByUserId();
          })
          .catch((err) => {
            console.log("err:", err);
          })
          .finally(() => {});
  };

  useEffect(() => {
    if (user?.id) GetStoriesByUserId();
  }, [user?.id]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  if (loading) {
    return <Loading />;
  } else
    return (
      <>
        <div
          ref={main}
          className="HomemainContainer mt-12 col-span-12 min-h-screen grid grid-cols-12"
        >
          <div className="p-6 sticky top-12 h-screen lg:block hidden leftcontainer shadow-sameshadow space-y-8 col-span-3">
            <p className="title4 mt-4">Recent stories:</p>
            {React.Children.toArray(
              stories?.length > 0 ? (
                <div className=" space-y-2">
                  {stories?.map((item, index) => (
                    <div
                      key={item.id}
                      className="space-y-2 shadow-sameshadow text-black rounded-xl px-3 py-2"
                    >
                      <div className="flex justify-between">
                        <p className="body3b">
                          <span className="">{item?.title}</span>
                        </p>
                        <p className=" flex items-center caption  px-3 ">
                          ( {item?.category?.name} )
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-[40vh]">
                  No Stories Found!
                </div>
              )
            )}
          </div>
          <div className="middleContainer w-full space-y-6 p-6 lg:col-span-6 col-span-12 h-full overflow-y-auto">
            <div className="w-full space-y-6 pt-6">
              <div className="flex items-center justify-center gap-4">
                <CommonButton
                  onClick={toggleStoryModal}
                  styles="w-fit text-sm"
                  size="sm"
                  variant="secondary"
                >
                  Write More Stories
                </CommonButton>
              </div>
            </div>

            {React.Children.toArray(
              storiesById?.length > 0 ? (
                <div className=" space-y-6">
                  {storiesById?.map((item, index) => (
                    <div
                      key={item.id}
                      className="space-y-4 shadow-sameshadow text-black rounded-xl p-4"
                    >
                      <div className="flex justify-between">
                        <p className="body2b">
                          {index + 1}. <span className="">{item?.title}</span>
                        </p>

                        <p className="bg-red-400 flex items-center caption  rounded-full px-3 ">
                          {item?.category?.name}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <p className="body3 font-wendy">{item?.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {item?.tags?.map((tag, tagIndex) => (
                            <div
                              key={tagIndex}
                              className="bg-gray-200 body3b rounded-xl text-black px-3 py-1"
                            >
                              #{tag}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="justify-end gap-4  flex">
                        <button
                          className="contained_button"
                          onClick={() => {
                            SetStoryId(item?._id);
                            toggleStoryModal();
                          }}
                        >
                          Edit
                        </button>
                        <CommonButton
                          onClick={() => deleteStory(item?._id)}
                          styles="w-fit text-xs"
                          size="sm"
                          variant="secondary"
                        >
                          Delete
                        </CommonButton>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-[40vh]">
                  No Stories Found!
                </div>
              )
            )}
          </div>
          <div className="shadow-sameshadow  lg:block hidden rightcontainer p-6 space-y-6 col-span-3 sticky   top-12 h-screen">
            <p className="title4 text-center w-full pt-6 ">My profile</p>
            <div className="  h-full w-full flex  flex-col items-center ">
              <div className="mt-4 w-28 h-28 rounded-full   overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
              </div>
              <p className="body2 mt-4 text-center w-full ">
                {user?.firstname} {user?.lastname}
              </p>
              <p className="body4b">{user?.email}</p>
              <p className="body4b">{user?.phone}</p>
            </div>
          </div>
        </div>

        <CreateStory
          params={params}
          errors={errors}
          setParams={setParams}
          handleChange={handleChange}
          open={openCreateStory}
          storyId={storyId}
          fields={fields}
          GetStoriesByUserId={GetStoriesByUserId}
          toggleOpen={toggleStoryModal}
          handleSubmit={handleSubmit}
        />
      </>
    );
};

export default Profile;
