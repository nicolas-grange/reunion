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
  if (!map.current.getLayer(hike.id)) {
    map.current.addLayer({
      id: "hike-path-" + hike.id,
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
      zoom: 14.5,
      essential: true
    }
  );
  map.current.setLayoutProperty('unclustered-point', 'icon-image', [
    'match',
    ['id'],
    hike.id,
    "custom-marker-selected",
    "custom-marker"
  ]);
  map.current.moveLayer("unclustered-point"); // upgrade z-index
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
      zoom: 14.5,
      essential: true
    }
  );
  map.current.setLayoutProperty('unclustered-point', 'icon-image', [
    'match',
    ['id'],
    visit.id,
    "custom-marker-selected",
    "custom-marker"
  ]);
  map.current.moveLayer("unclustered-point"); // upgrade z-index
  scrollTop();
};
const getZoom = () => {
  let zoom = 8.75;
  if (window.matchMedia('(min-width: 600px)').matches) {
    zoom = 9.25;
  }
  if (window.matchMedia('(min-width: 1000px)').matches) {
    zoom = 10;
  }
  return zoom;
}
/*****
 * USEFUL FUNCTIONS
 *****/
const clean = (map) => {
  if (map && map.current.loaded()) {
    const sources = map.current.getStyle().sources;
    const layers = map.current.getStyle().layers.filter(layer => layer.source != "composite");
    Object.keys(sources)
      .filter(key => key !== "composite")
      .forEach(sourceIdToRemove => {
        layers
          .filter(layer => layer.source && sourceIdToRemove == layer.source)
          .forEach(layer =>  map.current.removeLayer(layer.id));
        map.current.removeSource(sourceIdToRemove);
      });
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
  const hikesSource = map.current.getSource("hikes");
  if (hikesSource) {
    map.current.setLayoutProperty('unclustered-point', 'icon-image', 'custom-marker');
    return;
  }
  map.current.addSource('hikes', {
    type: 'geojson',
    data: buildDataHikes(hikes),
    cluster: true,
    clusterMaxZoom: 16, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  });
  map.current.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'hikes',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': CSS_PRIMARY_COLOR,
      'circle-radius': 22,
      'circle-opacity': 0.75
    }
  });
  map.current.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'hikes',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 14
    },
    paint: {
      'text-color': '#FFFFFF'
    }
  });
  map.current.addLayer({
    id: 'unclustered-point',
    type: 'symbol',
    source: 'hikes',
    filter: ['!', ['has', 'point_count']],
    layout: {
      'icon-image': 'custom-marker'
    },
  });
  map.current.on('click', 'clusters', (e) => {
    if (!map.current.getSource("hikes")) {
      return; // to prevent clicks on other clusters
    }
    const features = map.current.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    });
    const clusterId = features[0].properties.cluster_id;
    map.current.getSource('hikes').getClusterExpansionZoom(
      clusterId,
      (err, zoom) => {
        if (err) return;
        map.current.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom + .2
        });
      }
    );
  });
  map.current.on('click', 'unclustered-point', (e) => {
    navigate("/reunion/hikes/" + e.features[0].properties.id)
  });
  map.current.on('mouseenter', 'unclustered-point', (e) => {
    const hike = e.features[0].properties;
    const position = JSON.parse(hike.position);
    const popup = new mapboxgl.Popup({
      offset: [0, -30],
      closeButton: false,
      closeOnClick: false
    })
      .setHTML("<p>" + hike.title + "</p>")
      .setLngLat([position.longitude, position.latitude])
      .addTo(map.current);
    map.current.on('mouseleave', 'unclustered-point', (e) => {
      popup.remove();
    });
  });
  map.current.on('mouseenter', 'clusters', () => {
    map.current.getCanvas().style.cursor = 'pointer';
  });
  map.current.on('mouseleave', 'clusters', () => {
    map.current.getCanvas().style.cursor = '';
  });
};
const buildDataHikes = (hikes) => {
  const features = []
  hikes.forEach(hike => {
    const feature = {
      type: "Feature",
      id: hike.id,
      properties: hike,
      geometry: {
        type: "Point",
        coordinates: [
          hike.position.longitude,
          hike.position.latitude
        ]
      }
    };
    features.push(feature)
  });
  return {
    type: "FeatureCollection",
    features: features
  }
};
const addVisits = (map, visits, navigate) => {
  const visitsSource = map.current.getSource("visits");
  if (visitsSource) {
    map.current.setLayoutProperty('unclustered-point', 'icon-image', 'custom-marker');
    return;
  }
  map.current.addSource('visits', {
    type: 'geojson',
    data: buildDataVisits(visits),
    cluster: true,
    clusterMaxZoom: 16, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  });
  map.current.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'visits',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': CSS_PRIMARY_COLOR,
      'circle-radius': 22,
      'circle-opacity': .75
    }
  });
  map.current.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'visits',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 14
    },
    paint: {
      'text-color': '#FFFFFF'
    }
  });
  map.current.addLayer({
    id: 'unclustered-point',
    type: 'symbol',
    source: 'visits',
    filter: ['!', ['has', 'point_count']],
    layout: {
      'icon-image': 'custom-marker'
    },
  });
  map.current.on('click', 'clusters', (e) => {
    if (!map.current.getSource('visits')) {
      return; // to prevent clicks on other clusters ngr
    }
    const features = map.current.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    });
    const clusterId = features[0].properties.cluster_id;
    map.current.getSource('visits').getClusterExpansionZoom(
      clusterId,
      (err, zoom) => {
        if (err) return;
        map.current.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom + .2
        });
      }
    );
  });
  map.current.on('click', 'unclustered-point', (e) => {
    navigate("/reunion/visits/" + e.features[0].properties.id)
  });
  map.current.on('mouseenter', 'unclustered-point', (e) => {
    const visit = e.features[0].properties;
    const position = JSON.parse(visit.position);
    const popup = new mapboxgl.Popup({
      offset: [0, -30],
      closeButton: false,
      closeOnClick: false
    })
      .setHTML("<p>" + visit.title + "</p>")
      .setLngLat([position.longitude, position.latitude])
      .addTo(map.current);
    map.current.on('mouseleave', 'unclustered-point', (e) => {
      popup.remove();
    });
  });
  map.current.on('mouseenter', 'clusters', () => {
    map.current.getCanvas().style.cursor = 'pointer';
  });
  map.current.on('mouseleave', 'clusters', () => {
    map.current.getCanvas().style.cursor = '';
  });
};
const buildDataVisits = (visits) => {
  const features = []
  visits.forEach(visit => {
    const feature = {
      type: "Feature",
      id: visit.id,
      properties: visit,
      geometry: {
        type: "Point",
        coordinates: [
          visit.position.longitude,
          visit.position.latitude
        ]
      }
    };
    features.push(feature)
  });
  return {
    type: "FeatureCollection",
    features: features
  }
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
  getZoom: getZoom,
};

export const MapActionsContext = React.createContext(mapActions);
