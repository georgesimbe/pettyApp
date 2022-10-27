// import mapboxgl from "mapbox-gl";
// import React, { useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
// import './Map.css';

// // const [fuelBrands,setFuelBrands] = useState([])
// // useEffect(() => {
// //   let url = "http://localhost:3004/"
// //   axios.get(url + `GetFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=4`)
// //   .then(response => setFuelBrands(response.data))
// //   .catch(err => {
// //     console.log(err);
// //   });
// // }, [])


// // console.log(fuelBrands)
// mapboxgl.accessToken = process.env.REACT_APP_TOKEN
// const Map = () => {
//   const mapContainer = useRef(null);

//   // Initialize map when component mounts
//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       longitude: 138.63,
//       latitude: -34.8626,
//       zoom: 10.45
//     });


//     // ########.forEach((feature) => {

//     //   const ref = React.createRef();

//     //   ref.current = document.createElement("div");
      
//     //   ReactDOM.render(
//     //     <Marker onClick={markerClicked} feature={feature} />,
//     //     ref.current
//     //   );

//     //   // Create a Mapbox Marker at our new DOM node
//     //   new mapboxgl.Marker(ref.current)
//     //     .setLngLat(#######)
//     //     .addTo(map);
//     // });
//     map.addControl(new mapboxgl.NavigationControl(), "top-right");

//     return () => map.remove()
//   }, []);

//   const markerClicked = (title) => {
//     window.alert(title);
//   }

//   return <div className="map-container" ref={mapContainer} />;
// }

// export default Map