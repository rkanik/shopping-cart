<template>
	<v-app>
		<v-main class="bg-pri">
			<v-container class="center">
				<v-row>
					<v-col cols="12" md="8" class="mx-auto">
						<v-img src="../assets/images/404.svg" />
						<div class="text-center py-10">
							<h1 class="">Page Not Found</h1>
							<router-link to="/">Go back to Dashboard</router-link>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'not-found',
};
</script>
