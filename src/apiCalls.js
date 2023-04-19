const fetchAPI = (url) => {
  return fetch(url)
  .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong!')
      }
      return res.json()
    })
};

const fetchAllData = () => {
  return Promise.all([
    fetchAPI('http://localhost:3001/api/v1/travelers'),
    fetchAPI('http://localhost:3001/api/v1/trips'),
    fetchAPI('http://localhost:3001/api/v1/destinations')
  ]);
};

export { fetchAllData };