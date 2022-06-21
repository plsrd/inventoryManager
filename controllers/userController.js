const { body, validationResult } = require('express-validator');

const admin = {
  name: 'admin',
  password: 'admin',
};

exports.user_form_get = (req, res, next) => {
  res.render('user_form', { title: 'Sign in', errors: [] });
};

exports.user_form_post = [
  body('name', 'User name is incorrect').escape().equals(admin.name),
  body('password', 'Password is incorrect').escape().equals(admin.password),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('user_form', {
        title: 'Sign in',
        errors: errors.array(),
        user: { name: req.body.name, password: req.body.password },
      });
    }
  },
];
