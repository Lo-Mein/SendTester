const {admin, db} = requie('../util/admin');

const config = require("../util/config/UAT/config.js");

const {v4: uuid_v4} = require("uuid");

const firebase = require("firebase");
firebase.initializeApp(config);

//Function to signup user
exports.signup = (req, res) =>{
    const newUser={
        fullName: req.body.fullName,
        email: req.body.email,
        pasword: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    db.doc(`/users/${newUser.email}`).get().then((doc)=>{
        if(doc.exists){
            return res.status(400).json({email: "This email is already taken"});
        }else{
            return firesbase.auth().createUserWithEmailAndPassword(newUser.email, newUser.pasword);
        }
    }).then((data)=>{
        userId = data.user.uid;
        return data.user.getIdToken();
    }).then((idToken)=>{
        token = idToken;
        const userCredentials= {
            fullName: newUser.fullName,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId,
        }
        return db.doc(`/users/${newUser.email}`).set(userCredentials);
    }).then(()=>{
        return res.status(201).json({token});
    })
    .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use"){
            return res.status(400).json({ email: "Email is already in use" });
        } else{
            return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
        }
    });
};