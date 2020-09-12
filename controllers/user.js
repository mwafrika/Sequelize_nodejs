import user from "../../backend/models/index";
import bcrypt, { hash } from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const db = user.user;

const User = {
  signup: (req, res) => {
    const { firstname, lastname, email, password, password2 } = req.body;
    let errors = [];
    if (!firstname) {
      errors.push({ msg: "firstname cannot be empty" });
    }
    if (!lastname) {
      errors.push({ msg: "lastname cannot be empty" });
    }
    if (!email) {
      errors.push({ msg: "email cannot be empty" });
    }
    if (!password) {
      errors.push({ msg: "password cannot be empty" });
    }
    if (!password2) {
      errors.push({ msg: "confirm password cannot be empty" });
    }
    if (password.length < 6) {
      errors.push({
        msg: "password should not be less than 6 characters long",
      });
    }
    if (password2 !== password) {
      errors.push({ msg: "password don't much" });
    }
    if (errors.length > 0) {
      res.render("register", {
        errors,
        firstname,
        lastname,
        email,
        password,
        password2,
      });
    } else {
      db.findOne({ where: { email } }).then((result) => {
        if (result) {
          errors.push({ msg: "This email is already registered" });
          res.render("register", {
            errors,
            firstname,
            lastname,
            email,
            password,
            password2,
          });
        } else {
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) console.log(err);
              db.create({
                firstname,
                lastname,
                email,
                password: hash,
              })
                .then((user1) => {
                  if(user1) {
                    jwt.sign({user1},process.env.JWT_SECRET, {expiresIn:'1h'},(err, token) =>{
                      res.render('login',{
                        data:{
                          user1,
                          token
                        }
                      })
                      console.log(user1 +"HERI "+token);
                    });
                  
                    // res.redirect("/user/login");
                  }else {
                    console.log("an error occured");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            })
          );
        }
      });
    }
  },
  login: (req, res) =>{
       const{ email, password} = req.body;
       console.log(req.body);
       let errors = [];
       if(!email){
        errors.push({msg: 'email field cannot be empty'});
       }
       if(!password){
        errors.push({msg: 'password field cannot be empty'});  
       }
       if(errors.length > 0){
         res.render('login',{
          errors,
          email,
          password
         });
       }else{
        db.findOne({where:{email}}).then(result =>{
          if(result){
            bcrypt.compare(password, result.password,(err, hashPass) =>{
              if(hashPass){
                jwt.sign({result}, process.env.JWT_SECRET, {expiresIn:'1h'}, (err, token) =>{                
                  // req.session.user = token;
                   res.render('dashboard',{
                     token
                   });       
                  res.redirect('/posts/items'); 
                })
               
              }else{
                errors.push({msg:'password or email don\'t much'})
                res.render('login',{
                  errors,
                  email,
                  password
                })
              }
            });

          }else{
            errors.push({msg:'user is not found'})
          res.render('login',{
              errors,
              email,
              password
             })
          }
        })
       }
  },
  getSignup: (req, res) => {
    res.render("register");
  },
  getLogin: (req, res) =>{
      res.render('login');
  },
  logout: (req, res) =>{
    req.session.destroy(err =>{
      if(err) return console.log(err);
      res.redirect('/user/login');
    });
  }
};

export default User;
