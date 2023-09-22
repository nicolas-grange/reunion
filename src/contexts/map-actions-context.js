import React from "react";
import mapboxgl from "mapbox-gl";

const CSS_PRIMARY_COLOR = "#364436";

/*****
 * EXPORTED FUNCTIONS
 *****/
const showHikes = (map, hikes, navigate) => {
  clean(map);
  center(map);
  addHikes(map, hikes, navigate);
};
const showVisits = (map, visits, navigate) => {
  clean(map);
  center(map);
  addVisits(map, visits, navigate);
};
const selectHike = (map, hikes, hike, navigate) => {
  clean(map);
  center(map);
  addHikes(map, hikes, navigate);
  if(!map.current.getLayer(hike.id)) {
    map.current.addLayer({
      id: hike.id,
      type: 'line',
      source: {
        type: 'geojson',
        data: hike.data
      },
      paint:{
        "line-color": CSS_PRIMARY_COLOR,
        "line-width": 4,
        "line-opacity": 0.9
      }
    });
  }
  map.current.flyTo(
    {
      center: [hike.position.longitude, hike.position.latitude],
      duration: 700,
      zoom: 13,
      essential: true
    }
  );
  document.getElementById(hike.id).classList.add("selected");
  scrollTop();
};
const selectVisit = (map, visits, visit, navigate) => {
  clean(map);
  center(map);
  addVisits(map, visits, navigate);
  map.current.flyTo(
    {
      center: [visit.position.longitude, visit.position.latitude],
      duration: 700,
      zoom: 13,
      essential: true
    }
  );
  document.getElementById(visit.id).classList.add("selected");
  scrollTop();
};
const highlightMarker = (map, markerId, center) => {
  if (map && map.current) {
    map.current.flyTo(
      {
        center: center,
        duration: 700,
        essential: true
      }
    );
    document.getElementById(markerId).classList.add("selected");
  }
};
const unHighlightMarker = (map, markerId) => {
  document.getElementById(markerId).classList.remove("selected");
  center(map);
};
const getZoom = () => {
  let zoom = 8.75;
  if(window.matchMedia('(min-width: 600px)').matches) {
    zoom = 9.25;
  }
  if(window.matchMedia('(min-width: 1000px)').matches) {
    zoom=10;
  }
  return zoom;
}
/*****
 * USEFUL FUNCTIONS
 *****/
const clean = (map) => {
  Array.from(map.current.getContainer()
    .getElementsByClassName('mapboxgl-marker'))
    .forEach(marker => marker.remove());
  Array.from(map.current.getContainer()
    .getElementsByClassName('mapboxgl-popup'))
    .forEach(popup => popup.remove());

  if(map && map.current.loaded()) {
    const sources = map.current.getStyle().sources;
    Object.keys(sources)
      .filter(key => key !== "composite")
      .forEach(sourceIdToRemove => {
        map.current.removeLayer(sourceIdToRemove)
        map.current.removeSource(sourceIdToRemove)
      })
  }
};
const center = (map) => {
  const zoom = getZoom();
  map.current.flyTo({
    center: [55.5448, -21.1187],
    zoom: zoom,
    duration: 700,
    essential: true
  });
};
const addHikes = (map, hikes, navigate) => {
  hikes.forEach(hike => {
    const marker = new mapboxgl.Marker({ color: CSS_PRIMARY_COLOR})
      .setLngLat([hike.position.longitude, hike.position.latitude])
      .addTo(map.current);
    const markerElement = marker.getElement();
    markerElement.setAttribute("id", hike.id);
    markerElement.addEventListener('click', (e) => {
      Array.from(map.current.getContainer()
        .getElementsByClassName('mapboxgl-marker'))
        .filter(marker => marker.id !== hike.id)
        .forEach(marker => marker.classList.remove("selected"));
      markerElement.classList.add("selected");
      navigate("/reunion/hikes/" + hike.id);
    });
    const popup = new mapboxgl.Popup({
      offset: [0, -30],
      closeButton: false,
      closeOnClick: false
    });
    markerElement.addEventListener("mouseenter", () => {
      popup
        .setHTML("<p>" + hike.title + "</p>")
        .setLngLat([hike.position.longitude, hike.position.latitude])
        .addTo(map.current);
    });
    markerElement.addEventListener("mouseleave", () => {
      popup.remove();
    });
  });
};
const addVisits = (map, visits, navigate) => {
  visits.forEach(visit => {
    const marker = new mapboxgl.Marker({ color: CSS_PRIMARY_COLOR})
      .setLngLat([visit.position.longitude, visit.position.latitude])
      .addTo(map.current);
    const markerElement = marker.getElement();
    markerElement.setAttribute("id", visit.id);
    markerElement.addEventListener('click', (e) => {
      Array.from(map.current.getContainer()
        .getElementsByClassName('mapboxgl-marker'))
        .filter(marker => marker.id !== visit.id)
        .forEach(marker => marker.classList.remove("selected"));
      marker.getElement().classList.add("selected");
      navigate("/reunion/visits/" + visit.id);
    });
    const popup = new mapboxgl.Popup({
      offset: [0, -30],
      closeButton: false,
      closeOnClick: false
    });
    markerElement.addEventListener("mouseenter", () => {
      popup
        .setHTML("<p>" + visit.title + "</p>")
        .setLngLat([visit.position.longitude, visit.position.latitude])
        .addTo(map.current);
    });
    markerElement.addEventListener("mouseleave", () => {
      popup.remove();
    });
  });
};
const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
export const mapActions = {
  showHikes: showHikes,
  selectHike: selectHike,
  showVisits: showVisits,
  selectVisit: selectVisit,
  highlightMarker: highlightMarker,
  unHighlightMarker: unHighlightMarker,
  getZoom: getZoom,
};

export const MapActionsContext = React.createContext(mapActions);
