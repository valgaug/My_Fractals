const url = 'https://my-fractals-9udx4pbv4-valgaug.vercel.app';
// const url = 'http://localhost:3001';

export const postImage = async (canvas) => {
  let imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  let formData = new FormData();
  formData.append('image', imageBlob, 'image.png');
  let response = await fetch(url + '/image', {
    method: 'POST',
    body: formData,
  });
  let result = await response.json();
  return result;
};

export const getSources = async () => {
  let res = await fetch(url + '/image');
  let buffer_images = await res.text();
  let json_images = JSON.parse(buffer_images);
  let sources = json_images.map((source) => `data:image/png;base64,${source}`);
  let reversed = sources.reverse();
  return reversed;
};
