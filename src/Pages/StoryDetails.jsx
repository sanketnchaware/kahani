import React, { useCallback, useContext, useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import moment from "moment/moment";
import LoaderContext from "../Context/loaderContext";

const StoryDetails = () => {
  const { id } = useParams();

  const [story, setStory] = useState({});
  const { setLoading } = useContext(LoaderContext);

  console.log("story:", story);

  const getStoryById = useCallback(() => {
    if (!id) return;
    setLoading(true);

    axiosInstance
      .get(`/stories/${id}`)
      .then((response) => {
        setStory(response.data.story);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    getStoryById();
  }, [getStoryById]);

  return (
    <div className="min-h-screen bg-amber-50 pt-24 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl border-2 border-amber-200">
        <div className="p-8">
          {/* Decorative Header */}
          <div className="border-b-2 border-amber-200 pb-6 mb-6">
            <h1 className="text-4xl font-serif text-center text-amber-900 mb-4">
              {story?.title}
            </h1>

            {/* Author and Date Info */}
            <div className="flex justify-center items-center gap-6 text-amber-700">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="font-medium">
                  {story?.user?.firstname} {story?.user?.lastname}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{moment(story?.createdAt).format("DD-MM-YYYY")}</span>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="prose max-w-none">
            <div className="font-serif text-lg leading-relaxed text-gray-800 whitespace-pre-line">
              {story?.description}
            </div>
          </div>

          {/* Decorative Footer */}
          <div className="mt-8 pt-6 border-t-2 border-amber-200">
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-amber-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
