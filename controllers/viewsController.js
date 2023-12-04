const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverView = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Build template
  // 3) Render that template using tour data from 1)

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' http://127.0.0.1:8000 ws:;"
    )
    .render('overview', {
      title: 'All Tours',
      tours
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  // 2) Build template

  // 3) Render template using data from 1)

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com http://127.0.0.1:8000 ws:;"
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour
    });
});

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' http://127.0.0.1:8000 ws:;"
    )
    .render('login', {
      title: 'Log into your account'
    });
};

exports.getAccount = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' http://127.0.0.1:8000 ws:;"
    )
    .render('account', {
      title: 'Your account'
    });
};

// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email
//     },
//     {
//       new: true,
//       runValidators: true
//     }
//   );

//   res
//     .status(200)
//     .set(
//       'Content-Security-Policy',
//       "connect-src 'self' http://127.0.0.1:8000 ws:;"
//     )
//     .render('account', {
//       title: 'Your account',
//       user: updatedUser
//     });
// });
