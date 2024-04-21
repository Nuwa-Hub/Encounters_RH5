import {Buffer} from 'buffer';
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import axios from 'axios';
import { dataUriToBuffer } from 'data-uri-to-buffer';
import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import S3 from 'aws-sdk/clients/s3'; // Import only the S3 client
const SocketContext = createContext();

const socket = io('http://localhost:5000');
// const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const streamRef = useRef(); // Ref to hold the stream
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [file, setFile] = useState(null);
  const [user,setUser] = useState(null)

  const captureImage = async () => {
    console.log("Stream")
    console.log(streamRef.current)
    if (streamRef.current) {
      console.log("Stream exists, capturing image...");
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = streamRef.current.getVideoTracks()[0].getSettings().width;
      canvas.height = streamRef.current.getVideoTracks()[0].getSettings().height;
      ctx.drawImage(myVideo.current, 0, 0);
      const imageURL = canvas.toDataURL('image/jpeg'); // Adjust format if needed
      setFile(imageURL)
    } else {
      console.log("No stream available, cannot capture image.");
    }
  };
  

  useEffect(()=>{
    const uploadFile = async () => {
      const S3_BUCKET = "intervee"; 
      const REGION = "us-east-1"; 
  
      AWS.config.update({
        accessKeyId: "AKIAV2RCHMNOA3NHYLRM",
        secretAccessKey: "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",
      });
  
      const s3 = new S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });

      let buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64')
  
      const params = {
        Bucket: S3_BUCKET,
        Key: uuid(), 
        Body: buf,
        ContentType: 'image/jpeg', 
        ContentEncoding: 'base64',
      };
      const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${params.Key}`;
      console.log("Starting to upload...")
  
      try {
        const upload = await s3.putObject(params).promise();

        const response = await axios.post('http://localhost:5000/auth/saveimage', { userId: user.userId, imageUrl: imageUrl, meetId: me });
        console.log(response);
        console.log(upload);
  
      } catch (error) {
        console.log(error);
      }
    };
    if (file){
     uploadFile();
    }
  },[file])

  
  const createMeet = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('token')); 
      console.log(user);
      setUser(user)

      const response = await axios.post('http://localhost:5000/auth/createmeet', { userId:user.userId, meetId:me });
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.error('Error creating meet:', error.response.data.message);
    }
  };

  const meetEnded = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('token')); 
      const response = await axios.post('http://localhost:5000/auth/meetingended', { userId:user.userId, meetId:me });
      
    window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error('Error creating meet:', error.response.data.message);
    }
  };

  useEffect(()=>{
    if(me){
      createMeet();
    }
  },[me])

  useEffect(()=>{
    if(callEnded){
    
      meetEnded();
    }

  },[callEnded])


  useEffect(() => {
    console.log("useEffect called");
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
          console.log("getUserMedia success");
          setStream(currentStream);
          streamRef.current = currentStream;

          myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => {
      console.log("me event received");
      setMe(id);
    });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      console.log("callUser event received");
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    const captureInterval = setInterval(captureImage, 5000);
    return () => clearInterval(captureInterval);
  }, []);

  const answerCall = () => {
    console.log("answerCall called");
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log("signal event emitted");
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      console.log("stream event received");
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    console.log("callUser called");
    console.log(id);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log("signal event emitted");
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      console.log("stream event received");
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      console.log("callAccepted event received");
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  

  const leaveCall = () => {
    console.log("leaveCall called");

    setCallEnded(true);


    connectionRef.current.destroy();

  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
