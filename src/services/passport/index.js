import passport from "passport";
import { Schema } from "bodymen";
import { BasicStrategy } from "passport-http";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { jwtSecret, masterKey } from "../../config";
import Login from "../../api/login/model";

export const master = () => passport.authenticate("master", { session: false });

export const token = ({ required, roles = User.roles } = {}) => (
  req,
  res,
  next
) =>
  passport.authenticate("token", { session: false }, (err, user, info) => {
    if (
      err ||
      (required && !user) ||
      (required && !~roles.indexOf(user.role))
    ) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, err => {
      if (err) return res.status(401).end();
      next();
    });
  })(req, res, next);

passport.use(
  "master",
  new BearerStrategy((token, done) => {
    if (token === masterKey) {
      done(null, {});
    } else {
      done(null, false);
    }
  })
);

export const userToken = ({ required } = {}) => (req, res, next) =>
  passport.authenticate("userToken", { session: false }, (err, user, info) => {
    if (err || (required && !user)) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, err => {
      if (err) return res.status(401).end();
      next();
    });
  })(req, res, next);

passport.use(
  "userLoginToken",
  new JwtStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter("access_token"),
        ExtractJwt.fromBodyField("access_token"),
        ExtractJwt.fromAuthHeaderWithScheme("Bearer")
      ])
    },
    ({ encodedParams: { id, type, sessionToken } }, done) => {
      Login.findById(id)
        .then(user => {
          if (user.sessionToken == sessionToken) {
            done(null, user);
            return null;
          } else {
            throw "Invalid";
          }
        })
        .catch(done);
    }
  )
);

passport.use(
  "token",
  new JwtStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter("access_token"),
        ExtractJwt.fromBodyField("access_token"),
        ExtractJwt.fromAuthHeaderWithScheme("Bearer")
      ])
    },
    ({ id }, done) => {
      User.findById(id)
        .then(user => {
          done(null, user);
          return null;
        })
        .catch(done);
    }
  )
);
