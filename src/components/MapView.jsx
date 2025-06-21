import React, { useEffect, useRef } from 'react';
import mapboxgl from 'https://esm.sh/mapbox-gl@2.15.0';

mapboxgl.accessToken =
  window.MAPBOX_TOKEN ||
  'pk.eyJ1IjoiZGFyaWVuZWR3YXJkcyIsImEiOiJjbWJ6Y29waTUxeG93MmxwdGZjbzhibTdoIn0.0oLGkv-Zk7J0-ah4aO8dUA';

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

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || locations.length === 0) {
      clearMap();
      return;
    }

    if (!map.isStyleLoaded()) {
      map.once('style.load', () => updateMap(locations));
    } else {
      updateMap(locations);
    }
  }, [locations]);

  const clearMap = () => {
    const map = mapRef.current;
    if (!map) return;

    // Remove markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Remove route
    if (map.getLayer('route-line')) {
      map.removeLayer('route-line');
    }
    if (map.getSource('route')) {
      map.removeSource('route');
    }
  };

  const updateMap = (locations) => {
    const map = mapRef.current;
    if (!map) return;

    clearMap();

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);
      markersRef.current.push(marker);
      bounds.extend([loc.lng, loc.lat]);
    });

    if (locations.length > 1) {
      const routeCoordinates = locations.map((loc) => [loc.lng, loc.lat]);
      const routeData = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoordinates,
        },
      };

      map.addSource('route', {
        type: 'geojson',
        data: routeData,
      });

      map.addLayer({
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

    if (locations.length > 0) {
      map.fitBounds(bounds, {
        padding: 60,
        duration: 800,
        maxZoom: 4.5,
      });
    }
  };

  return <div ref={mapContainer} className="w-full h-full bg-gray-200 rounded-md" />;
};

export default MapView;
