const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: [ 'repo' ] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:5173/dashboard')
);

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

module.exports = router;
