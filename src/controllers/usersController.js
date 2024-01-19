const { validationResult } = require("express-validator")
const { leerJSON, escribirJSON } = require("../data")
const User = require('../data/User')
 module.exports = {
    login : (req,res) => {
        return res.render('users/login')
    },
     processLogin: (req, res) => {
    const errores = validationResult(req);
    console.log("errors:",errores);
    const { email } = req.body;

    if (errores.isEmpty()) {
      const { id, Nombre, Categoría } = leerJSON("users").find(
        user => user.Email === email
      );

      req.session.userLogin = {
        id,
        Nombre,
        Categoría,
      };

      return res.redirect("/");
    } else {
      return res.render("users/login", {
        errors: errores.mapped(),
      });
    }
  },
    register : (req,res) => {
        return res.render('users/register')
    },
    processRegister : (req, res) =>{    
        const errors = validationResult(req)
        const { name, surname, email, password } = req.body
        
            const avatar =
              req.file && req.file.avatar
                ? req.file.avatar.filename
                : 'default-avatar.jpg'

       

        if (errors.isEmpty()) {
           
            const users = leerJSON('users')

    

            const newUser = new User(name, surname, email, password, avatar)
            
            users.push(newUser)

            escribirJSON(users,'users')
            return res.redirect('/users/login')
    

            
        }else {
             return res.render('users/register',{
                old : req.body,
                errors : errors.mapped()
             })
        }
       
    }


    }

    

 
