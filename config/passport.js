import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import User from '../models/User';

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://provider.com/oauth2/authorize',
    tokenURL: 'https://provider.com/oauth2/token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
},
    async function (accessToken, refreshToken, profile, cb) {
        let user = await User.findOne({ oauthId: profile.id });
        if (!user) {
            user = new User({ oauthId: profile.id, accessToken, refreshToken });
            await user.save();
        } else {
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            await user.save();
        }
        return cb(null, user);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
    const user = await User.findById(id);
    cb(null, user);
});

export default passport;
