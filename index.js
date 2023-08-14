
const express = require("express");
const multer = require('multer');
const con = require("./config");
const app = express();
const cors = require('cors');
app.use('/uploads',express.static('uploads'));
app.use(express.json());

app.use(cors());

// ............Blog_category............
app.post("/post_category", (req, resp) => {
  const data = req.body;
  con.query("INSERT INTO blog_category SET?", data, (error, results, fields) => {
    if (error) throw error;
    resp.send(results)
  })
});


// ............Blog_posts............
// app.post("/post_posts", (req, resp) => {
//   const data = req.body;
//   // data.created_at = new Date().toISOString().replace('T', ' ').slice(0, 19);
// const currentDateTime = new Date().toISOString();
// data.created_at = currentDateTime;
//   con.query("INSERT INTO blog_posts SET?", data, (error, results, fields) => {
//     if (error) throw error;
//     resp.send(results)
//   })
// });


  
  // Configure multer for file upload
  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./uploads");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + ".jpg");
      },
    }),
  }).single("post_banner");
  
  app.post("/post_posts", upload , (req, resp) => {
    const data = {
      ...req.body,
      post_banner: req.file.filename, 
      created_at: new Date().toISOString(),
    };
  
    con.query("INSERT INTO blog_posts SET?", data, (error, results, fields) => {
      if (error) {
        console.error("Error inserting data into MySQL:", error);
        resp.status(500).send("Internal Server Error");
      } else {
        console.log("Data inserted successfully into MySQL");
        resp.send(results);
      }
    });
  });
 
  
// ............Blog_tags............
app.post("/post_tags", (req, resp) => {
  const data = req.body;
  con.query("INSERT INTO blog_tags SET?", data, (error, results, fields) => {
    if (error) throw error;
    resp.send(results)
  })
});


// ............Blog_post_comments............
app.post("/post_comments", (req, resp) => {
  const data = req.body;
  data.comment_date =  new Date().toISOString().slice(0, 19).replace('T',' ');
  con.query("INSERT INTO blog_post_comments SET?", data, (error, results, fields) => {
    if (error) throw error;
    resp.send(results)
  })
});




// ............tutorial_series............
app.post("/post_series", (req, resp) => {
  const data = req.body;
  con.query("INSERT INTO tutorial_series SET?", data, (error, results, fields) => {
    if (error) throw error;
    resp.send(results)
  })
});


// ............tutorial_series_lessons............
app.post("/post_series_lessons", (req, resp) => {
  const data = req.body;
  con.query("INSERT INTO tutorial_series_lession SET?", data, (error, results, fields) => {
    if (error) throw error;
    resp.send(results)
  })
});


app.listen(5000 ,(req,res)=>{
console.log('server start')
})