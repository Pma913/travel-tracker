const fetchAPI = (url) => {
  return fetch(url)
  .then(res => {
      if (!res.ok) {
        throw (res)
      }
      return res.json()
    })
    .catch(err => {
    console.log(err.statusText)
    if (err.status > 400 && err.status < 500) {
      alert("Server is missing!")
    }
  })
};

const fetchAllData = () => {
  return Promise.all([
    fetchAPI('http://localhost:3001/api/v1/trips'),
    fetchAPI('http://localhost:3001/api/v1/destinations')
  ]);
};

const fetchTravelers = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
  .then(res => {
    if (!res.ok) {
      throw (res)
    }
    return res.json()
  })
  .catch(err => {
    console.log(err.statusText)
    if (err.status > 400 && err.status < 500) {
      alert("Server is missing!")
    }
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
        throw (err)
      }
      return res.json()
    })
    .catch(err => {
    console.log(err.statusText)
    if (err.status > 400 && err.status < 500) {
      alert("Server is missing!")
    }
  })
};

const fetchTrips = () => {
  return fetch('http://localhost:3001/api/v1/trips')
  .then(res => {
    if (!res.ok) {
      throw (res)
    }
    return res.json()
  })
  .catch(err => {
    console.log(err.statusText)
    if (err.status > 400 && err.status < 500) {
      alert("Server is missing!")
    }
  })
}

const updateTrip = (tripID ,data) => {
  return fetch(`http://localhost:3001/api/v1/trips/${tripID}`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export { fetchAllData };
export { postTrip };
export { fetchTrips };
export { fetchTravelers };
export { updateTrip };