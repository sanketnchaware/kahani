const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "54626992206-slpt5jfr4i1cn9n7ije2nukbvpav7ecq.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/auth/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
