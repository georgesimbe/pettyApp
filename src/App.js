import './App.css';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import ReactMapGL, {
  Marker, GeolocateControl, ScaleControl, Popup
} from 'react-map-gl'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line 
import axios from 'axios';
import Pin from './pin';

export default function App() {
  mapboxgl.accessToken = process.env.REACT_APP_TOKEN
  const mapRef = useRef(null)
  const [viewPort, setViewPort] = useState({
    longitude: 138.63,
    latitude: -34.8626,
    width: "100vw",
    height: "100vh",
    bearing: 0,
    pitch: 0,
    zoom: 10.45
  })

  const [fuelMark, setFuelMark] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001/Subscriber/getFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=4")
      .then((data) => {
        setFuelMark(data.data)
      })
      .catch((err) => {
        console.log("err " + err);
      });
  }, []);

  const [fuelPrices, setFuelPrices] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:3001/Price/GetSitesPrices?countryId=21&geoRegionLevel=3&geoRegionId=4`).then(({ data }) => {
      setFuelPrices(data)
    })
      .catch((err) => {
        console.log("err " + err);
      })
  }, []);

  // let fuelReducer = {}
  // // fuelMark.S && Object.keys(fuelMark.S)
  // fuelPrices.SitePrices && Object.keys(fuelPrices.SitePrices).forEach((fuel, index) => {
  //   fuelMark.S[index] = fuelPrices.SitePrices[index]
  // })
  // console.log(fuelMark)
  // console.log(fuelPrices)
  // console.log(fuelReducer)







  const [popupInfo, setPopupInfo] = useState(null);
  // console.log(fuelMark)
  const pins = useMemo(
    () =>
      fuelMark.S && Object.keys(fuelMark.S).map((fuel, index) => {
        // console.log(fuelMark.S[index])
        return (
          < Marker
            key={`marker-${fuel}`}
            longitude={fuelMark.S[index].Lng}
            latitude={fuelMark.S[index].Lat}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(fuelMark.S[index]);
            }}
          >
            <Pin />
          </Marker >
        )
      }
      ), [fuelMark])


  return (
    <>
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_TOKEN}
        {...viewPort}
        maxZoom={20}
        onMove={viewPort => {
          setViewPort(viewPort.viewPort)
        }}
        bearing={0}
        pitch={0}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        style={{ width: "100vw", height: "100vh" }
        }
        ref={mapRef}
      >
        <ScaleControl />
        {/* <ControlPanel /> */}
        {pins}

        {/* {
        clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewPort({
                      ...viewPort,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new MapboxGeocoder({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`crime-${cluster.properties.fuelId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button className="fuel-marker">
                <img src="/fuelLcon" />
              </button>
            </Marker>
          )
        })
      } */}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.Lng)}
            latitude={Number(popupInfo.Lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.N} <br></br>
              {popupInfo.A}, {popupInfo.Postcode}
              {popupInfo.P}

            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </ReactMapGL >

    </>
  )
}