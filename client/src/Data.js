// creating our class constructor to store all of the calls needed to hit the database to retrieve data used on the front end

export default class Data {

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = `http://localhost:5000` + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`)
      options.headers['Authorization'] = `Basic ${encodedCredentials}`
    }

    return fetch(url, options);
  }

  async getUser(username, password) {
    const res = await this.api(`/api/users`, 'GET', null, true, {username, password})
    if (res.status === 200) {
      return res.json().then(data => data)
    } else if (res.status === 401) {
      return null
    } else {
      throw new Error()
    }
  }

  async createUser(user) {
    const res = await this.api(`/api/users`, 'POST', user)

    if (res.status === 201) {
      return []
    } else if (res.status === 400) {
      return res.json().then(data => {
        return data.errors
      })
    } else {
      throw new Error()
    }
  }

  async createCourse(course, username, password) {

    const res = await this.api(`/api/courses`, 'POST', course, true, {username, password})

    if (res.status === 201) {
      return []
    } else if (res.status === 400) {
      return res.json().then(data => {
        return data.errors
      })
    } else {
      throw new Error()
    }
  }

  async updateCourse(id, course, username, password) {

    const res = await this.api(`/api/courses/${id}`, 'PUT', course, true, {username, password})

    if (res.status === 204) {
      return []
    } else if (res.status === 400) {
      return res.json().then(data => {
        return data.errors
      })
    } else {
      throw new Error()
    }
  }

}