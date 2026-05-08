import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { useDashboard } from '../context/DashboardContext';
import 'leaflet/dist/leaflet.css';

// Custom ISS Icon
const issIcon = new L.DivIcon({
  className: 'custom-iss-icon',
  html: `
    <div class="relative w-10 h-10 flex items-center justify-center">
      <div class="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
      <img src="https://cdn-icons-png.flaticon.com/512/2026/2026521.png" class="relative w-8 h-8 z-10" />
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const ISSMap = () => {
  const { issPosition, issHistory } = useDashboard();

  const pathPositions = useMemo(() => {
    return (issHistory || []).map(pos => [pos.lat, pos.lng]);
  }, [issHistory]);

  // Handle initialization states smoothly
  const center = (issPosition && (issPosition.lat !== 0 || issPosition.lng !== 0)) 
    ? [issPosition.lat, issPosition.lng] 
    : [20, 0]; // Default to a broad view of the Atlantic if not loaded

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-[#05070a] overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={2} 
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        
        {pathPositions.length > 1 && (
          <Polyline 
            positions={pathPositions} 
            pathOptions={{ 
              color: '#E03C31', 
              weight: 3, 
              opacity: 0.8,
              lineCap: 'round'
            }} 
          />
        )}

        {issPosition && (issPosition.lat !== 0 || issPosition.lng !== 0) && (
          <Marker position={[issPosition.lat, issPosition.lng]} icon={issIcon}>
            <Popup>
              <div className="p-2 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Current Sector</p>
                <p className="text-sm font-black text-gray-900">{issPosition.location}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default React.memo(ISSMap);
