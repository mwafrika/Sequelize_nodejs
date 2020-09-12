import post from "../../backend/models/index";
import bcrypt, { hash } from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const db = post.posts;
const dbUser = post.user;

const posts = {
    Item: (req, res) =>{
        const{title, description} = req.body;
        let errors =[];
        if(!title){
            errors.push({msg:'tile cannot be empty'})
        }
        if(!description){
            errors.push({msg:'description cannot be empty'})
        }
        if(errors.length > 0){
            res.render('posts',{
                errors,
                title,
                description
            });
        }else{
            db.create({
                title,
                description
            }).then(result =>{
               
              res.render('posts', {
                  result
              });
            });
        }
    },
    ItemGet: (req, res)=>{
       
        res.render('posts');

    },
    getAll: (req,res) =>{
        db.findAll({
            // include: ['user'
        })
        .then(result =>{
            
            res.send({
                result
            });
            console.log(result);
        })
    }
}
export default posts;