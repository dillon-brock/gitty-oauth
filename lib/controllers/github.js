const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../services/github');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`);
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;

      const token = await exchangeCodeForToken(code);
      console.log(token);
      const githubProfile = await getGithubProfile(token);
      let user = await GithubUser.findByUsername(githubProfile.login);
      if (!user) {
        user = await GithubUser.insert({
          username: githubProfile.login,
          email: githubProfile.email,
          avatar: githubProfile.avatar_url,
        });
      }

      res.json(user);


    }
    catch (e) {
      next(e);
    }
  });

