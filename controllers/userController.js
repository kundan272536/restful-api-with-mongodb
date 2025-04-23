const User = require("../model/user");
/*--------------------------------------------Create user api -------------------------*/
const handleCreateUser = async (req, res) => {
    try {
        const body = req.body;
        if (!body || !body.first_name || !body.email || !body.job_title || !body.gender) {
            return res.json({ 'message': 'All fields are required' });
        }
        //    console.log("User is ",data);
        //    users.push({id:users.length+1,...data});
        //    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        //      return res.json({'status':'success','message':'user added successfully!'});
        //    })
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            jobTitle: body.job_title,
            gender: body.gender,
        });
        return res.json({ status: 'success', message: 'User created successfully!', data: result });
    } catch (error) {
        return res.json({ status: 'error', message: error });

    }
}
/*--------------------------------------------Get all and also with id api -------------------------*/  
const handleAllUsers = async (req, res) => {
    try {
        console.log("id is ",req.query.id);
        if(req.query.id){
            const user = await User.findById(req.query.id);
            if (user) {
                return res.json({ status: 'success', message: 'User found successfully!', data: user });
            } else {
                return res.json({ status: 'sucess', message: 'User not found!' });
            }
        }
        else{
            const user = await User.find();
            if (user) {
                return res.json({ status: 'success', message: 'Data fetched successfully!', data: user });
            }
        }  
    } catch (error) {
        return res.json({ status: 'error', message: error });
    }
}
/*--------------------------------------------Get user by id api -------------------------*/ 
const handleGetUserById = async (req, res) => {
    try {
        console.log("Inside the get user by id");
        const user = await User.findById(req.params.id);
        if (user) {
            return res.json({ status: 'success', message: 'User found successfully!', data: user });
        } else {
            return res.json({ status: 'sucess', message: 'User not found!' });
        }
    } catch (error) {
        return res.json({ status: 'error', message: error });
    }
}
/*--------------------------------------------Update user by id api -------------------------*/  
const handleUpdateUserById=async(req,res)=>{
    try {
        const userId=req.query.id;
        if(!userId){
            return res.status(400).json({status:'error',message:'User id is required in params'})
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({status:'error',message:'User not found!'});
        }
        const { first_name,last_name, email, job_title, gender } = req.body;
        if (!first_name || !email || !job_title || !gender) {
            return res.status(400).json({ status: 'error', message: 'All fields are required' });
        }
        // Update user fields
        user.firstName = first_name;
        user.lastName=last_name
        user.email = email;
        user.jobTitle = job_title;
        user.gender = gender;
        // Save updated user
        const updatedUser = await user.save();
        return res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        return res.json({ status: 'error', message: error });
    }
}

/*--------------------------------------------Delete user by id api -------------------------*/  
const handleDeleteUserById=async(req,res)=>{
    console.log("inside the delete user by id ");
    try {
        const userId = req.query.id;
        if (!userId) {
            return res.status(400).json({ status: 'error', message: 'User ID is required in query' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found!' });
        }
        await User.findByIdAndDelete(userId);
        return res.status(200).json({ status: 'success', message: 'User deleted successfully!' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}


module.exports = {
    handleCreateUser,
    handleAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
}