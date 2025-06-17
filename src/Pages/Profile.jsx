import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import moment from "moment";
import axios from "axios";
import { Edit } from "lucide-react";

import axiosInstance from "../utils/axiosInstance";
import { showToastMessage } from "../utils/helpers";
import { fetchStories } from "../features/stories";

import CreateStory from "../Components/Modals/CreateStory";
import CommonButton from "../Components/Common/CommonButton";

import UserContext from "../Context/userContext";
import LoaderContext from "../Context/loaderContext";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  gsap.registerPlugin(ScrollTrigger);

  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const { user, token, login } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoaderContext);
  const { stories } = useSelector((state) => state.stories);

  const [editing, setEditing] = useState(false);
  const [storyId, setStoryId] = useState("");
  const [userStories, setUserStories] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const defaultFields = { title: "", description: "", tags: [], category: "" };
  const [params, setParams] = useState(defaultFields);
  const [errors, setErrors] = useState(defaultFields);

  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const mainRef = useRef(null);

  useEffect(() => {
    if (!token) navigate("/login");
    if (user?._id) {
      fetchUserStories();
      setFormData({
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        phone: user?.phone || "",
      });
    }
  }, [token, user?._id]);

  const fetchUserStories = () => {
    setLoading(true);
    axiosInstance
      .get(`/stories/user/${user?._id}`)
      .then((res) => setUserStories(res.data.stories))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleProfileChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/users/${user?._id}`, formData);
      login(res.data.data);
      showToastMessage("Profile Updated Successfully!", "success");
      setEditing(false);
    } catch (err) {
      showToastMessage(
        err?.response?.data?.message || "Update failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "kahani_images");

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        uploadData
      );

      const res = await axiosInstance.put(`/users/${user?._id}`, {
        profile_pic: data.secure_url,
      });

      login(res.data.data);
      showToastMessage("Profile picture updated!", "success");
    } catch (err) {
      showToastMessage("Failed to upload profile picture", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteStory = (id) => {
    setLoading(true);
    axiosInstance
      .delete(`/stories/${id}`)
      .then(() => {
        fetchUserStories();
        dispatch(fetchStories());
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const handleStorySubmit = (e) => {
    e.preventDefault();
    const payload = { ...params, user: user?._id };
    const req = storyId
      ? axiosInstance.put(`/stories/${storyId}`, payload)
      : axiosInstance.post("/stories", payload);

    req
      .then(() => {
        showToastMessage(storyId ? "Story updated" : "Story added", "success");
        setParams(defaultFields);
        setStoryId("");
        setOpenCreateModal(false);
        fetchUserStories();
        dispatch(fetchStories());
      })
      .catch(console.error);
  };

  return (
    <>
      <div
        ref={mainRef}
        className="HomemainContainer mt-12 col-span-12 min-h-screen grid grid-cols-12"
      >
        {/* Left: Recent Stories */}
        <aside className="p-6 shadow-sameshadow space-y-8 lg:col-span-3 col-span-12 lg:order-1 order-3">
          <p className="title4 mt-4">Recent stories:</p>
          {stories?.length ? (
            <div className="space-y-2">
              {stories.slice(0, 4).map((story) => (
                <div
                  key={story._id}
                  className="shadow-sameshadow rounded-xl px-3 py-2"
                >
                  <div className="flex justify-between">
                    <p className="body3">{story.title}</p>
                    <span className="caption px-3">
                      ( {story.category?.name} )
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 h-[40vh] flex items-center justify-center">
              No Stories Found!
            </div>
          )}
        </aside>

        {/* Center: My Stories */}
        <main className="middleContainer p-6 space-y-6 lg:col-span-6 col-span-12 order-2 overflow-y-auto">
          <div className="text-center pt-10 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Share Your Voice with the World 🌍
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Your story could inspire, teach, or comfort someone. Start writing
              and let your words make an impact. ✨
            </p>
            <CommonButton
              onClick={() => setOpenCreateModal(true)}
              size="sm"
              variant="secondary"
              className="transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              ✍️ Write More Stories
            </CommonButton>
          </div>

          {userStories.length ? (
            <div className="space-y-6">
              {React.Children.toArray(
                userStories.map((story, index) => (
                  <div
                    key={story._id}
                    className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-6 space-y-4 border border-gray-100"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {index + 1}. {story.title}
                      </h3>
                      <span className="text-xs bg-purple-100 text-purple-700 font-medium rounded-full px-3 py-1">
                        {story.category?.name}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 font-wendy">
                      {story.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {story.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-gray-400">
                        {moment(story.createdAt).fromNow()}
                      </span>
                      <div className="flex gap-2">
                        <CommonButton
                          onClick={() => {
                            setStoryId(story._id);
                            setOpenCreateModal(true);
                          }}
                          size="sm"
                        >
                          ✏️ Edit
                        </CommonButton>
                        <CommonButton
                          onClick={() => deleteStory(story._id)}
                          loading={loading}
                          size="sm"
                          variant="secondary"
                        >
                          🗑️ Delete
                        </CommonButton>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <p className="text-center body1  text-gray-500 h-[40vh] flex items-center justify-center italic">
              No Stories Found!
            </p>
          )}
        </main>

        {/* Right: Profile */}
        <aside className="shadow-sameshadow p-6 space-y-6 lg:col-span-3 col-span-12 lg:order-3 order-1">
          <p className="title4 text-center pt-6">My Profile</p>
          <form
            onSubmit={handleProfileUpdate}
            className="space-y-4 flex flex-col items-center"
          >
            <div className="relative w-28 h-28 rounded-full overflow-hidden border group">
              <img
                src={user?.profile_pic}
                alt="User"
                className="w-full h-full object-cover"
              />
              <input
                onChange={handleProfilePicChange}
                type="file"
                id="profile_pic"
                className="hidden"
              />
              <label
                htmlFor="profile_pic"
                className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer"
              >
                <Edit className="w-6 h-6" />
              </label>
            </div>

            <div className="w-full p-4 space-y-4">
              {editing
                ? React.Children.toArray(
                    ["firstname", "lastname", "email", "phone"].map((key) => (
                      <div
                        key={key}
                        className="flex justify-between items-center"
                      >
                        <label className="capitalize">{key}:</label>
                        <input
                          name={key}
                          value={formData[key]}
                          onChange={handleProfileChange}
                          disabled={key === "email"}
                          className={`input border p-1 rounded-md w-1/2 ${
                            key === "email" ? "bg-gray-100 text-gray-400" : ""
                          }`}
                        />
                      </div>
                    ))
                  )
                : React.Children.toArray(
                    [
                      {
                        label: "Name",
                        value: `${user?.firstname} ${user?.lastname}`,
                      },
                      { label: "Email", value: user?.email },
                      { label: "Phone", value: user?.phone },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center"
                      >
                        <p>{label}:</p>
                        <p>{value || "--"}</p>
                      </div>
                    ))
                  )}
            </div>

            {editing ? (
              <div className="flex gap-4">
                <CommonButton type="submit" size="sm">
                  Save
                </CommonButton>
                <CommonButton
                  type="button"
                  onClick={() => setEditing(false)}
                  variant="secondary"
                  size="sm"
                >
                  Cancel
                </CommonButton>
              </div>
            ) : (
              <CommonButton
                type="button"
                onClick={() => setEditing(true)}
                variant="secondary"
                size="sm"
              >
                Edit Profile
              </CommonButton>
            )}
          </form>
        </aside>
      </div>

      {/* Create/Edit Story Modal */}
      <CreateStory
        params={params}
        errors={errors}
        setParams={setParams}
        handleChange={handleStoryChange}
        open={openCreateModal}
        storyId={storyId}
        fields={defaultFields}
        GetStoriesByUserId={fetchUserStories}
        toggleOpen={() => {
          setOpenCreateModal((prev) => !prev);
          if (storyId) setStoryId("");
        }}
        handleSubmit={handleStorySubmit}
      />
    </>
  );
};

export default Profile;
