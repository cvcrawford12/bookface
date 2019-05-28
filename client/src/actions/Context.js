import store from 'store-js';
const apiUrl = 'http://localhost:8080';
export default class Context {

  static fetchWrapper(url, params) {
    /*
      Wraps all requests with headers, cors, and
      determines if reponse was succesful or API threw and error
    */
    const headers = {'Content-Type': 'application/json', 'authorization': `JWT ${store.get('token')}`};
    console.log(store.get('token'));
    return fetch(`${apiUrl}${url}`, {
      headers,
      mode: 'cors',
      ...params
    }).then(response => {
      return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
      });
    })
  }

  static loginUser = (values = null) => {
    console.log(values);
    return new Promise((resolve, reject) => {
      if (!values && store.get('token')) {
        this.fetchWrapper('/auth/profile', {
          method: 'GET'
        }).then((json) => {
          resolve(json);
        })
        .catch((e) => {
          reject(e);
        })
      } else if (values) {
        this.fetchWrapper('/auth/login', {
          method: 'POST',
          body: JSON.stringify(values)
        })
        .then((json) => {
          resolve(json);
        })
        .catch((e) => {
          reject(e);
        })
      } else {
        window.location.href = '/login';
      }
    });
  }
  // End Class
}
