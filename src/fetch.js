
import obj2Query from './obj2Query'
const getConstructorName = (obj)=>{
    return Object.prototype.toString.call(obj).slice(8,-1) === 'Object'
}
export default function fetch (url, options = {}) {

    options.headers = {
        'Authorization': '1',
        ...(options.headers || {})
    }

    options.method = (options.method || 'GET').toUpperCase()

    if (getConstructorName(options.query)) {
        url += obj2Query(options.query)
    }

    if (getConstructorName(options.body)) {
        options.headers['Content-type'] = options.headers['Content-type'] || 'application/json; charset=UTF-8'
        options.body = JSON.stringify(options.body)
    }
  options.mode = 'cors'
    delete options.query

    return window.fetch(`http://10.10.11.153:1000/${url}`, options).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Failed to fetch')
        }
    })
}
