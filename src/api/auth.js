import { Users, GoogleProvider, Auth } from '../firebase'
import { isEmail, isPassword, isName, error, success } from '../helpers/helpers'
import {
	INVALID_EMAIL, INVALID_PASS, UNSUPPORTED_PROVIDER,
	INVALID_NAME, PASS_NOT_MATCH, SIGNUP_FAILED
} from '../consts'

const formatUser = user => ({
	id: user.uid,
	name: user.displayName,
	email: user.email,
	thumbnail: user.photoURL
})

export const onSignedIn = cb => {
	Auth.onAuthStateChanged(user => {
		if (user) {
			let signedUser = formatUser(user)
			if (!signedUser.name) {
				Users.doc(signedUser.id).get()
					.then(userRef => cb({ ...signedUser, ...userRef.data() }))
					.catch(() => cb(signedUser))
			}
			else cb(signedUser)
		}
	})
}
export const onStateChange = cb => {
	Auth.onAuthStateChanged(user => {
		if (user) {
			let signedUser = formatUser(user)
			if (!signedUser.name) {
				Users.doc(signedUser.id).get()
					.then(userRef => cb({ ...signedUser, ...userRef.data() }))
					.catch(() => cb(signedUser))
			}
			else cb(signedUser)
		}
		else { cb() }
	})
}

export const onSignedOut = cb => {
	Auth.onAuthStateChanged(user => !user && cb())
}

export const signout = () => new Promise(resolve => {
	Auth.signOut()
		.then(() => resolve(success()))
		.catch(err => resolve(error(err.message)))
})

export const signin = async ({ provider, email, password } = {}) => {
	if (provider) {
		if (provider !== 'google') return error(UNSUPPORTED_PROVIDER)

		// Signing in with google popup
		return new Promise(resolve => {
			Auth.signInWithPopup(GoogleProvider)
				.then(res => resolve(success(formatUser(res.user))))
				.catch(err => resolve(error(err.message, 'google')))
		})
	}

	// Validating username and password
	if (!email || !isEmail(email)) return error(INVALID_EMAIL, 'email')
	if (!password || !isPassword(password)) return error(INVALID_PASS, 'password')

	// Signing in with email and password
	return new Promise(resolve => {
		Auth.signInWithEmailAndPassword(email, password)
			.then(res => {
				let user = formatUser(res.user)
				if (!user.name) {
					Users.doc(user.id).get()
						.then(userRef => resolve(success({ ...user, ...userRef.data() })))
						.catch(() => resolve(success(user)))
				}
				else resolve(success(formatUser(res.user)))
			})
			.catch(err => resolve(error(err.message)))
	})
}

export const signup = async ({ provider, name, email, password, confirmPassword }) => {

	if (provider) return await signin({ provider })

	// Validating username and password
	if (!name || !isName(name)) return error(INVALID_NAME, 'name')
	if (!email || !isEmail(email)) return error(INVALID_EMAIL, 'email')
	if (!password || !isPassword(password)) return error(INVALID_PASS, 'password')
	if (password !== confirmPassword) return error(PASS_NOT_MATCH, 'confirmPassword')

	// Signing in with email and password
	return new Promise(resolve => {
		Auth.createUserWithEmailAndPassword(email, password)
			.then(res => {
				if (!res.user) return resolve(error(SIGNUP_FAILED))

				let newUser = formatUser(res.user)
				let userId = newUser.id
				delete newUser.id

				Users.doc(userId).set({ ...newUser, name })
					.then(async () => resolve(await signin({ email, password })))
			})
			.catch(err => resolve(error(err.message)))
	})
}