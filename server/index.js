const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'hr_management_system'
})

app.post('/create', (req, res) => {
    const reqBody = req.body;
    const name = reqBody.name;
    const age = reqBody.age;
    const country = reqBody.country
    const position = reqBody.position;
    const wage = reqBody.wage;

    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)',
        [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log('Error: ', err);
            } else {
                res.send('Value Ins')
            }
        }
    )
})

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log('Yeah, Server is running in port: 3001');
})
