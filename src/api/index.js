import axios from "axios";

export const  getPlacesData = async(sw,ne,type)=>{
    try {
        
      const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            method: 'GET',
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            
            },
            headers: {
              'X-RapidAPI-Key':process.env.REACT_APP_TRAVELADVISOR_API,
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });
        return data;
    } catch (error) {
        console.log(error)
    }
}
