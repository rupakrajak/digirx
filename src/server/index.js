require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const { v4: uuidv4 } = require("uuid");
app.use(cors());

const callStatus = {};
// email: {id, partnerEmail}

const socketMapping = {};
const emailMapping = {};

io.on("connection", (socket) => {
    // socket.emit(socket.id);

    // const roomID = uuidv4();
    // socket.join(roomID);

    socket.on("client:associate-email-with-socket", ({ email }) => {
        email in socketMapping
            ? socketMapping[email].push(socket.id)
            : (socketMapping[email] = [socket.id]);
        emailMapping[socket.id] = email;
        console.log(socketMapping);
    });

    socket.on("client:call-user", (payload) => {
        const { email, partnerEmail } = payload;
        console.log(email, partnerEmail);
        callStatus[email] = socket.id;
        if (!(partnerEmail in socketMapping)) {
            console.log("client unavailable");
            socket.emit("server:client-unavailable");
            return;
        }
        if (partnerEmail in callStatus) {
            socket.emit("server:client-engaged");
            return;
        }
        const partnerIDs = socketMapping[partnerEmail];
        partnerIDs.forEach((id) => {
            io.to(id).emit("server:client-calling", {
                from: email,
                myID: socket.id,
            });
        });
    });

    socket.on("client:uncall-user", (payload) => {
        // const { email, partnerEmail } = payload;
        // delete callStatus[email];
        // const partnerIDs = socketMapping[partnerEmail];
        // partnerIDs.forEach(() => {
        //     io.to(id).emit("server:client-uncalling");
        // });
    });

    socket.on("client:not-responding", ({ email }) => {
        if (email in callStatus) {
            const id = callStatus[email];
            delete callStatus[email];
            io.to(id).emit("server:not-responding");
        }
    });

    socket.on("client:call-accepted", (payload) => {
        const { email, partnerEmail } = payload;
        callStatus[email] = socket.id;
        const id = callStatus[partnerEmail];
        io.to(id).emit("server:call-accepted");
        const myIDs = socketMapping[email];
        myIDs.forEach((id) => {
            if (id !== socket.id) io.to(id).emit("server:call-responded");
        });
    });

    socket.on("client:call-rejected", (payload) => {
        const { email, partnerEmail } = payload;
        console.log(email, partnerEmail);
        const id = callStatus[partnerEmail];
        delete callStatus[partnerEmail];
        io.to(id).emit("server:call-rejected");
        const myIDs = socketMapping[email];
        myIDs.forEach((id) => {
            if (id !== socket.id) io.to(id).emit("server:call-responded");
        });
    });

    socket.on("client:call-ended", (payload) => {
        const { email, partnerEmail } = payload;
        console.log([email, partnerEmail]);
        const partnerID = callStatus[partnerEmail];
        io.to(partnerID).emit("server:call-ended");
        delete callStatus[email];
        delete callStatus[partnerEmail];
    });

    socket.on("client:signal", (payload) => {
        const { partnerEmail, data } = payload;
        const id = callStatus[partnerEmail];
        // console.log("server", partnerEmail, id, data);
        io.to(id).emit("server:signal", {data: data})
    });

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected`);
        if (emailMapping[socket.id]) {
            const email = emailMapping[socket.id];
            delete emailMapping[socket.id];
            if (email in callStatus) delete callStatus[email];
            const index = socketMapping[email].indexOf(socket.id);
            socketMapping[email].splice(index, 1);
            if (socketMapping[email].length === 0) delete socketMapping[email];
        }
        console.log(socketMapping);
        socket.disconnect();
    });
});

server.listen(process.env.SERVER_PORT, () => {
    console.log(
        `[server] starting server...\n[server] listening on port ${process.env.SERVER_PORT}`
    );
});
