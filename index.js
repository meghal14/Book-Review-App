const express = require("express");
const app = express();
const {v4:uuidv4} = require("uuid");
const path = require("path");
const methodOverride = require("method-override");


let books =[ 
    {
    id: uuidv4(),
    bookName: "Atomic Habits",
    author: "James Clear",
    reviewer: "Meghal",
    rating: 5,
    review: "A practical book that teaches how small habits create big results."
  },
  {
    id: uuidv4(),
    bookName: "The Alchemist",
    author: "Paulo Coelho",
    reviewer: "Rahul",
    rating: 4,
    review: "An inspiring story about following your dreams and finding your purpose."
  },
  {
    id: uuidv4(),
    bookName: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    reviewer: "Sneha",
    rating: 5,
    review: "A great introduction to personal finance and building wealth."
  }
];
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

let port = 4040;

app.get("/rbook",(req,res)=>{
    res.render("index.ejs",{ books });
});

app.get("/rbook/new",(req,res)=>{
    res.render("add_new.ejs");
})

app.post("/rbook",(req,res)=>{
    let id = uuidv4();
    let { bookName , author, reviewer, rating, review} = req.body;

    //console.log(id, bookName, author,  reviewer, rating, review);

    books.push({id, bookName, author,  reviewer, rating, review});
    res.redirect("/rbook");
})

app.get("/rbook/:id", (req, res) => {
    let { id } = req.params;
    //console.log("Requested ID:", id);
    let book = books.find((b) => b.id === id);
    //console.log(book);
    res.render("view_rew.ejs", { book });
});

app.delete("/rbook/:id", (req,res)=>{
    let { id } = req.params;
     books = books.filter((b) => b.id !== id);
     res.redirect("/rbook");
})

app.listen(port,()=>{
    console.log(`Listning at port ${port}`);
});