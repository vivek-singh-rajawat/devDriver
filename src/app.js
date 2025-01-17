const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require("./models/user")

app.use(express.json())

app.post("/signup", async(req, res) => {
        // creating a new instence of the user model
        console.log(req.body);
  const user = new User(req.body);
    
  try {
    await user.save();
  res.send("user Added ")
  } catch (error) {
    res.status(400).send("Erroe saving the user"+ error.message)
  
}
});


app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    res.status(400).send("something went wrong");
  }
})

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully")
  } catch (error) {
    res.status(400).send("something went wrong");
  }
})

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  
  
  try {

    const ALLOWED_UPDATE = ["firstName", "lastName", "password", "age", "gender", "photoUrl", "about", "skills"];
  const updates = Object.keys(data).every((update) => ALLOWED_UPDATE.includes(update));

  if (!updates) {
    throw new Error("Invalid updates");
  }
  
    const user = await User.findByIdAndUpdate(userId, req.body,{
      returnDocument: "after",
      runValidators: true
  });
  res.send(user)
  } catch (error) { 
    res.status(400).send("UPdate failed:" + error.message);
  }
});

connectDB()
  .then(() => {
     console.log("MongoDB Connected");
  app.listen(3000, () => {
    console.log('listening on port 3000')
});
})
.catch((err) => {
  console.error("some");
});
