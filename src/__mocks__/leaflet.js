const leaflet = jest.genMockFromModule(`leaflet`);

leaflet.icon = jest.fn();
leaflet.map = jest.fn().mockReturnValue({
  setView: jest.fn()
});
leaflet.tileLayer = jest.fn().mockReturnValue({
  addTo: jest.fn()
});
leaflet.marker = jest.fn().mockReturnValue({
  addTo: jest.fn()
});

export default leaflet;
