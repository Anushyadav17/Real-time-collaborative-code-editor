const User = require('../model/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

//sign up controller
exports.signUp = async(req, res) => {
    try {
        // Extracting user details from the request body
        const {firstName, lastName, email, password, confirmPassword} = req.body;

        // Check if all required fields are provided
        if(!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(404).json({
                success : false,
                message : "All Fields are Required",
            })
        }

        // Check if password and confirm password match
        if(password !== confirmPassword) {
            return res.status(401).json({
                success : false,
                message : "Password and Confirm Password are not Matched",
            })
        }

        // Check if the user already exists in the database
        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(400).json({
                success : false,
                message : "User Already Exist",
            })
        }

        // Hash the password before storing it in the database
        const hashPassword = await bcrypt.hash(password,10);

        // Create a new user with the provided details
        const user = await User.create({
            firstName,
            lastName, 
            email,
            password : hashPassword,
            image : `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        // Send success response after user registration
        return res.status(200).json({
            success : true,
            message : "User register Successfully",
            user,
        })
    }
    catch (error) {
        // Handle any errors during the process
        return res.status(500).json({
            success : false,
            message : "Error While Creating a User",
        })
    }
}

//user login controller
exports.login = async(req, res) => {
    try {
        // Extracting email and password from the request body
        const {email, password} = req.body;

        // Check if both email and password are provided
        if(!email || !password) {
            return res.status(404).json({
                success : false,
                message : "All Fields are Required",
            })
        }

        // Check if the user exists in the database
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({
                success : false,
                message : "User is Not Exist",
            })
        }

        // Compare the provided password with the stored hashed password
        if(await bcrypt.compare(password,user.password)) {
            const payload = {
                email : user.email,
                id : user._id,
            }

            // Generate a JWT token for the user
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "6h", 
            })            

            user.token = token;

            //cookies creation
            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000), // Set cookie expiration
                httpOnly : true, // Ensure cookie is accessible only through HTTP(S)
            }
            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,   
                message : 'Log in Successfully',
            })
        }
        else
        {
            // Handle invalid password scenario
            return res.status(401).json({
                success : false,
                message : "Password Doesnot Matched",
            });
        }
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).json({
            success : false,
            message : 'Error while login',
        });
    }
}
