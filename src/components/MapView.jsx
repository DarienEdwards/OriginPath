import React, { useEffect, useRef } from 'react';
import mapboxgl from 'https://esm.sh/mapbox-gl@2.15.0';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;


const MapView = ({ locations = [] }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const routeLayerId = 'route-line';
  const routeSourceId = 'route';

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
    if (!map || !map.isStyleLoaded()) return;

    // Clear old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Remove existing route layer and source
    if (map.getLayer(routeLayerId)) {
      map.removeLayer(routeLayerId);
    }
    if (map.getSource(routeSourceId)) {
      map.removeSource(routeSourceId);
    }

    // Don't render if nothing selected
    if (!locations.length) return;

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
      const marker = new mapboxgl.Marker()
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);
      markersRef.current.push(marker);
      bounds.extend([loc.lng, loc.lat]);
    });

    const routeCoordinates = locations.map(loc => [loc.lng, loc.lat]);

    const routeData = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates,
      },
    };

    map.addSource(routeSourceId, {
      type: 'geojson',
      data: routeData,
    });

    map.addLayer({
      id: routeLayerId,
      type: 'line',
      source: routeSourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#ff7e5f',
        'line-width': 4,
      },
    });

    // Fit map to route
    if (locations.length > 1) {
      map.fitBounds(bounds, {
        padding: 60,
        duration: 800,
        maxZoom: 4.5,
      });
    } else {
      map.flyTo({
        center: [locations[0].lng, locations[0].lat],
        zoom: 4,
        duration: 800,
      });
    }
  }, [locations]);

  return <div ref={mapContainer} className="w-full h-full rounded-md bg-gray-200" />;
};

export default MapView;
