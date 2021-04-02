<template>
	<v-app class="signin bg-pri">
		<!-- <AdvancedStagger /> -->
		<div class="signin__card shadow">
			<v-card flat :loading="loading" :disabled="loading">
				<div class="px-8 py-12">
					<v-card-title class="title signin__title flex-column"
						>Welcome back!</v-card-title
					>
					<v-card-subtitle class="text-center body-2"
						>Singin with your Email and password</v-card-subtitle
					>
					<v-card-text class="mt-5">
						<v-form
							@submit.prevent="handleSignin"
							v-model="validForm"
							:disabled="loading"
							ref="signinForm"
						>
							<v-text-field
								class="mb-4"
								label="Email Address"
								name="email"
								v-bind="textField"
								v-model="user.email"
								:error="emailError"
								:prepend-inner-icon="$icons.account"
								@keyup="handleKeyUp"
							></v-text-field>
							<v-text-field
								label="Password"
								name="password"
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
									>Singin</v-btn
								>
								<!-- <router-link to="/signup" class="txt-acnt d-block mt-2"
									>Dont's have an account?</router-link
								> -->
							</div>
						</v-form>
						<div class="signin__continue my-5">
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
	name: 'signin',
	components: {
		AdvancedStagger
	},
	data: () => ({

		// Objects
		user: {
			email: '',
			password: ''
		},
		textField: {
			dense: true,
			outlined: true,
			color: "accent",
			'hide-details': true,
			rules: [(v) => !!v || 'Field is required']
		},
		query: {},

		// Booleans
		showPassword: false,
		loading: false,
		passwordError: false,
		emailError: false,
		validForm: true
	}),
	created() {
		if (this.$isAuth) this.$router.replace('/')
		this.query = this.$route.query
	},
	computed: {
		...mapGetters('Auth', ['$isAuth'])
	},
	methods: {
		...mapMutations('Auth', ['setAuthState']),
		...mapActions('Auth', ['signin']),
		handleKeyUp() {
			if (this.passwordError) this.passwordError = false
			else if (this.emailError) this.emailError = false
		},
		handleError(err) {
			if (err.name === 'password') {
				this.passwordError = true
			}
			else if (err.message === 'email') {
				this.emailError = true
			}
			this.loading = false
		},
		async signinWithGoogle() {
			this.handleSignin({ provider: 'google' })
		},
		async handleSignin(config = {}) {

			let valid = !config.provider
				? this.$refs.signinForm.validate()
				: true
			if (!valid) return

			this.loading = true
			this.passwordError = false
			this.emailError = false

			config = config.provider ? config : this.user

			// Signing in user
			let res = await this.signin(config)

			// Handling error
			if (res.error) { return this.handleError(res) }

			this.setAuthState({
				isAuth: true,
				user: res.data
			})

			this.loading = false
			let { ref, step } = this.query
			if (ref) this.$router.replace(`/${ref}${step ? '?step=' + step : ''}`)
			else this.$router.replace('/')
		}
	},
};
</script>

<style lang="scss" type="text/scss" scoped>
	.signin {
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
