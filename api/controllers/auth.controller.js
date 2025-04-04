import bcryptjs from 'bcryptjs';
import UserModel from '../model/user.model.js'

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    
    try {

        // Check if user already exists
        // const existingUser = await UserModel.findOne({ 
        //     $or: [{ username }, { email }] 
        // });
        // if (existingUser) {
        //     return res.status(400).json({ error: 'User already exists' });
        // }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (err) {
        next(err);
    }

}