import store from 'store-js';
import moment from 'moment';
const apiUrl = window.location.origin.includes('localhost') ? 'http://localhost:8080' : window.location.origin;

export default class Context {

  static fetchWrapper(url, params) {
    /*
      Wraps all requests with headers, cors, and
      determines if reponse was succesful or API threw and error
    */
    const headers = {'Content-Type': 'application/json', 'authorization': `JWT ${store.get('token')}`};
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

  static fetchUploadWrapper(url, params) {
    /*
      Wraps all requests with headers, cors, and
      determines if reponse was succesful or API threw and error
    */
    const headers = {'authorization': `JWT ${store.get('token')}`};
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
    return new Promise((resolve, reject) => {
      if (!values && store.get('token')) {
        this
          .fetchWrapper('/auth/profile', { method: 'GET' })
          .then((json) => { resolve(json) })
          .catch((e) => { reject(e) });
      } else if (values) {
        this
          .fetchWrapper('/auth/login', { method: 'POST', body: JSON.stringify(values) })
          .then((json) => { resolve(json) })
          .catch((e) => { reject(e) });
      } else {
        window.location.href = '/login';
      }
    });
  }

  static editProfile = (values) => {
    return new Promise((resolve, reject) => {
      if (values.file) {
        const data = new FormData();
        Object.keys(values).forEach(key => {
          if (key === 'info' || key === 'hobbies' || key === 'favorites') {
            data.append(key, JSON.stringify(values[key]));
          } else {
            data.append(key, values[key]);
          }
        });
        this
          .fetchUploadWrapper('/profile/edit', { method: 'PUT', body: data })
          .then((json) => resolve(json))
          .catch((e) => reject(e));
      } else {
        this
          .fetchWrapper('/profile/edit', { method: 'PUT', body: JSON.stringify(values) })
          .then((json) => { resolve(json) })
          .catch((e) => { reject(e) });
      }
    })
  }

  static formatDateTime(object) {
    return moment(object).format('MMM M, YYYY h:mm a')
  }

  static fullName(object) {
    if (object.firstName) {
      return `${object.firstName} ${object.lastName}`;
    }
    return '';
  }

  static debounce(func, wait, immediate) {
    let timeout;
    return function() {
      // Get arguments passed into debounce method
      let context = this, args = arguments;
      // Define a function to run at end of waiting period
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }
      // Determine if we want to call function before timeout finishes
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }
  // End Class
}
