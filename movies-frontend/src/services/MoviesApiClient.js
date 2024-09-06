const BASE_URL = 'http://localhost:3000/';

const buildSearchQuery = (query) => {
  return new URLSearchParams(query).toString();
};

const request = async (resource, { method, data, token } = {}) => {
  const headers = {
    'Content-type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${BASE_URL}${resource}`, {
    method: method || 'GET',
    headers,
    ...(data && { body: JSON.stringify(data) }),
  });

  return response;
};

const post = (resource, data, token) => {
  return request(resource, { method: 'POST', data, token });
};

const put = (resource, data, token) => {
  return request(resource, { method: 'PUT', data, token });
};

const get = (resource, query = {}, token) => {
  const queryString = buildSearchQuery(query);
  const urLSearch = queryString ? `${resource}?${queryString}` : resource;
  
  return request(urLSearch, { method: 'GET', token });
};

const del = (resource, token) => {
  return request(resource, { method: 'DELETE', token });
};

export { 
    post, 
    put, 
    get, 
    del 
};