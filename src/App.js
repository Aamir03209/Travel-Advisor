import { useState,useEffect } from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { CssBaseline,Grid } from "@material-ui/core";
import { getPlacesData, getWeatherData } from "./api";

function App() {
  const [places,setPlaces]=useState([]);
 
  const [coordinates,setCoordinates]=useState({lat:0,lng:0});
  const [bounds,setBounds]=useState({});
  const [childClicked,setChildClicked]=useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const[type,setType]=useState('hotels');
  const[rating,setRating]=useState('');
  const[filteredPlaces,setFilteredPlaces]=useState([]);

  useEffect(()=>{
  navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude});
  })
  },[]);

  useEffect(()=>{
  const filteredPlacesarr=places?.filter((place)=>place?.rating>rating);
  setFilteredPlaces(filteredPlacesarr)
  },[rating])

  useEffect(()=>{
   
    //console.log({bounds})
    if(bounds.sw && bounds.ne){
    setIsLoading(true);
   
    getPlacesData(bounds.sw,bounds.ne,type)
    .then((data)=>{
     //console.log(data);
     setPlaces(data?.filter((place)=>place.name&&place.num_reviews>0));
     setFilteredPlaces([])
     setIsLoading(false)
    })
  }
  },[bounds,type]);
  return (
    <>
    <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List 
          places={filteredPlaces.length?filteredPlaces:places}
          childClicked={childClicked} 
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}/>
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map 
          coordinates={coordinates} 
          setCoordinates={setCoordinates} 
          bounds={bounds} setBounds={setBounds} 
          places={filteredPlaces.length?filteredPlaces:places} 
          setChildClicked={setChildClicked}
         
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
