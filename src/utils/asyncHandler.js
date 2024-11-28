const asyncHandler = (reqHandler)=>{
    (err, req, res, next) => {
        Promise.resolve(reqHandler(err, req, res, next)).reject((error)=>{
            next(error);
        })
    }
}


// const asyncHandler = (reqHandler) => async(err, req, res, next) => {
//     try {
//         await reqHandler(err, req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false, 
//             message : error.message
//         })
//     }
// }

export {asyncHandler}