export const isEmail = email => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export const isPassword = pass => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
	return re.test(pass)
}

export const isName = name => {
	return /^([a-zA-Z ]){2,30}$/.test(name)
}

export const error = (message, name) => {
	let response = {
		error: true,
		message
	}
	if (name) response.name = name
	return response
}

export const success = (data = {}, message = '') => {
	return {
		data,
		message,
		error: false,
	}
}

export const handle = (func, ...params) => {
	return new Promise(reslove => {
		func(...params)
			.then(reslove)
			.catch(e => {
				reslove({
					error: true,
					response: e,
					message: e.message
				})
			})
	})
}

export function setQuery(params) {
	if (history.pushState) {
		let { search, protocol, host, pathname } = window.location
		let qs = new URLSearchParams(search);
		Object.entries(params).forEach(([key, value]) => qs.set(key, value))
		let newurl = protocol + "//" + host + pathname + '?' + qs.toString();
		history.pushState({ path: newurl }, '', newurl);
	}
}

export function deleteQuery() {
	if (history.pushState) {
		let { protocol, host, pathname } = window.location
		let newurl = protocol + "//" + host + pathname;
		history.pushState({ path: newurl }, '', newurl);
	}
}

export function isEmpty(data) {
	if (!data) return true
	if (Array.isArray(data)) return data.length === 0
	return data.constructor === Object && Object.keys(data).length === 0
}