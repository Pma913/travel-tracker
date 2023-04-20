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
    // fetchAPI('http://localhost:3001/api/v1/travelers'),
    fetchAPI('http://localhost:3001/api/v1/trips'),
    fetchAPI('http://localhost:3001/api/v1/destinations')
  ]);
};

const fetchTravelers = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
  .then(res => {
    if (!res.ok) {
      throw new Error('Something went wrong!')
    }
    return res.json()
  })
}

const postTrip = (data) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong!')
      }
      return res.json()
    })
};

const fetchTrips = () => {
  return fetch('http://localhost:3001/api/v1/trips')
  .then(res => {
    if (!res.ok) {
      throw new Error('Something went wrong!')
    }
    return res.json()
  })
}

export { fetchAllData };
export { postTrip };
export { fetchTrips };
export { fetchTravelers };