const startingLatLng = [21.5513258, -79.6017351];

// get data via API
const sheetID = "1H3_TcEnKoa5stq5hyfPMSIIrHToY6DOKJ-RPZHLBfSs";
const tabIndex = "1";
const endpoint = `https://opensheet.elk.sh/${sheetID}/${tabIndex}`;

async function getData() {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  return response.json();
}
