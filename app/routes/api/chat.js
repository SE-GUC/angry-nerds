const mongo = require("mongoose");
const client = require("socket.io").listen("3000").sockets;

console.log("Connected to MongoDB");
//connect to socket.io
client.on("connection", function(socket) {
  let chat = db.collection("chats");

  //create function to send status
  sendStatus = function(s) {
    socket.emit("status", s);
  };

  //get chats from mongo collection

  chat
    .find()
    .limit(100)
    .sort({ _id: 1 })
    .toArray(function(err, res) {
      if (err) {
        throw err;
      }

      //Emit the messages
      socket.emit("output", res);

      //handle input events

      socket.on("input", function(data) {
        let name = data.name;
        let message = data.message;

        //check for the name and message
        if (name === "" || message === "") {
          sendStatus("Please enter name and message");
        } else {
          //insert message
          chat.insert({ name: name, message: message }, function() {
            client.emit("output", [data]);

            //send status object
            sendStatus({
              message: "Message sent",
              clear: true
            });
          });
        }
      });

      //handle clear
      socket.on("clear", function() {
        //remove all chats from collection
        chat.remove({}, function() {
          //Emit cleared

          socket.emit("Cleared");
        });
      });
    });
});
