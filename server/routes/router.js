const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const  credential = {
    email : "adminneko@gmail.com",
    password : "Lazada1234$"
}

// login user
route.post('/login', (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/list-user');
        //res.end("Login Successful...!");
    }else{
        res.end("Invalid Username")
    }
});
/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/list-user', services.listUser, (req, res) => {
    if(req.session.user){
        res.render('index', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
});

route.get('/', services.Homepage);
/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

route.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('login_page', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})
// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route