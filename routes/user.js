const express=require('express');
const router=express.Router();
const User=require('../model/user');
const {handleCreateUser,handleAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById}=require("../controllers/userController")

//For sending the html at browser
router.get('/user',async (req,res)=>{
    const user=await User.find()
    const html=`
    <ul>
    ${user.map((user)=>`<li>${user.first_name}-${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//Restful API
router.route('/').delete(handleDeleteUserById).put(handleUpdateUserById)
router.route('/').get(handleAllUsers).post(handleCreateUser);

module.exports=router;