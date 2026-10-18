let cl =console.log;

let posts=[
  {
    "id": "1",
    "title": "Introduction to JavaScript",
    "content": "JavaScript is a programming language used to make websites interactive.",
    "author": "Naveed",
    "createdAt": "2026-10-10"
  },
  {
    "id": "2",
    "title": "Understanding HTML",
    "content": "HTML is used to create the structure of web pages.",
    "author": "Rahul",
    "createdAt": "2026-10-11"
  },
  {
    "id": "3",
    "title": "Learning CSS",
    "content": "CSS helps us style web pages with colors, layouts, and animations.",
    "author": "Aman",
    "createdAt": "2026-10-12"
  },
  {
    "id": "4",
    "title": "Introduction to APIs",
    "content": "APIs allow different applications to communicate and exchange data.",
    "author": "Naveed",
    "createdAt": "2026-10-13"
  },
  {
    "id": "5",
    "title": "Understanding Fetch API",
    "content": "The Fetch API is used to send HTTP requests and handle server responses.",
    "author": "Ali",
    "createdAt": "2026-10-14"
  },
  {
    "id": "6",
    "title": "Getting Started with MongoDB",
    "content": "MongoDB is a NoSQL database that stores data in document format.",
    "author": "Rahul",
    "createdAt": "2026-10-15"
  }
]

const port=3000;
const { error } = require("console");
const { create } = require("domain");
const express= require("express");
const { title } = require("process");

let app = express();

app.use(express.json());



// get posts

app.get("/api/posts",(req,res)=>{
    try{
      res.status(200).json({
        ok:true,
        message:`Posts data fetched successfully`,
        data:posts,
      })
    }
    catch(err){
       res.status(500).json({
        ok:false,
        error:err.message,
        message:`something went wrong while fetching posts data`,
       })
    }
})

// single get.....

app.get("/api/posts/:id",(req,res)=>{
  try{
      let findpost= posts.find((p)=> p.id===req.params.id);
      if(!findpost){
       return res.status(404).json({
          ok:false,
          message:`post with id ${req.params.id} not found`,
        })
      }

      res.status(200).json({
        ok:true,
        message:`Todo with id ${req.params.id} fetched successfully`,
        data:findpost
      })

  }
  catch(err){
    res.status(200).json({
       ok:false,
       message:`post with id ${req.params.id} not found`,
       error:err.message
    })
  }
})



// create posts ....


app.post("/api/posts/",(req,res)=>{
try{
    if (!req.body.title || !req.body.author){
     return res.status(400).json({
      ok:false,
      message:`title and Author filed must be required`
     })
  }
  let newposts= {
        id:Date.now().toString(),
        title:req.body.title,
        content:req.body.content || "empty",
        author:req.body.author,
        createdAt:Date.now().toString()
  }
  posts.push(newposts);

   res.status(201).json({
    ok:true,
    message:`Post created successfully`,
    data:newposts
    
  })
  
}
catch(err){
  res(500).json({
    ok:false,
    message:`something went wrong while creating post`,
    error:err.message,
  })

}
})


// update posts...

app.patch("/api/posts/:id", (req,res)=>{
  try{
    let findidx= posts.findIndex((p)=>p.id===req.params.id)
      let updatedobj={
        ...posts[findidx],
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
      }

      if(findidx===-1){
       return res.status(404).json({
          ok:false,
          message:`posts with id ${req.params.id} not find`,
        })
      }
      res.status(200).json({
        ok:true,
        message:`posts with id ${req.params.id} is updated successfully`,
        data:updatedobj
      })
      posts[findidx]=updatedobj;

  }
  catch(err){
   res.status(500).json({
     ok:false,
     message:`Todo with id ${req.params.id} doesnt exists`,
     error:err.message
   })
  }
})


// delete posts

app.delete("/api/posts/:id",(req,res)=>{
  let findidx= posts.findIndex((p)=> p.id === req.params.id)
  try{
     if(findidx===-1){
      res.status(404).json({
        ok:false,
        message:`posts with id ${req.params.id} not found`,
      })
     }
      let postdlt = posts.splice(findidx,1)
     res.status(200).json({
      ok:true,
      message:`Posts with id ${req.params.id} is deleted successfully`,
      data:postdlt[0]
     })
  }
  catch(err){
    res.status(500).json({
      ok:false,
      message:`Post with id ${req.params.id} failed to delete`,
      error:err.message,
    })
  }
})



app.listen(port,()=>{
    cl("server is running")
})