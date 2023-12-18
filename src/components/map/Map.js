import "./Map.scss";
import {useContext, useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";
import mapBoxStyle from "./mapboxstyle.json";
import {MapActionsContext} from "../../contexts/map-actions-context";
import customMarkerTemplate from "../../assets/custom-marker.svg";
import customMarkerSelectedTemplate from "../../assets/custom-marker-selected.svg";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({map}) => {
  const mapContainer = useRef(null);
  const {getZoom, shouldBeDisplayed} = useContext(MapActionsContext);

  useEffect(() => {
    if (!shouldBeDisplayed()) return;
    if (map.current) return;
    const zoom = getZoom();
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapBoxStyle,
      center: [55.5448, -21.1187],
      zoom: zoom,
    });
    map.current.on('load', async () => {
      map.current.addControl(new mapboxgl.NavigationControl({}));

      const width = 25;
      const height = 50;

      const customMarkerImg = new Image(width, height);
      customMarkerImg.onload = () => map.current.addImage('custom-marker', customMarkerImg);
      customMarkerImg.src = customMarkerTemplate;

      const customMarkerSelected = new Image(width, height);
      customMarkerSelected.onload = () => map.current.addImage('custom-marker-selected', customMarkerSelected);
      customMarkerSelected.src = customMarkerSelectedTemplate;
    });
  });

  return (
    <section ref={mapContainer} className="map"/>
  );
};

export default Map;
