import React, { useContext, useEffect, useState } from "react";
import CommonButton from "../Components/Common/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "../Components/Common/TextInput";
import UserContext from "../Context/userContext";
import { showToastMessage } from "../utils/helpers";
import axiosInstance from "../utils/axiosInstance";

const Introduction = () => {
  const { stories } = useSelector((state) => state.stories);
  const { user, token } = useContext(UserContext);

  const { categories } = useSelector((state) => state.dropdown);
  console.log("categories:", categories);

  const [email, setEmail] = useState("");

  const SubscribeNewsletter = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post(`/subcribe`, { email })
      .then((response) => {
        console.log("response:", response);
        showToastMessage(response?.data?.message, "success");
        setEmail("");
      })
      .catch((error) => {
        showToastMessage(error?.response?.data?.message, "error");
      });
  };

  return (
    <div className="divide-y-2">
      <section className="flex justify-between gap-4 lg:flex-row flex-col-reverse items-center default_section bg-black text-white">
        <div className="w-11/12 lg:w-7/12 space-y-6">
          <h2 className="text-center lg:text-start ">
            Hey {user?.firstname}! Ready to Share Your Story?
          </h2>
          <p className="title3 text-center lg:text-start text-gray-300">
            Discover, read, and write stories that touch the heart.
            <span className="text-yellow-400 font-semibold"> Kahani </span>is
            your space to create, connect, and inspire.
          </p>
        </div>

        <div className=" w-6/12 lg:w-4/12  ">
          <img
            src="/assets/images/book-writer.svg"
            alt="hero_image"
            className="w-full h-auto grayscale contrast-125"
          />
        </div>
      </section>

      <section className="default_section   text-black ">
        <div className=" space-y-6 w-11/12 m-auto">
          {/* <img className="h-[45vh] m-auto" src={expressive} alt="hero_logo" /> */}
          <h2 className="text-center w-full">Start writing your story..</h2>{" "}
          <p className="title4 text-center  text-gray-400">
            Start your journey today — because every story deserves to be heard.
          </p>
          {!token ? (
            <Link to="/signup" className="flex justify-center   w-full">
              <CommonButton styles="w-fit " size="md">
                Create Account
              </CommonButton>
            </Link>
          ) : (
            <Link to="/profile" className="flex justify-center   w-full">
              <CommonButton styles="w-fit " size="md">
                Add Story
              </CommonButton>
            </Link>
          )}
        </div>
      </section>

      <section className="default_section  bg-black text-white">
        <div className="space-y-5 w-11/12 m-auto lg:space-y-20">
          <h4 className=" text-center w-full">Read by Categories</h4>

          <div className="grid lg:grid-cols-4 grid-cols-2 w-full items-center h-full">
            {React.Children.toArray(
              categories?.map((item) => {
                return (
                  <Link
                    to={`/stories?cat=${item?.slug}`}
                    className="p-4 body3 lg:body1  text-center"
                  >
                    {item?.name}
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="default_section py-24">
        <div className="space-y-8 w-11/12 m-auto">
          <h4 className="">Best Stories For Today</h4>
          <div className=" grid gtid-cols-1 lg:grid-cols-3 gap-6">
            {React.Children.toArray(
              stories
                ?.slice(0, 8)
                ?.map(({ title, category, description, user, _id, index }) => {
                  return (
                    <div className="rounded-lg shadow-sameshadow hover:shadow-lg transition-shadow duration-300 bg-white">
                      <div className="p-4 space-y-3">
                        {/* Story Title */}
                        <div className="flex justify-between items-center">
                          <h3 className="body2b text-lg font-semibold text-gray-800">
                            {title}{" "}
                          </h3>
                          <p className="text-xs">( {category?.name} )</p>
                        </div>

                        {/* Short Description */}
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {description}
                        </p>

                        {/* Author & Read More */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-2">
                          <span className="text-xs text-gray-500 font-medium">
                            By {user?.firstname} {user?.lastname}
                          </span>

                          <Link
                            to={`/stories/${_id}`}
                            className="text-xs font-semibold text-primary hover:underline transition-all"
                          >
                            Read full story →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
            {/* <img className=" m-auto" src={hero_logo} alt="hero_logo" /> */}
          </div>

          <div className="flex justify-end items-center">
            <Link to="/stories" className="block  w-fit">
              <CommonButton styles="w-fit text-md" size="md">
                Read All Stories
              </CommonButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="  bg-black text-white default_section">
        <div>
          {/* <img className=" h-[50vh]" src={notification} alt="notification" /> */}
        </div>
        <div className="w-11/12 m-auto lg:w-auto">
          <div className=" space-y-2">
            <p className="title2"> Stay in the Loop!</p>

            <p className="body2">
              Subscribe to our newsletter and be the first to know about new
              stories, platform updates, and exclusive content from Kahani.
            </p>
            <form onSubmit={SubscribeNewsletter} className="space-y-6">
              <TextInput
                required={true}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                placeholder="Enter Your Email"
                type="email"
                className="mt-8 invert"
                // error=""
              />
              <div className="flex justify-end">
                <CommonButton type="submit" styles="w-fit invert" size="sm">
                  Subscribe
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
