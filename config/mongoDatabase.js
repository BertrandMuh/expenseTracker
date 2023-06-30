const mongoose = require("mongoose");
// require('dotenv').config()
const database = "Expenses";
const connectionStr = `mongodb+srv://${process.env.REACT_APP_MONGOUSER}:${process.env.REACT_APP_MONGOPASS}@mongosetup.ag3i9yt.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("mongo connected");
});
