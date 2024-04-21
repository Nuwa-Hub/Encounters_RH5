const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketio = require("socket.io");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});



app.use(cors());
app.use(express.json());
// app.use("/", (req, res, next) => {
//     console.log("GET request received at /");
//     res.send("Server is running.");
// });


app.use("/auth", authRoutes);

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        console.log(`Call initiated from ${from} to ${userToCall}`);
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        console.log(`Call answered from ${data.to} to ${data.from}`);
        io.to(data.to).emit("callAccepted", data.signal);
    });
});


mongoose.connect("mongodb+srv://jmbp1999:paty1234@cluster0.89zhh.mongodb.net/intervee", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
    // Start the server after successful MongoDB connection
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.log(err);
});