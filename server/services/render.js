const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config( { path : 'config.env'} )

exports.listUser = (req, res) => {
    // Make a get request to /api/users
    
    axios.get(`http://localhost:13762/api/users`)
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
    

    
}
exports.Homepage = (req, res) =>{
    res.render('login_page');
}
exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get(`http://localhost:13762/api/users`, { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}