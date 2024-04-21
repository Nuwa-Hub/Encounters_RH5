import { Typography, AppBar } from '@mui/material';
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Notifications from './components/Notifications';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <AppBar style={{ borderRadius: 15, margin: '30px 100px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '600px', border: '1px solid black' }} position="static" color="inherit">
      <Typography style={{ letterSpacing: '0.1em'}} variant="h2" align="center">Intervee</Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default App;