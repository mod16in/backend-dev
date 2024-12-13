import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required: ['true', 'Avatar is required.']
        },
        coverImage: {
            type: String
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
        password: {
            type: String, 
            required: [true, 'Password is required.']
        },
        is_deleted: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        },
        refresh_token: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
);


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();

    /*i could have separately generated the salt using bcrypt.genSalt(rounds) and then hashed it with the salt like----
    bcrypt.genSalt(10, function(err, salt){
        if(err) throw err;
        bcrypt.hash(this.password, salt, function(err, hashedPass){
            if(err)throw err;
            this.password = hashedPass;
        })
    })*/
})
userSchema.methods.isPasswordCorrect = async function (pass) {
    return await bcrypt.compare(pass, this.password);       // this returns true or false
}


userSchema.methods.generateAccessToken = function() {
    // jwt(payload, secretkey, expiry)
    return jwt(
        {
            _id: this._id,
            email: this.email, 
            username: this.username, 
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function() {
    // in refresh tokens we do not pass much of the info
    return jwt(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);
//  this is for in-app use  --  this is name used in db - Users(adds s, es automatically)