import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

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
  const [capturedImages, setCapturedImages] = useState([]);
  const streamRef = useRef(); // Ref to hold the stream


  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const captureImage = () => {
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
      console.log(imageURL)
      setCapturedImages([...capturedImages, imageURL]);
    } else {
      console.log("No stream available, cannot capture image.");
    }
  };


  useEffect(()=>{
    console.log(capturedImages)
  },[])
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

    window.location.reload();
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
