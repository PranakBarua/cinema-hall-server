const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const ObjectId=require('mongodb').ObjectId


const app = express()
app.use(bodyParser.json());
app.use(cors());


const port = 5000;
app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})



const uri = "mongodb+srv://cinemaHall:cinemaHall111@cluster0.b8xwq.mongodb.net/cinemaHall?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
client.connect(err => {
  const cinemaCollection = client.db("cinemaHall").collection("cinema");
  const ticketCollection = client.db("cinemaHall").collection("ticket");
  app.post("/addCinema",(req,res)=>{
    const cinema=req.body
    console.log(cinema)
    cinemaCollection.insertMany(cinema)
    .then(result=>{
        res.send(result.insertedCount>0)
    })
  });
  app.post("/addTicket",(req,res)=>{
    const newTicket=req.body
    // console.log(ticket)
    const {date,name,ticket,email}=req.body
    //console.log(date,name,ticket)
    ticketCollection.find({email:email,date:date , name:name})
    .toArray((err,documents)=>{
      if(documents.length>9){
        console.log(documents.length)
        res.send('Booked!please try another ticket')
      }
      else{
        ticketCollection.find({date:date , name:name ,ticket:ticket})
        .toArray((err,documents)=>{
            if(documents.length>0){
              res.send('Booked!please try another ticket')
             
            }
            else{
              ticketCollection.insertOne(newTicket)
              .then(result=>{
                res.send(result.insertedCount>0)
              })
            }
        })
      }
  })
   
    
  
    // const email=req.body.email
    // console.log(date)
    // doctorCollection.find({email:email})

    // ticketCollection.insertOne(ticket)
    // .then(result=>{
    //     res.send(result.insertedCount>0)
    // })
  });
  app.get('/cinemas',(req,res)=>{
    cinemaCollection.find({})
    .toArray((err,documents)=>{
        res.send(documents)
    })
    
  })
 
   app.post('/myTickets', (req, res) => {
    const email = req.body.email;
    ticketCollection.find({ email: email })
        .toArray((err, documents) => {
            res.send(documents);
        })
})
  // perform actions on the collection object
  // client.close();
});

app.listen(process.env.PORT || port)












// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fileUpload = require('express-fileupload');
// const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config();
// const ObjectId=require('mongodb').ObjectId

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b8xwq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const app = express()
// app.use(bodyParser.json());
// app.use(cors());
// app.use(fileUpload());
// app.use(express.static('doctors'));


// const port = 5000;
// app.get('/', (req, res) => {
//     res.send("hello from db it's working working")
// })

// const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
// client.connect(err => {
//   const reviewCollection = client.db("creativeAgency").collection("review");
//   const serviceCollection = client.db("creativeAgency").collection("service");
//   const adminCollection = client.db("creativeAgency").collection("admin");
//   const enrollServiceCollection = client.db("creativeAgency").collection("shipment");

//   app.post("/addReview",(req,res)=>{
//     const review=req.body
//     console.log(review)
//     reviewCollection.insertOne(review)
//     .then(result=>{
//         res.send(result.insertedCount>0)
//     })
//   });

//   app.get('/reviews',(req,res)=>{
//     reviewCollection.find({})
//     .toArray((err,documents)=>{
//         res.send(documents)
//     })
    
//   })

//   app.get('/services',(req,res)=>{
//     serviceCollection.find({})
//     .toArray((err,documents)=>{
//         res.send(documents)
//     })
    
//   })

//   app.post('/serviceByTitle',(req,res)=>{
//     const title = req.body.title;
//     serviceCollection.find({ title: title })
//     .toArray((err,documents)=>{
//         res.send(documents)
//     })
    
//   })

//   app.post('/ServiceEnrollByCustomer', (req, res) => {
//     const email = req.body.email;
//     enrollServiceCollection.find({ email: email })
//         .toArray((err, documents) => {
//             res.send(documents);
//         })
//   })

//   app.post('/addService', (req, res) => {
//     const file=req.files.file;
//     const title=req.body.title;
//     const description=req.body.description;
//     const newImg = file.data;
//     const encImg = newImg.toString('base64');

//         var image = {
//             contentType: file.mimetype,
//             size: file.size,
//             img: Buffer.from(encImg, 'base64')
//         };
//         console.log( title, description, image )

//         serviceCollection.insertOne({ title, description, image })
//             .then(result => {
//                 res.send(result.insertedCount > 0);
//             })
//   })

//   app.post("/shipment",(req,res)=>{
//     const shipment=req.body
//     console.log(shipment)
//     enrollServiceCollection.insertOne(shipment)
//     .then(result=>{
//         res.send(result.insertedCount>0)
//     })
//   });

//   app.get('/allServices',(req,res)=>{
//     enrollServiceCollection.find({})
//     .toArray((err,documents)=>{
//         res.send(documents)
//     })
    
//   })

//   app.post("/addAdmin",(req,res)=>{
//     const admin=req.body
//     console.log(admin)
//     adminCollection.insertOne(admin)
//     .then(result=>{
//         res.send(result.insertedCount>0)
//     })
//   });

//   app.post('/isAdmin', (req, res) => {
//     const email = req.body.email;
//     adminCollection.find({ email: email })
//         .toArray((err, admin) => {
//             res.send(admin.length > 0);
//         })
//   })

// });


// app.listen(process.env.PORT || port)