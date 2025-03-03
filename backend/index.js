import express  from "express";
import mysql from "mysql2"
import cors from "cors"
import dotenv from "dotenv";

const app = express();

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

app.use(express.json())//return json data using the api server postman

app.use(cors())

app.get("/api", (req,res)=>{
    res.json("Hello World from the backend!!!")
})

//postman -> get method  http://localhost:8800/events
app.get("/api/events", (req,res)=>{
    const query = "SELECT * FROM events"
    db.query(query, (err,data)=>{
          if(err) return res.json(err)
          return res.json(data)
    })
  })


  //postman ---> post method
  //json body bellow
  //----------------------------- http://localhost:8800/events
  //{
// "title": "title from events",
// "description": "description from events",
// "cover": "cover from client"
// }

  app.post("/api/events", (req,res)=>{
    const query = "INSERT INTO events (`title`, `description`, `price`, `cover`) VALUES (?)"
    const values = [
       req.body.title,
       req.body.description,
       req.body.price,
       req.body.cover
    ]

    db.query(query, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Event has been created successfully!!!")
    })
  })

  app.delete("/api/events/:id", (req,res)=>{
      const eventID = req.params.id
      const query = "DELETE FROM events WHERE id = ?"

      db.query(query, [eventID], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Event has been deleted successfully!!!")
      } )
  })

  app.put("/api/events/:id", (req,res)=>{
    const eventID = req.params.id
    const query = "UPDATE events SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.cover
    ]

    db.query(query, [...values, eventID], (err, data)=>{
      if(err) return res.json(err)
      return res.json("Event has been updated successfully!!!")
    } )
})


app.listen(8800, ()=>{
    console.log("Connect to the backend!!!!")
})

//npm start