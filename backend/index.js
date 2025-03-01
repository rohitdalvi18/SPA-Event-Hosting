import express  from "express";
import mysql from "mysql2"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
  host: "db",
  user: "user",
  password: "pass",
  database: "test"
})

app.use(express.json())//return json data using the api server postman

app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hello World from the backend!!!")
})

//postman -> get method  http://localhost:8800/events
app.get("/events", (req,res)=>{
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

  app.post("/events", (req,res)=>{
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

  app.delete("/events/:id", (req,res)=>{
      const eventID = req.params.id
      const query = "DELETE FROM events WHERE id = ?"

      db.query(query, [eventID], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Event has been deleted successfully!!!")
      } )
  })

  app.put("/events/:id", (req,res)=>{
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