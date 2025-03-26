const User = require("./../db/user");

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

async function registerUser(model) {
    const hashPassword = await bcrypt.hash(model.password,10);
  let  user = new User ({
    name:model.name,
    email:model.email,
    password:hashPassword,
  });
  await user.save();

}

async function loginUser(model) {
    // 🔹 Use findOne() instead of find()
    const user = await User.findOne({ email: model.email });

    // 🔹 Ensure user exists
    if (!user) {
        return null;
    }

    // 🔹 Check if password exists in the database
    if (!user.password) {
        return null;
    }

    // 🔹 Compare entered password with hashed password
    const isMatched = await bcrypt.compare(model.password, user.password);
    
    if (isMatched) {
        // 🔹 Generate JWT token on successful login
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            "Piyush", // 🔹 Use environment variable instead of hardcoded secret
            {
                expiresIn: "1h",
            }
        );

        return { token, user };
    } else {
        return null;
    }
}
module.exports={registerUser,loginUser}