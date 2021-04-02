import { Users } from '../firebase'
import { success, error } from '../helpers/helpers'

export default {
	getProfile: id => new Promise(res => {
		Users.doc(id).get()
			.then(user => res(success({
				...user.data(), id: user.id,
			})))
			.catch(err => res(error(err.message)))
	}),
	updateMe: ({ id, data }) => new Promise(res => {
		Users.doc(id).get()
			.then(user => {
				console.log(user)
				// Query
				let query = user.exists
					? user.ref.update(data)
					: Users.doc(id).set(data)
				// Executing
				query.then(() => res(success()))
					.catch(err => res(error(err.message)))
			})
			.catch(err => res(error(err.message)))
	})
}