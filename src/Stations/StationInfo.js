import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export default function StationInfo(props) {


  const [station] = useState(props.station)
  const [open, setOpen] = useState(false)
  const [journeys, setJourneys] = useState([]);
  const url_journeys = 'http://localhost:8080/api/journeys'

  useEffect(() => fetchData(), [],);

  // haetaan kaikki matkat ----------tämä koodi noutaa datan ---------
  const fetchData = () => {
    fetch(url_journeys)
      .then(response => response.json())
      .then(data => {
        setJourneys(data);
      }
      )
      .catch(err => console.log(err));

  }

  //• Total number of journeys starting from the station
  //• Total number of journeys ending at the station
  // --> filteröidään kaksi uutta objektilistaa, joissa toisessa haluttu asema on lähtöasemana ja toisessa listassa
  // pääteasemana. Koska haluttu asema on lähetetty propsina tähän tiedostoon, voidaan aseman nimen perusteella
  // suoraan tehdä filtteröinti alla olevalla tavalla

  const filtered_journeys_departureStation = journeys.filter(journey => {
    return journey.departureStationName === station.station_name;
  });

  const filtered_journeys_returnStation = journeys.filter(journey => {
    return journey.returnStationName === station.station_name;
  });

  // objektilistan itemit on helppo laskea length-funktiolla   

  const departureStation_amount = filtered_journeys_departureStation.length

  const returnStation_amount = filtered_journeys_returnStation.length

  // avataan ikkuna  ------------------------------------
  const showInfo = () => {
    setOpen(true)
  }

  // suljetaan ikkuna
  const closeInfo = () => {
    setOpen(false)
  }

  //________ Ikkuna, jossa info näytetään _____________________________________________________________________________________

  return (
    <div>

      <Button onClick={() => showInfo()}> <b> {station.station_name} </b> </Button>

      <Dialog
        open={open}
        onClose={closeInfo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          The name of the station: {station.station_name}

        </DialogTitle>

        <DialogContent>

          <DialogContentText id="alert-dialog-description">
            Address: <br />
            <b> {station.station_address}</b><br /> <br />
            Coordinates:<br />
            <b>x:  {station.x} </b>  <br />
            <b>y: {station.y} </b>  <br /> <br />
            Total number of journeys starting from the station:  <b>  {departureStation_amount} </b>  <br />
            Total number of journeys ending at the station:  <b>  {returnStation_amount}  </b>  <br />

          </DialogContentText>

        </DialogContent>
        <DialogActions>

          <Button onClick={closeInfo} autoFocus>
            Close info
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

