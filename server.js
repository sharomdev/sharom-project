import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

const app = express();

app.use(express.json());
app.use(cors());

// DATABASE CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'obed'
});

db.connect((error) => {
    if (error) {
        console.log("Connection failed:", error);
    } else {
        console.log("Connection successful");
    }
});


//INSERT
app.post("/insert", (req, res) => {
    const { names, email, location } = req.body;

    const sql = 'INSERT INTO pacific(names, email, location) VALUES (?, ?, ?)';

    db.query(sql, [names, email, location], (error, result) => {
        if (error) {
            console.log('Insert error:', error);
            return res.status(500).json({ message: 'Insert failed', error });
        } else {
            console.log('Student inserted:', result);
            return res.status(200).json({ message: 'Insert successful' });
        }
    });
});


// SELECT 
app.get('/select', (req, res) => {
    const sql = 'SELECT * FROM pacific';

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: 'Select error', err });

        return res.status(200).json(result);
    });
});


// UPDATE 
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { names, email, location } = req.body;

    const sql = "UPDATE pacific SET names = ?, email = ?, location = ? WHERE id = ?";

    db.query(sql, [names, email, location, id], (err, result) => {
        if (err) {
           res.json(err);
        }
  res.json("Update successful",result );
    });
});


//DELETE 
app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    const dele='DELETE FROM pacific WHERE id=?'
    db.query(dele,[id],(error,result)=>{
        if(error){
            res.status(500).send('error messages',error);
        }
        else{
            res.status(200).send("deleted succes",result)
        }
    })
})


app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
