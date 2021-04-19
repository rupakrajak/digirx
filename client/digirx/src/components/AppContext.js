import React, { createContext, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const history = useHistory();
    const [id, setId] = useState("");
    const [partnerID, setPartnerID] = useState("");
    const [isCalling, setIsCalling] = useState(false);
    const [isReceiving, setIsReceiving] = useState(false);
    const [stream, setStream] = useState(null);
    const [stream2, setStream2] = useState(null);
    
    const connection = useRef();

    let socket;
    socket = io("http://localhost:9000");
    useEffect(() => {
        console.log(id);
        socket.on("connect", () => {
            console.log(socket.id);
        });

        // socket.on("server:signal", ({ data }) => {
        //     console.log(id, partnerID, data);
        //     // connection.current.signal(data);
        //     dat = data;
        //     // console.log(dat);
        // });

        socket.on("server:client-calling", async (payload) => {
            const { from } = payload;
            console.log({from});
            setPartnerID(from);
            const currentStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                audio: true,
            });
            
            setStream(currentStream);

            console.log({partnerID});
            setIsReceiving(true);
        });

        socket.on("server:client-uncalling", () => {
            if (othVideo.current.srcObject) {
                othVideo.current.srcObject.getVideoTracks()[0].stop();
                othVideo.current.srcObject.getAudioTracks()[0].stop();
                othVideo.current.srcObject = null;
                setStream(null);
            }
            setIsReceiving(false);
            setPartnerID("");
        });

        socket.on("server:call-responded", () => {
            setIsReceiving(false);
            setPartnerID("");
        });
    }, []);

    // useEffect(() => {
    //     const email = window.localStorage.getItem("id");
    //     socket.emit("client:associate-email-with-socket", { email });
    //     setId(email);
    // }, [])

    // useEffect(() => {
    //     if(stream !== null) {
    //         console.log("isCalling", isCalling);
    //         console.log(partnerID);
    //         peer = new Peer({ initiator: !isCalling, trickle: false, stream });
    //         // history.push("/dashboard/video-call");
            
    //         // if (!isCalling) peer.signal(dat);

    //         socket.on("server:signal", ({ data }) => {
    //             console.log(id, partnerID, data);
    //             peer.signal(data);
    //         });
    //         peer.on("signal", (data) => {
    //             socket.emit("client:signal", { partnerEmail: partnerID, data });
    //         });
            
    //         peer.on("stream", (inStream) => {
    //             console.log("inStream", inStream);
    //             othVideo.current.srcObject = inStream;
    //         });

    //         connection.current = peer;
    //     }
    // }, [stream])

    useEffect(() => {
        // console.log("effect:", id);
        // console.log("effect:", partnerID);
        if (isCalling) callUser();
    }, [isCalling]);

    const myVideo = useRef();
    const othVideo = useRef();

    const callUser = async () => {
        // console.log(inpute);
        // setPartnerID(inpute);
        console.log(partnerID);
        // setIsCalling(true);
        console.log(isCalling);
        const currentStream = await navigator.mediaDevices.getUserMedia({
            video: { aspectRatio: 0.625 },
            audio: true,
        });

        setStream(currentStream);
        // console.log(stream);
        // console.log(currentStream);
        myVideo.current.srcObject = currentStream;

        socket.on("server:client-unavailable", () => {
            // console.trace(myVideo.current.srcObject, stream);
            alert(`${partnerID} is not available`);
            myVideo.current.srcObject.getVideoTracks()[0].stop();
            myVideo.current.srcObject.getAudioTracks()[0].stop();
            myVideo.current.srcObject = null;
            setIsCalling(false);
            setStream(null);
            setPartnerID("");
        });

        socket.on("server:client-engaged", () => {
            // console.trace(myVideo.current.srcObject, stream);
            alert(`${partnerID} is already engaged on another call`);
            myVideo.current.srcObject.getVideoTracks()[0].stop();
            myVideo.current.srcObject.getAudioTracks()[0].stop();
            myVideo.current.srcObject = null;
            setIsCalling(false);
            setStream(null);
            setPartnerID("");
        });

        socket.on("server:not-responding", () => {
            myVideo.current.srcObject.getVideoTracks()[0].stop();
            myVideo.current.srcObject.getAudioTracks()[0].stop();
            myVideo.current.srcObject = null;
            setIsCalling(false);
            alert(`${partnerID} is not accepting call`);
            setStream(null);
            setPartnerID("");
        });
        
        const peer = new Peer({ initiator: false, trickle: false, stream: currentStream });

        console.log(peer);
        socket.on("server:signal", ({ data }) => {
            console.log("hello");
            peer.signal(data);
        });

        console.log("checked");

        peer.on("signal", (data) => {
            console.log("caller caller")
            socket.emit("client:signal", { partnerEmail: partnerID, data });
        });
        
        peer.on("stream", (inStream) => {
            console.log("caller stream");
            othVideo.current.srcObject = inStream;
        });
        connection.current = peer;
        
        socket.on("server:call-ended", () => {
            console.log("receiver ended");
            myVideo.current.srcObject.getVideoTracks()[0].stop();
            myVideo.current.srcObject.getAudioTracks()[0].stop();
            myVideo.current.srcObject = null;
            setStream(null);
            connection.current.destroy();
            setPartnerID("");
            history.goBack();
        });
        socket.on("server:call-accepted", () => {
            // setIsCalling(false);

            history.push("/dashboard/video-call");  
        });

        // socket.on("server:call-ended", () => {
        //     console.log("receiver ended");
        //     myVideo.current.srcObject.getVideoTracks()[0].stop();
        //     myVideo.current.srcObject.getAudioTracks()[0].stop();
        //     myVideo.current.srcObject = null;
        //     setStream(null);
        //     connection.current.destroy();
        //     setPartnerID("");
        //     history.goBack();
        // });

        socket.on("server:call-rejected", () => {
            console.log("Call Rejected");
            myVideo.current.srcObject.getVideoTracks()[0].stop();
            myVideo.current.srcObject.getAudioTracks()[0].stop();
            myVideo.current.srcObject = null;
            setIsCalling(false);
            alert(`${partnerID} has rejected the call`);
            setStream(null);
            setPartnerID("");
        });

        socket.emit("client:call-user", { email: id, partnerEmail: partnerID });
    };

    const uncallUser = () => {
        myVideo.current.srcObject.getVideoTracks()[0].stop();
        myVideo.current.srcObject.getAudioTracks()[0].stop();
        // stream.getVideoTracks()[0].stop();
        // stream.getAudioTracks()[0].stop();
        // console.log(stream);
        myVideo.current.srcObject = null;
        setIsCalling(false);
        socket.emit("client:uncall-user", {
            email: id,
            partnerEmail: partnerID,
        });
        setPartnerID("");
        setStream(null);
    };

    const acceptCall = () => {
        console.log("enter 1");
        // setIsReceiving(false);
        socket.emit("client:call-accepted", {
            email: id,
            partnerEmail: partnerID,
        });
        // const currentStream = await navigator.mediaDevices.getUserMedia({
        //     video: {
        //         width: window.innerWidth,
        //         height: window.innerHeight,
        //     },
        //     audio: true,
        // });
        
        // setStream(currentStream);
        // myVideo.current.srcObject = currentStream;
        // console.log(currentStream);
        console.log(stream);
        const peer = new Peer({ initiator: true, trickle: false, stream });
        
        socket.on("server:signal", ({ data }) => {
            // console.log("inClient", id, partnerID, data);
            console.log("receiver signal", partnerID);
            peer.signal(data);
        });
        
        socket.on("server:call-ended", () => {
            console.log("caller ended")
            myVideo.current.srcObject.getVideoTracks()[0].stop();
            myVideo.current.srcObject.getAudioTracks()[0].stop();
            myVideo.current.srcObject = null;
            setStream(null);
            connection.current.destroy();
            setPartnerID("");
            history.goBack();
        });
        
        console.log("enter 1");

        // connection.current.signal(dat);

        peer.on("signal", (data) => {
            console.log("receiver receiver")
            socket.emit("client:signal", { partnerEmail: partnerID, data });
        });
        
        peer.on("stream", (inStream) => {
            // console.log("inStream", inStream);
            console.log("receiver stream", partnerID);
            othVideo.current.srcObject = inStream;
        });
        
        connection.current = peer;
        console.log("I reached here");
        history.push("/dashboard/video-call");
    };

    const rejectCall = () => {
        setIsReceiving(false);
        console.log({id, partnerID});
        socket.emit("client:call-rejected", {
            email: id,
            partnerEmail: partnerID,
        });
    };

    const endCall = () => {
        if (isCalling) setIsCalling(false);
        if (isReceiving) setIsReceiving(false);
        myVideo.current.srcObject.getVideoTracks()[0].stop();
        myVideo.current.srcObject.getAudioTracks()[0].stop();
        myVideo.current.srcObject = null;
        setStream(null);
        connection.current.destroy();
        console.log("callendinclient", partnerID);
        socket.emit("client:call-ended", {
            email: id,
            partnerEmail: partnerID,
        });
        // setPartnerID("");
        history.goBack();
    };

    return (
        <AppContext.Provider
            value={{
                id,
                setId,
                partnerID,
                setPartnerID,
                isCalling,
                setIsCalling,
                isReceiving,
                socket,
                myVideo,
                othVideo,
                callUser,
                uncallUser,
                acceptCall,
                rejectCall,
                endCall,
                stream,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContextProvider, AppContext };
