import multer from "multer"

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            cb(null, "./public/temp");
        },
        filename: function(req, file, cb){
            cb(null, file.originalname);
            // you can modify the file name like Date.now()+'-'+Math.round(Math.random()*1E9)
            // remember that you need to provide the file with the ext .. multer do not add it automatically
        }
    }
)

export const upload = multer({storage:storage})