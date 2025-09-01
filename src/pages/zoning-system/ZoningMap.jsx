import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import { mockApplications, mockBarangays } from '../mockdata.jsx';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Submodule4() {
  const [selectedApp, setSelectedApp] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');
  const [showMap, setShowMap] = useState(true);
  const [mapView, setMapView] = useState('satellite'); // satellite, street, zoning

  const zoningTypes = [
    { name: 'R-1 (Residential 1)', color: '#FFFF00', description: 'Single-family detached housing' },
    { name: 'R-2 (Residential 2)', color: '#FFD700', description: 'Multi-family housing, townhouses' },
    { name: 'C-1 (Commercial 1)', color: '#FF0000', description: 'Local retail, neighborhood commercial' },
    { name: 'C-2 (Commercial 2)', color: '#DC143C', description: 'General commercial, office buildings' },
    { name: 'C-3 (Commercial 3)', color: '#B22222', description: 'Central business district, high-rise' },
    { name: 'I-1 (Industrial 1)', color: '#800080', description: 'Light industrial, warehouses' },
    { name: 'I-2 (Industrial 2)', color: '#4B0082', description: 'Heavy industrial, manufacturing' },
    { name: 'Mixed-use', color: '#FF69B4', description: 'Combined residential/commercial' },
    { name: 'Institutional', color: '#0000FF', description: 'Schools, hospitals, government' },
    { name: 'Parks & Recreation', color: '#00FF00', description: 'Parks, open spaces, recreation' },
    { name: 'Transportation & Utilities', color: '#808080', description: 'Roads, utilities, infrastructure' },
    { name: 'Cemetery', color: '#696969', description: 'Cemetery and memorial areas' },
    { name: 'Special Zone', color: '#FF8C00', description: 'Special development areas' }
  ];

  const mockInfrastructures = [
    { type: 'school', name: 'Central Elementary School', distance: '200m', coordinates: { lat: 14.6765, lng: 121.0442 } },
    { type: 'hospital', name: 'District Health Center', distance: '500m', coordinates: { lat: 14.6755, lng: 121.0425 } },
    { type: 'road', name: 'Main Highway', distance: '50m', coordinates: { lat: 14.6770, lng: 121.0440 } },
    { type: 'waterway', name: 'Creek System', distance: '150m', coordinates: { lat: 14.6750, lng: 121.0450 } }
  ];

  const getInfraIcon = (type) => {
    switch (type) {
      case 'school': return '🏫';
      case 'hospital': return '🏥';
      case 'road': return '🛣️';
      case 'waterway': return '🌊';
      default: return '📍';
    }
  };

  const selectedAppData = selectedApp ? mockApplications.find(app => app.refNo === selectedApp) : null;

  return (
    <div className='bg-white dark:bg-slate-900 mx-1 mt-1 p-6 rounded-lg dark:text-slate-300'>
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">Zoning Map & Compliance Tool</h1>
        <p className="text-gray-600 dark:text-gray-400">Visual GIS-style zoning map with compliance assistance</p>
      </div>

      {/* Search Options */}
      <div className="bg-gray-50 dark:bg-slate-800 mb-6 p-6 rounded-lg">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Search Options</h2>
        
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Search by Application
            </label>
            <select
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
            >
              <option value="">Select Application</option>
              {mockApplications.map(app => (
                <option key={app.refNo} value={app.refNo}>
                  {app.refNo} - {app.applicantName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Search by Location/Coordinates
            </label>
            <input
              type="text"
              placeholder="Enter coordinates or address"
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Filter by Barangay
            </label>
            <select
              className="bg-white dark:bg-slate-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
              value={selectedBarangay}
              onChange={(e) => setSelectedBarangay(e.target.value)}
            >
              <option value="">All Barangays</option>
              {mockBarangays.map(barangay => (
                <option key={barangay} value={barangay}>{barangay}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showMap}
              onChange={(e) => setShowMap(e.target.checked)}
              className="mr-2 border-gray-300 rounded focus:ring-blue-500 text-blue-600"
            />
            Show Interactive Map
          </label>

          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">Map View:</span>
            <select
              className="bg-white dark:bg-slate-700 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm"
              value={mapView}
              onChange={(e) => setMapView(e.target.value)}
            >
              <option value="satellite">Satellite</option>
              <option value="street">Street</option>
              <option value="zoning">Zoning Overlay</option>
            </select>
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          {showMap ? (
            <div className="bg-white dark:bg-slate-800 shadow-lg p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-900 dark:text-white text-xl">Interactive Zoning Map</h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">View:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400 text-sm capitalize">{mapView}</span>
                </div>
              </div>
              
              {/* Leaflet Map */}
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg h-[600px] overflow-hidden">
                <MapContainer
                  center={[14.6577, 120.9833]} // Caloocan City center
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    url={mapView === 'satellite' 
                      ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                    attribution={mapView === 'satellite' 
                      ? '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                  />
                  
                  {/* Application Markers */}
                  {mockApplications.map(app => (
                    <Marker 
                      key={app.id} 
                      position={[app.coordinates.lat, app.coordinates.lng]}
                    >
                      <Popup>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">{app.refNo}</div>
                          <div className="text-gray-600">{app.applicantName}</div>
                          <div className="text-gray-500">{app.lotLocation}</div>
                          <div className="text-gray-500">{app.barangay}</div>
                          <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                            app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'For Compliance' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Sample Zoning Polygons for Caloocan */}
                  {mapView === 'zoning' && (
                    <>
                      {/* R-1 Residential Zone - Grace Park Area */}
                      <Polygon
                        positions={[
                          [14.6507, 120.9677],
                          [14.6520, 120.9690],
                          [14.6510, 120.9700],
                          [14.6497, 120.9687]
                        ]}
                        color="#FFFF00"
                        fillColor="#FFFF00"
                        fillOpacity={0.4}
                      >
                        <Popup>
                          <div className="text-sm">
                            <div className="font-semibold">R-1 (Residential 1)</div>
                            <div>Grace Park East Area</div>
                            <div className="text-gray-600">Single-family detached housing</div>
                          </div>
                        </Popup>
                      </Polygon>

                      {/* C-2 Commercial Zone - Monumento Area */}
                      <Polygon
                        positions={[
                          [14.6539, 120.9843],
                          [14.6550, 120.9860],
                          [14.6530, 120.9870],
                          [14.6520, 120.9853]
                        ]}
                        color="#DC143C"
                        fillColor="#DC143C"
                        fillOpacity={0.4}
                      >
                        <Popup>
                          <div className="text-sm">
                            <div className="font-semibold">C-2 (Commercial 2)</div>
                            <div>Monumento Area</div>
                            <div className="text-gray-600">General commercial, office buildings</div>
                          </div>
                        </Popup>
                      </Polygon>

                      {/* I-1 Industrial Zone - Bagong Silang */}
                      <Polygon
                        positions={[
                          [14.7324, 121.0120],
                          [14.7340, 121.0140],
                          [14.7320, 121.0160],
                          [14.7304, 121.0140]
                        ]}
                        color="#800080"
                        fillColor="#800080"
                        fillOpacity={0.4}
                      >
                        <Popup>
                          <div className="text-sm">
                            <div className="font-semibold">I-1 (Industrial 1)</div>
                            <div>Bagong Silang Area</div>
                            <div className="text-gray-600">Light industrial, warehouses</div>
                          </div>
                        </Popup>
                      </Polygon>

                      {/* R-2 Residential Zone - Tala Area */}
                      <Polygon
                        positions={[
                          [14.7612, 121.0123],
                          [14.7625, 121.0135],
                          [14.7615, 121.0145],
                          [14.7602, 121.0133]
                        ]}
                        color="#FFD700"
                        fillColor="#FFD700"
                        fillOpacity={0.4}
                      >
                        <Popup>
                          <div className="text-sm">
                            <div className="font-semibold">R-2 (Residential 2)</div>
                            <div>Tala Area</div>
                            <div className="text-gray-600">Multi-family housing, townhouses</div>
                          </div>
                        </Popup>
                      </Polygon>

                      {/* Institutional Zone - Near Tala Hospital */}
                      <Polygon
                        positions={[
                          [14.7590, 121.0110],
                          [14.7600, 121.0120],
                          [14.7595, 121.0130],
                          [14.7585, 121.0120]
                        ]}
                        color="#0000FF"
                        fillColor="#0000FF"
                        fillOpacity={0.4}
                      >
                        <Popup>
                          <div className="text-sm">
                            <div className="font-semibold">Institutional</div>
                            <div>Tala Hospital Area</div>
                            <div className="text-gray-600">Hospitals, government facilities</div>
                          </div>
                        </Popup>
                      </Polygon>

                      {/* Mixed-use Zone - Camarin */}
                      <Polygon
                        positions={[
                          [14.7595, 121.0458],
                          [14.7610, 121.0470],
                          [14.7600, 121.0480],
                          [14.7585, 121.0468]
                        ]}
                        color="#FF69B4"
                        fillColor="#FF69B4"
                        fillOpacity={0.4}
                      >
                        <Popup>
                          <div className="text-sm">
                            <div className="font-semibold">Mixed-use</div>
                            <div>Camarin Area</div>
                            <div className="text-gray-600">Combined residential/commercial</div>
                          </div>
                        </Popup>
                      </Polygon>
                    </>
                  )}
                </MapContainer>
              </div>

              {/* Map Controls */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-gray-500 dark:text-gray-400 text-xs">
                  Click markers for application details • Toggle zoning overlay in Map View dropdown
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-slate-800 p-12 rounded-lg text-center">
              <p className="text-gray-500 dark:text-gray-400">Map view disabled</p>
              <button
                onClick={() => setShowMap(true)}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Enable map view
              </button>
            </div>
          )}
        </div>

        {/* Sidebar with Legend and Analysis */}
        <div className="space-y-6">
          {/* Zoning Legend */}
          <div className="bg-white dark:bg-slate-800 shadow p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Zoning Legend</h3>
            <div className="space-y-3">
              {zoningTypes.map((zone) => (
                <div key={zone.name} className="flex items-center gap-3">
                  <div 
                    className="rounded w-4 h-4"
                    style={{ backgroundColor: zone.color }}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{zone.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{zone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Features */}
          {selectedAppData && (
            <div className="bg-white dark:bg-slate-800 shadow p-6 rounded-lg">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Compliance Analysis</h3>
              
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 border-green-500 border-l-4 rounded-lg">
                  <p className="font-medium text-green-800 dark:text-green-300">Zoning Match</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    {selectedAppData.intendedUse} use is allowed in {selectedAppData.aiSuggestion.predictedZone}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 border-blue-500 border-l-4 rounded-lg">
                  <p className="font-medium text-blue-800 dark:text-blue-300">Buffer Analysis</p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">
                    Lot is within acceptable distance from major infrastructure
                  </p>
                </div>

                {selectedAppData.complianceChecks.landUseType.status === 'conflict' && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 border-red-500 border-l-4 rounded-lg">
                    <p className="font-medium text-red-800 dark:text-red-300">⚠️ Zoning Conflict</p>
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {selectedAppData.complianceChecks.landUseType.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Nearby Infrastructure */}
          <div className="bg-white dark:bg-slate-800 shadow p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Nearby Infrastructure</h3>
            <div className="space-y-3">
              {mockInfrastructures.map((infra, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-slate-700 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getInfraIcon(infra.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{infra.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs capitalize">{infra.type}</p>
                    </div>
                  </div>
                  <span className="font-medium text-blue-600 dark:text-blue-400 text-sm">{infra.distance}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 mt-4 p-3 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-300 text-xs">
                <strong>Note:</strong> All distances are measured from the lot center point. 
                Specific buffer requirements may apply based on zoning regulations.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 shadow p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">Quick Actions</h3>
            <div className="space-y-2">
              <button className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 px-3 py-2 rounded w-full text-blue-700 dark:text-blue-300 text-left">
                📊 Generate Compliance Report
              </button>
              <button className="bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 px-3 py-2 rounded w-full text-green-700 dark:text-green-300 text-left">
                📥 Export Map View
              </button>
              <button className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 px-3 py-2 rounded w-full text-purple-700 dark:text-purple-300 text-left">
                🔍 Detailed Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
