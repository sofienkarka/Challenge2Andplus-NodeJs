const user=require('../routes/User')
const BearerStrategy=require('passport-http-bearer').Strategy
const passport=require('passport')
const jwt=require('jsonwebtoken')
const Users=require('../Schemas/User')

passport.use(new BearerStrategy(async(token, done)=> {
        const tokendata=await jwt.verify(token,'secret');
      Users.findOne({ _id: tokendata.id }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));