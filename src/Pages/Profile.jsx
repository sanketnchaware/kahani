import React, { useContext, useEffect, useRef, useState } from "react";
import CreateStory from "../Components/Modals/CreateStory";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import axiosInstance from "../utils/axiosInstance";

import { showToastMessage } from "../utils/helpers";
import CommonButton from "../Components/Common/CommonButton";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../features/stories";
import LoaderContext from "../Context/loaderContext";
import { Edit } from "lucide-react";

import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const dispatch = useDispatch();
  gsap.registerPlugin(ScrollTrigger);

  const {
    auth: { user },
    auth,
    setAuth,
  } = useContext(UserContext);
  console.log("user:", user);

  const { loading, setLoading } = useContext(LoaderContext);

  const token = localStorage.getItem("authToken");

  const [openCreateStory, setCreateOpenStory] = useState();

  const { stories } = useSelector((state) => state.stories);

  const [storiesById, setStoriesById] = useState([]);
  console.log("storiesById:", storiesById);
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

  const handleProfilePicChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kahani_images");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      await axiosInstance
        .put(`/users/${user?._id}`, {
          profile_pic: res.data.secure_url,
        })
        .then((response) => {
          setAuth({ ...auth, user: response.data.data });
          console.log("response:", response);
        })
        .catch((error) => {
          console.log("error:", error);
        });

      // OPTIONAL: send `res.data.secure_url` to your backend API to store in DB
      // await axios.post('/api/save-image-url', { url: res.data.secure_url });
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  const main = useRef(null);

  function GetStoriesByUserId() {
    setLoading(true);
    axiosInstance
      .get(`/stories/user/${user?._id}`)
      .then((res) => {
        setStoriesById(res.data.stories);
      })
      .catch((err) => {
        "err:", err;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function deleteStory(id) {
    setLoading(true);
    axiosInstance
      .delete(`/stories/${id}`)
      .then((res) => {
        "Story deleted successfully:", res;
        GetStoriesByUserId();
        dispatch(fetchStories());
      })
      .catch((err) => {
        "Error deleting story:", err;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiCall = storyId
      ? axiosInstance.put(`/stories/${storyId}`, { ...params, user: user?.id })
      : axiosInstance.post("/stories", { ...params, user: user?.id });

    apiCall
      .then(() => {
        showToastMessage(
          storyId ? "Story updated successfully" : "Story added successfully",
          "success"
        );
        setParams(fields);
        toggleStoryModal();
        dispatch(fetchStories());
        GetStoriesByUserId();
        if (storyId) SetStoryId("");
      })
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    if (user?._id) GetStoriesByUserId();
  }, [user?._id]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <div
        ref={main}
        className="HomemainContainer mt-12 col-span-12 min-h-screen grid grid-cols-12"
      >
        <section className="p-6 lg:sticky top-12 lg:min-h-screen  leftcontainer shadow-sameshadow space-y-8 lg:col-span-3 col-span-12 lg:order-1 order-3">
          <p className="title4 mt-4">Recent stories:</p>
          {stories?.length > 0 ? (
            <div className=" space-y-2">
              {React.Children.toArray(
                stories?.map((item, index) => (
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
                ))
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-[40vh]">
              No Stories Found!
            </div>
          )}
        </section>

        <section className="middleContainer w-full space-y-6 p-6 lg:col-span-6 col-span-12 h-full order-2 lg:order-2 overflow-y-auto ">
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
                {React.Children.toArray(
                  storiesById?.map((item, index) => (
                    <div
                      key={item.id}
                      className="space-y-4 shadow-sameshadow text-black rounded-xl p-4"
                    >
                      <div className="flex justify-between">
                        <p className="body2b">
                          {index + 1}. <span className="">{item?.title}</span>
                        </p>

                        <p className="bg-gray-200 flex items-center caption  rounded-full px-3 ">
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
                          loading={loading}
                          onClick={() => deleteStory(item?._id)}
                          styles="w-fit text-xs"
                          size="sm"
                          variant="secondary"
                        >
                          Delete
                        </CommonButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-[40vh]">
                No Stories Found!
              </div>
            )
          )}
        </section>

        <section className="shadow-sameshadow   rightcontainer p-6 space-y-6 lg:col-span-3 lg:order-3 order-1 lg:sticky col-span-12  top-12 lg:min-h-screen">
          <p className="title4 text-center w-full pt-6 ">My profile</p>
          <form
            action=""
            className="  h-full w-full flex  flex-col items-center "
          >
            {" "}
            <div className="mt-4 w-28 h-28 relative rounded-full border overflow-hidden group">
              <img
                className="w-full h-full object-cover"
                src={user?.profile_pic || "/assets/images/fallback-user.svg"}
                alt="user"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-user.png";
                }}
              />

              <input
                onChange={handleProfilePicChange}
                className="hidden"
                type="file"
                name="profile_pic"
                id="profile_pic"
              />

              {/* Edit overlay */}
              <label
                htmlFor="profile_pic"
                className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity"
              >
                <Edit className="w-6 h-6" />
              </label>
            </div>
            <p className="body2 mt-4 text-center w-full ">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="body4b">{user?.email}</p>
            <p className="body4b">{user?.phone}</p>
          </form>
        </section>
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
