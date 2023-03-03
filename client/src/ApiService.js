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

export const getSources = async () => {
  let res = await fetch(url + '/image');
  let buffer_images = await res.text();
  let json_images = JSON.parse(buffer_images);
  // var image = new Image();
  let sources = json_images.map((source) => `data:image/png;base64,${source}`);
  // let source = `data:image/png;base64,${json_images[0]}`;
  // console.log(image);
  return sources;
};
