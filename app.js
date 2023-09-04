const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash");
require('dotenv').config()

const app = express();
const connectString = process.env.CONNECTION_MONGO;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(connectString);

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Mop the floor"
});

const item2 = new Item({
  name: "Take out to garbage"
});

const item3 = new Item({
  name: "Wash the windows"
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems);

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

app.get("/", async (req, res) => {

  const allItems = await Item.find({});

  if (allItems.length === 0) {
    Item.insertMany(defaultItems);
    res.redirect("/");
  } else {
  res.render("list", {
        listTitle: "Today", 
        newListItems: allItems
      });
  }
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName})
  .then(foundList => {
    if(foundList) {
      res.render("list", {
        listTitle: foundList.name, 
        newListItems: foundList.items
      });
    } else {
        const list = new List({
          name: customListName,
          items: defaultItems
      });
      list.save();
      res.redirect(`/${customListName}`);
    }
  })
  .catch(err => {
    console.log(err);
    res.redirect("/");
  });

  
  

});

app.post("/", (req, res) => {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({name: itemName});

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName})
    .then(foundList => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    })
  }
  
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndDelete(checkedItemId).then(item => {
      console.log("Deleted item: ", item);
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}).then(foundList => {
      res.redirect("/" + listName);
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
  }
  
  
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
