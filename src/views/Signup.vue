<template>
	<v-app class="signup bg-pri">
		<!-- <AdvancedStagger /> -->
		<div class="signup__card shadow">
			<v-card flat :loading="loading" :disabled="loading">
				<div class="px-8 py-12">
					<v-card-title class="title signup__title flex-column"
						>Create an acoount</v-card-title
					>
					<v-card-subtitle class="text-center body-2"
						>Please fill up the form carefully and click
						Signup</v-card-subtitle
					>
					<v-card-text class="mt-5">
						<v-form
							@submit.prevent="handleSignup"
							v-model="validForm"
							:disabled="loading"
							ref="signinForm"
						>
							<v-text-field
								class="mb-4"
								label="Full Name"
								v-bind="textField"
								v-model="user.displayName"
								:error="nameError"
								:prepend-inner-icon="$icons.name"
								@keyup="handleKeyUp"
							></v-text-field>
							<v-text-field
								class="mb-4"
								label="Email Address"
								v-bind="textField"
								v-model="user.email"
								:error="emailError"
								:prepend-inner-icon="$icons.account"
								@keyup="handleKeyUp"
							></v-text-field>
							<v-text-field
								class="mb-4"
								label="Phone Number"
								v-bind="textField"
								v-model="user.phone"
								:error="phoneError"
								:prepend-inner-icon="$icons.phone"
								@keyup="handleKeyUp"
							></v-text-field>
							<v-text-field
								label="Password"
								v-model="user.password"
								v-bind="textField"
								:error="passwordError"
								:type="showPassword ? 'text' : 'password'"
								:prepend-inner-icon="$icons.lock"
								:append-icon="showPassword ? $icons.eye : $icons.eyeOff"
								@keyup="handleKeyUp"
								@click:append="showPassword = !showPassword"
							></v-text-field>
							<div class="text-center mt-8">
								<v-btn
									block
									type="submit"
									class="shadow"
									color="accent"
									:loading="loading"
									>Signup</v-btn
								>
								<router-link to="/signin" class="txt-acnt d-block mt-2"
									>Already have an account?</router-link
								>
							</div>
						</v-form>
						<div class="signup__continue my-5">
							<p class="text body-2">OR</p>
							<div class="line"></div>
						</div>
						<v-btn dark block color="#E43A39" @click="signinWithGoogle"
							><v-icon left>{{ $icons.google }}</v-icon
							>Continue with Google</v-btn
						>
					</v-card-text>
				</div>
			</v-card>
			<!-- </div> -->
		</div>
		<!-- <div class="bg-image"></div> -->
	</v-app>
</template>

<script>

//import api from '../api'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AdvancedStagger from '@/components/anime/AdvancedStagger';

export default {
	name: 'Signup',
	components: {
		AdvancedStagger
	},
	data: () => ({

		// Objects
		user: {
			email: '',
			password: '',
			displayName: '',
			phone: ''
		},
		textField: {
			dense: true,
			outlined: true,
			color: "accent",
			'hide-details': true,
			rules: [(v) => !!v || 'Field is required']
		},

		// Booleans
		showPassword: false,
		loading: false,
		passwordError: false,
		emailError: false,
		nameError: false,
		phoneError: false,
		validForm: true
	}),
	methods: {
		...mapMutations('Auth', ['setAuthState']),
		...mapActions('Auth', ['signup']),
		handleKeyUp() {
			if (this.passwordError) this.passwordError = false
			else if (this.emailError) this.emailError = false
			else if (this.nameError) this.nameError = false
			else if (this.phoneError) this.phoneError = false
		},
		handleError(err) {
			if (err.message === 'Incorrect password!') {
				this.passwordError = true
			}
			else if (err.message === 'User not found!') {
				this.emailError = true
			}
			this.loading = false
		},
		async signinWithGoogle() {
			// Signing in user
			let res = await this.signup({ provider: 'google' })
			console.log(res)
		},
		async handleSignup(config = {}) {

			let valid = this.$refs.signinForm.validate()
			if (!valid) return

			this.loading = true
			this.passwordError = false
			this.emailError = false
			this.nameError = false
			this.phoneError = false

			// Signing in user
			let res = await this.signup(config)

			// // Handling error
			// if (err) { return this.handleError(err) }

			// this.setAuthState({
			// 	isAuthenticated: true,
			// 	currentUser: res.user,
			// 	expiresIn: res.expiresIn,
			// 	accessToken: res.accessToken
			// })

			// this.$cookies.set([
			// 	{ key: 'access-token', value: res.accessToken, time: res.expiresIn },
			// 	{ key: 'is-authenticated', value: true, time: res.expiresIn },
			// ])

			// this.loading = false
			// this.$router.replace('/')
		}
	},
};
</script>

<style lang="scss" type="text/scss" scoped>
	.signup {
		&__card {
			@include center;
			@include on("mobile") {
				width: 96%;
			}
		}
		&__continue {
			position: relative;
			.line {
				height: 2px;
				width: 100%;
				background-color: var(--divider);
			}
			.text {
				position: absolute;
				background-color: var(--bg-secondary);
				padding: 0.2rem 1rem;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				white-space: nowrap;
			}
		}
	}
</style>
