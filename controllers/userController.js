const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const {
  constants: { UserRole },
} = require('../config');

// Display detail page for a specific user.
exports.user_profile = function (req, res, next) {
  res.send('NOT IMPLEMENT GET /user/:id' + req.params.id);
};

// Display login form on GET.
exports.login_get = function (req, res, next) {
  res.send('NOT IMPLEMENT GET /user/login');
};

// Display warning page on GET.
exports.warning = function (req, res, next) {
  res.send('NOT IMPLEMENT GET /user/stop');
};

// Handle login form on POST
exports.login_post = function (req, res, next) {
  res.send('NOT IMPLEMENT POST /user/login');
};

// Handle logout on GET.
exports.logout_get = function (req, res, next) {
  res.send('NOT IMPLEMENT GET /user/logout');
};

// Display register form on GET.
exports.register_get = function (req, res, next) {
  res.render('user/register', { title: 'Register', UserRole });
};

// Handle register on POST.
exports.register_post = [
  // Validate fields.
  body('username', 'Username must be at least 3 characters long.')
    .isLength({ min: 3 })
    .trim()
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject('Username already taken. Choose another one.');
      }
    }),
  body('fullname', 'Full name must be at least 3 characters long.')
    .isLength({ min: 3 })
    .trim(),
  body('email', 'Please enter a valid email address.').isEmail().trim(),
  body('role', 'A role must be selected for the user.')
    .isLength({ min: 1 })
    .trim()
    .toInt()
    .isIn(UserRole.map(role => role.value)),
  body('password', 'Password must be between 4-32 characters long.')
    .isLength({ min: 4, max: 32 })
    .trim(),
  body('password_confirm')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  // Sanitize fields with wildcard operator.
  body('*').trim().escape(),
  // Process request after validation and sanitization.
  async function (req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a user object with escaped and trimmed data.
    const user = new User({
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      role: req.body.role,
    });

    if (!errors.isEmpty()) {
      res.render('user/register', {
        title: 'Register',
        user,
        UserRole,
        errors: errors.array(),
      });
    } else {
      user.setPassword(req.body.password);
      await user.save();
      res.redirect('/user/login');
    }
  },
];

// Display update form on GET.
exports.update_get = function (req, res, next) {
  res.send('NOT IMPLEMENT GET /user/update ' + req.params.id);
};
// Handle update on POST.
exports.update_post = function (req, res, next) {
  res.send('NOT IMPLEMENT POST /user/update ' + req.params.id);
};

// Display reset password form on GET.
exports.reset_get = function (req, res, next) {
  res.send('NOT IMPLEMENT get /user/reset ');
};

// Handle reset password on POST (1st step).
exports.reset_post = function (req, res, next) {
  res.send('NOT IMPLEMENT POST 1 /user/reset ');
};
// Handle reset password on POST (2nd step).
exports.reset_post_final = function (req, res, next) {
  res.send('NOT IMPLEMENT  POST 2 /user/reset ');
};

// router.get('/stop', userController.warning);