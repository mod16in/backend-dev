import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user_model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
    // get details of user from frontend
    // validate the details 
    // check if user already exist - email, username
    // check for required fileds and images - avatar
    // upload on cloudinary 
    // check for cloudinary response and fetch out image_url
    // make a create request on mongodb for user creation
    // remove the password and refresh token filed from response 
    // check the response 
    // if successfull - return success response
    // return error response

    const { fullname, username, password, email } = req.body;
    if([fullname, username, password, email].some((field) => (field == undefined || field?.trim() === "") )){   // ? is chaining operator (skips null or undefined)
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });
    
    if(existedUser){
        // console.log(existedUser);
        // const removeUser = await User.deleteOne({_id: existedUser._id});
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalDirPath = req.files?.avatar[0]?.path;
    const coverImageLocalDirPath = '';
    if(req.files && req.files.coverImage){
        coverImageLocalDirPath = req.files.coverImage[0]?.path;
    }

    if(!avatarLocalDirPath){
        throw new ApiError(400, "Avatar file is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalDirPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalDirPath);    
    if(!avatar){
        throw new ApiError(500, "Server error while file uploading");
    }

    const user = await User.create({
        fullname,
        email, 
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Server error while performing database operation");
    }

    return res.status(201).json(new ApiResponse(201, "User got registered successfully!", createdUser));

});

export { registerUser }
// export like these cannot be imported with other name but those with default export can be named differently while importing