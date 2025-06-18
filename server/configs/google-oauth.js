const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const User = require("../models/user.model");
const crypto = require("crypto");

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const google_callback_url = process.env.GOOGLE_CALLBACK_URL;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: google_callback_url,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const email = profile?.emails[0]?.value;
        let user = await User.findOne({ email }).exec();

        if (!user) {
          const randomPassword = crypto.randomBytes(16).toString("hex");

          const newUser = new User({
            firstname: profile?.name?.givenName || "Google",
            lastname: profile?.name?.familyName || "User",
            email: email,
            password: randomPassword,
            profile_pic: profile?.photos?.[0]?.value || "",
          });

          user = await newUser.save();
        }

        return cb(null, user);
      } catch (err) {
        console.error("Google Strategy Error:", err);
        return cb(err, null);
      }
    }
  )
);

module.exports = passport;
