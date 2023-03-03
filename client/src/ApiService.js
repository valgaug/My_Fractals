const url = 'http://localhost:3001';

// async function submitToServer() {
//   let imageBlob = await new Promise((resolve) =>
//     canvas.toBlob(resolve, 'image/png')
//   );

//   let formData = new FormData();
//   formData.append('image', imageBlob, 'image.png');

//   // modify the url accordingly
//   let response = await fetch('http://localhost:8000/image', {
//     method: 'POST',
//     body: formData,
//   });

//   // convert the response to json, modify it accordingly based on the returned response from your remote server
//   let result = await response.json();
// }

export const postEvent = async (event) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  };
  await fetch(url + '/event', requestOptions);
};

export const getEvents = async () => {
  let res = await fetch(url + '/event');
  let events = await res.json();
  return events;
};
