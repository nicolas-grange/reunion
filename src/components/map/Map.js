import "./Map.scss";
import {useContext, useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";
import mapBoxStyle from "./mapboxstyle.json";
import {MapActionsContext} from "../../contexts/map-actions-context";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({map}) => {
  const mapContainer = useRef(null);
  const {getZoom} = useContext(MapActionsContext);

  useEffect(() => {
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
    });
  });

  return (
    <section ref={mapContainer} className="map"/>
  );
};

export default Map;
