import React, { useContext, useEffect } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

import { SocketContext } from '../contexts/context';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  useEffect(()=>{
    console.log(callAccepted)
  },[callAccepted])

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>{name || 'Your Name'}</Typography>
          <video playsInline muted ref={myVideo} autoPlay style={{ width: '100%', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }} />
        </Paper>
      </Grid>
      {callAccepted && !callEnded && (
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>{call.name || 'Caller Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay style={{ width: '100%', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }} />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default VideoPlayer;
