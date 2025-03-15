import React, { useEffect, useState } from "react";
import { X, Hash, BookOpen, Tag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { showToastMessage } from "../../utils/helpers";
import CommonButton from "../Common/CommonButton";
import SelectDropdown from "../Common/SelectDropdown";
import TextInput from "../Common/TextInput";
import { fetchCategoryDropdown } from "../../features/dropdown";

const CreateStory = ({
  open,
  toggleOpen,
  storyId,
  fields,
  params,
  setParams,
  handleChange,
  handleSubmit,
  errors,
}) => {
  const [tag, setTag] = useState("");
  const { categories } = useSelector((state) => state.dropdown);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryDropdown());
  }, []);

  const handleTagChange = (e) => {
    const input = e.target.value;
    if (input.includes(",")) {
      let newTag = input.replace(",", "").trim();
      newTag = newTag.startsWith("#") ? newTag.slice(1) : newTag;

      if (params.tags.includes(newTag)) {
        showToastMessage("Tag already exists", "error");
      } else if (newTag) {
        setParams({ ...params, tags: [...params.tags, newTag] });
      }
      setTag("");
    } else {
      setTag(input);
    }
  };

  const getStoryByID = () => {
    axiosInstance
      .get(`/stories/${storyId}`)
      .then((res) => {
        setParams({
          ...params,
          title: res?.data?.story?.title,
          description: res?.data?.story?.description,
          tags: res?.data?.story?.tags,
          category: res?.data?.story?.category?._id,
        });
      })
      .catch((err) => ("err:", err));
  };

  useEffect(() => {
    storyId && open && getStoryByID();
  }, [storyId]);

  const removeTag = (tagToRemove) => {
    setParams({
      ...params,
      tags: params.tags.filter((t) => t !== tagToRemove),
    });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ${
        open ? "opacity-100 z-50" : "opacity-0 -z-10"
      }`}
      onClick={(e) => e.target === e.currentTarget && toggleOpen()}
    >
      {open && (
        <div className="bg-white  rounded-2xl shadow-xl w-11/12 max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                <h2 className="text-2xl font-bold">
                  {storyId ? "Edit" : "Write"} Your Story
                </h2>
              </div>
              <button
                onClick={() => {
                  setParams(fields);
                  toggleOpen();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="px-2 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)] ">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <TextInput
                  type="text"
                  name="title"
                  placeholder="Enter an engaging title for your story..."
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  value={params?.title}
                  onChange={handleChange}
                  error={errors?.title}
                />
              </div>

              {/* Story Content */}
              <div className="space-y-2 ">
                <label className="block text-sm font-medium text-gray-700">
                  Story Content
                </label>
                <textarea
                  required
                  className="w-full text-black h-64 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 resize-none"
                  placeholder="Write your interesting story and attract people towards you..."
                  name="description"
                  value={params?.description}
                  onChange={handleChange}
                />
              </div>

              {/* Tags and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="tag"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                      placeholder="Add tags (comma separated)"
                      value={tag}
                      onChange={handleTagChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <SelectDropdown
                    showvalue="_id"
                    name="category"
                    value={params.category}
                    onChange={handleChange}
                    options={categories}
                    placeholder="Choose category"
                    error={errors?.category}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              {/* Tags Display */}
              {params?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {params.tags.filter(isNaN).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Tag className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">#{item}</span>
                      <button
                        onClick={() => removeTag(item)}
                        className="hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end items-center gap-4 mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  setParams(fields);
                  toggleOpen();
                }}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <CommonButton
                size="lg"
                onClick={handleSubmit}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {storyId ? "Update" : "Post"} Story
              </CommonButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStory;
