<template>
	<div class="wrapper">
		<div class="preloader" />
	</div>
</template>

<script>
export default {
	name: 'PreLoader',
}
</script>

<style lang='scss' scoped>
	$first: #009688;
	$second: #ff8c00;
	$third: #673ab7;

	.wrapper {
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		z-index: 9999;
		height: 100vh;
		position: fixed;
		align-items: center;
		justify-content: center;
		background-color: white;
	}

	.theme--light .wrapper {
		background-color: #eeeef5;
	}

	.preloader {
		display: block;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		border: 5px solid transparent;
		border-top-color: $first;
		position: relative;
		animation: rotating 2.5s infinite ease;
		-webkit-animation: rotating 2.5s infinite linear;
		&:after,
		&:before {
			content: "";
			position: absolute;
			border-radius: inherit;
			border: inherit;
		}
		&:after {
			top: 5px;
			left: 5px;
			width: 180px;
			height: 180px;
			border-top-color: $second;
			animation: rotating 2s infinite ease;
			-webkit-animation: rotating 2s infinite linear;
		}
		&:before {
			top: 15px;
			left: 15px;
			width: 160px;
			height: 160px;
			border-top-color: $third;
			animation: rotating 1.5s infinite ease;
			-webkit-animation: rotating 1.5s infinite linear;
		}
	}

	@keyframes rotating {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@-webkit-keyframes rotating {
		0% {
			transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
			-webkit-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
		}
	}
</style>
