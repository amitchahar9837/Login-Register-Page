// our dependencies
const express =  require('express');
const app = express();

const mysql = require('mysql2');	
const cors = require('cors')

app.use(express.json())
app.use(cors())

// running port
app.listen(3002, ()=>{
    console.log('server is running on port 3002');
})

// let us create our database
const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    port:3306,
    password:'dell123',
    database:'plant'
})

// let us create route
db.connect((err) => {
    if (err) {
    console.error('Error connecting to database:', err);
    return;
    }
    console.log('Connected to the database');
   });

app.post('/register',(req, res)=>{

    const sentEmail = req.body.Email
    const sentUserName = req.body.UserName
    const sentPassword = req.body.Password

    const SQL = `INSERT INTO plants (email, username, password) VALUES (?,?,?)`; 
    const Values = [sentEmail, sentUserName, sentPassword]
       
    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send(err);
        }else{
            console.log('User Inserted Successfully');
            res.send({message:"user Added!"})
        }
    })
})

app.post('/login', (req, res)=>{
    const sentLoginUserName = req.body.LoginUserName
    const sentLoginPassword = req.body.LoginPassword

    const SQL = `SELECT * FROM plants WHERE username= ? && password =  ? `; 
    const Values = [sentLoginUserName, sentLoginPassword]

    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send(err);
        }
        if(results.length > 0){
            res.send(results)
        }else{
            res.send({message: `Credentials don't match!`});
        }
    })
})