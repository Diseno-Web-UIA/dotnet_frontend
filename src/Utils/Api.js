import axios from 'axios';
export default async function apiRequest(ruta, body, params, metodo) {
  const url = `https://api.server.asralabs.com/api/${ruta}`;
  const req = await axios.request({
    url,
    method: metodo,
    params,
    data: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    },
    timeout: 1e4,
  });
  return req.data;
}