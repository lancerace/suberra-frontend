import React, { useEffect, useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import { Button, Paper, Typography } from '@mui/material';

interface IState{
  message:string;
}

function App() {
  const [state, setState] = useState<IState>({message:"message"});
  const connection = new WebSocket('wss://suberra-payment.herokuapp.com/');

  useEffect(() => {
    connection.onopen = () => {
      connection.send("subscribe to websocket");
      setState({...state,message: "subscribed to websocket"})
    }


    connection.onmessage = (e) => {
      console.log("message from server");
      console.log(e.data);
      setState({ ...state, message: e.data });
    }
  }, []);


  return (
    <div className="App">

      <header className="App-container">
        <Grid container justifyContent="center" style={{ padding: "5vh", height: "15vh" }}>Event tracker</Grid>
        
        <Grid container justifyContent="center">
          <Grid item md={6} justifyContent="space-around">
            <Paper>
            {state.message}
            </Paper>
          </Grid>
        </Grid>

      </header>
    </div>
  );
}

export default App;
