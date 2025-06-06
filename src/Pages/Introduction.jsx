import React, { useContext, useState } from "react";
import CommonButton from "../Components/Common/CommonButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "../Components/Common/TextInput";
import UserContext from "../Context/userContext";

const storyCategories = [
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

const Introduction = () => {
  const { stories } = useSelector((state) => state.stories);
  const {
    auth: { user, isAuthenticated },
  } = useContext(UserContext);

  const [email, setEmail] = useState("");

  return (
    <div className="divide-y-2">
      <section className="default_section bg-black text-white ">
        <div className="w-11/12 m-auto space-y-6">
          {/* <img className="h-[50vh] m-auto" src={welcome} alt="hero_logo" /> */}

          <h4 className="text-center w-full">
            Hey {user?.firstname}, Welcome to Kahani.com !
          </h4>
          <p className="title2 text-center w-full">A Home for Every Story.</p>
        </div>
      </section>

      <section className="default_section   text-black ">
        <div className=" space-y-4 w-11/12 m-auto">
          {/* <img className="h-[45vh] m-auto" src={expressive} alt="hero_logo" /> */}

          <div>
            <h2 className="text-center w-full">Start writing your story..</h2>
          </div>
          {!isAuthenticated ? (
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
              storyCategories.map((item, index) => {
                return (
                  <Link
                    to={`/stories?tab=${index}`}
                    className="p-4 body3 lg:body1  text-center"
                  >
                    {item}
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
          <div className=" grid gtid-cols-1 lg:grid-cols-4 gap-6">
            {React.Children.toArray(
              stories?.map(({ title, description, user }) => {
                return (
                  <div className="   rounded-lg shadow-sameshadow">
                    <div className="h-44  w-full relative">
                      <div className="absolute left-4 top-4 flex gap-1 z-10 bg-white rounded-full body4 shadow-inner px-2 items-center py-1">
                        {/* <div className="w-6 h-6 rounded-full overflow-hidden">
                          <img
                            className="object-cover w-full h-full"
                            src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt=""
                          />{" "}
                        </div> */}
                        <span>
                          {user?.firstname} {user?.lastname}
                        </span>
                      </div>
                      {/* <img
                        className="rounded-tl-lg rounded-tr-lg grayscale  w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1735657061774-a9d62d06c954?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      /> */}
                    </div>

                    <div className="p-4 space-y-2">
                      <p className="body1b">{title}</p>
                      <div className="body4 h-10 text-ellipsis overflow-hidden ">
                        <p className="line-clamp-2">{description}</p>
                      </div>

                      <Link className="block underline  body4b" to="/">
                        Read More..
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
            {/* <img className=" m-auto" src={hero_logo} alt="hero_logo" /> */}
          </div>

          <Link to="/stories" className="block  w-fit">
            <CommonButton styles="w-fit text-md" size="md">
              Read All Stories
            </CommonButton>
          </Link>
        </div>
      </section>

      <section className="  bg-black text-white default_section">
        <div>
          {/* <img className=" h-[50vh]" src={notification} alt="notification" /> */}
        </div>
        <div className="w-11/12 m-auto lg:w-auto">
          <div className=" space-y-2">
            <p className="title2">Subscribe</p>

            <p className="body2">
              Subscribe to our newsletter and get upto 40% off on our exclusive
              service.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribe to our newsletter");
              }}
              className="space-y-6"
            >
              <TextInput
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
