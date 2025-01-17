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
