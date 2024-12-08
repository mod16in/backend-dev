const asyncHandler = (reqHandler)=>{
    //err is not required .. err is only required when we deal with error handler middl. (1 err handler middleware for entire project)
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).catch((error)=>{
            next(error);
        })
    }
}


// const asyncHandler = (reqHandler) => async(req, res, next) => {
//     try {
//         await reqHandler(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false, 
//             message : error.message
//         })
//     }
// }

export {asyncHandler}