const ErrorHandler = require("../middleware/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/usermodel.js");
const sendToken = require("../middleware/jwtToken");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phoneNo } = req.body;
  const user = await User.create({
    name,
    email,
    phoneNo,
    password,
  });

  sendToken(user, 201, res);
});

// Login User

exports.loginUser = catchAsyncErrors(async (req, res, next)  => {
   const {email, password} = req.body;

   if(!email || !password) {
      next(new ErrorHandler("Please enter Email & Password", 400));
   }

   const user = await User.findOne({email}).select("+password");

   if(!user) {
      return next(new ErrorHandler("Invalid Email or Password", 401))
   }

   const isPasswordMatched = await user.comparePassword(password);

   if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
})

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
   
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
  
});

// Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {
   res.cookie("token", null, {
     expires: new Date(Date.now()),
     httpOnly: true,
   });
 
   res.status(200).json({
     success: true,
     message: "Logged Out",
   });
 });
