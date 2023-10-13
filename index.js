import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))

let todoLists = {
    privateList: {listName: "Private list", items: []},
    workList : {listName: "Work list", items: []}
};

let chosenList = "workList";

app.get("/", (req, res)=>{
    res.render("index.ejs", {list: todoLists[chosenList]});
});

app.get("/private", (req, res)=>{
    chosenList = "privateList";
    res.redirect("/");
});

app.get("/work", (req, res)=>{
    chosenList = "workList";
    res.redirect("/");
});

app.post("/submit", (req, res)=>{
    let newItem = {
        name: req.body.newItem,
        checked: false,
        id: todoLists[chosenList].items.length + 1
    }
    todoLists[chosenList].items.push(newItem);
    res.redirect("/");
});

//TODO If checkbox true -> update item in array.
function itemChecked(element) {
    console.log(element);
    // If the checkbox is checked, display the output text
    if (element.checked == true){
      todoLists[chosenList].itemToBox.checked = true;
    };
}


app.listen(port, () =>{
    console.log(`Listening to port ${port}`);
});