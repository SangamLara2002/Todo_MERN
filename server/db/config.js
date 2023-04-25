const mongoose=require('mongoose');
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://prajapatisangam91:Lara2002@cluster1.nooci0r.mongodb.net/TODO?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("error", (err) => {
    console.log("Connection failed");
  });
  mongoose.connection.on("connected", (connected) => {
    console.log("Connected with database");
  });