import React, { useEffect, useRef } from 'react';
import mapboxgl from 'https://esm.sh/mapbox-gl@2.15.0';

mapboxgl.accessToken = window.MAPBOX_TOKEN || 'pk.eyJ1IjoiZGFyaWVuZWR3YXJkcyIsImEiOiJjbWJ6Y29waTUxeG93MmxwdGZjbzhibTdoIn0.0oLGkv-Zk7J0-ah4aO8dUA';

const MapView = ({ locations = [] }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 20],
      zoom: 1.2,
    });
    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const validLocations = Array.isArray(locations)
      ? locations.filter(
          (l) => typeof l.lat === 'number' && typeof l.lng === 'number'
        )
      : [];

    // remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const routeCoordinates = [];

    validLocations.forEach((loc) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([loc.lng, loc.lat])
        .setPopup(new mapboxgl.Popup().setText(loc.name))
        .addTo(mapRef.current);
      markersRef.current.push(marker);
      routeCoordinates.push([loc.lng, loc.lat]);
    });

    const drawRoute = () => {
      const routeData = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoordinates,
        },
      };

      if (mapRef.current.getSource('route')) {
        mapRef.current.getSource('route').setData(routeData);
      } else {
        mapRef.current.addSource('route', {
          type: 'geojson',
          data: routeData,
        });

        mapRef.current.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#ff7e5f',
            'line-width': 4,
          },
        });
      }
    };

    if (mapRef.current.loaded()) {
      drawRoute();
    } else {
      mapRef.current.once('load', drawRoute);
    }
  }, [locations]);

  // Temporary background color helps detect zero-height containers
  return <div ref={mapContainer} className="w-full h-full bg-gray-200" />;
};

export default MapView;
