<template>
	<div class="advanced-stagger">
		<div class="animation-wrapper">
			<div class="stagger-visualizer">
				<div class="cursor color-red"></div>
				<div class="dots-wrapper"></div>
			</div>
		</div>
	</div>
</template>

<script>

import anime from 'animejs'

export default {
	name: 'advanced-stagger',
	data: () => ({
		animation: null,
		paused: true,
		grid: [20, 10],
		cell: 55,
		numberOfElements: 200,
		index: anime.random(0, 199),
		nextIndex: 0
	}),
	mounted() {
		var staggerVisualizerEl = this.$el.querySelector('.stagger-visualizer');
		var dotsWrapperEl = staggerVisualizerEl.querySelector('.dots-wrapper');
		var dotsFragment = document.createDocumentFragment();

		this.fitElementToParent(staggerVisualizerEl, 0);

		for (var i = 0; i < this.numberOfElements; i++) {
			var dotEl = document.createElement('div');
			dotEl.classList.add('dot');
			dotsFragment.appendChild(dotEl);
		}

		dotsWrapperEl.appendChild(dotsFragment);


		anime.set('.stagger-visualizer .cursor', {
			translateX: anime.stagger(-this.cell, { grid: this.grid, from: this.index, axis: 'x' }),
			translateY: anime.stagger(-this.cell, { grid: this.grid, from: this.index, axis: 'y' }),
			translateZ: 0,
			scale: 1.5,
		});

		this.play()
	},
	methods: {
		fitElementToParent(el, padding) {
			var timeout = null;
			function resize() {
				if (timeout) clearTimeout(timeout);
				anime.set(el, { scale: 1 });
				var pad = padding || 0;
				var parentEl = el.parentNode;
				var elOffsetWidth = el.offsetWidth - pad;
				var parentOffsetWidth = parentEl.offsetWidth;
				var ratio = parentOffsetWidth / elOffsetWidth;
				timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
			}
			resize();
			window.addEventListener('resize', resize);
		},
		play() {

			this.paused = false;
			if (this.animation) this.animation.pause();

			this.nextIndex = anime.random(0, this.numberOfElements - 1);

			this.animation = anime.timeline({
				easing: 'easeInOutQuad',
				complete: this.play
			})
				.add({
					targets: '.stagger-visualizer .cursor',
					keyframes: [
						{ scale: .75, duration: 120 },
						{ scale: 2.5, duration: 220 },
						{ scale: 1.5, duration: 450 },
					],
					duration: 300
				})
				.add({
					targets: '.stagger-visualizer .dot',
					keyframes: [
						{
							translateX: anime.stagger('-2px', { grid: this.grid, from: this.index, axis: 'x' }),
							translateY: anime.stagger('-2px', { grid: this.grid, from: this.index, axis: 'y' }),
							duration: 100
						}, {
							translateX: anime.stagger('4px', { grid: this.grid, from: this.index, axis: 'x' }),
							translateY: anime.stagger('4px', { grid: this.grid, from: this.index, axis: 'y' }),
							scale: anime.stagger([2.6, 1], { grid: this.grid, from: this.index }),
							duration: 225
						}, {
							translateX: 0,
							translateY: 0,
							scale: 1,
							duration: 1200,
						}
					],
					delay: anime.stagger(80, { grid: this.grid, from: this.index })
				}, 30)
				.add({
					targets: '.stagger-visualizer .cursor',
					translateX: { value: anime.stagger(-this.cell, { grid: this.grid, from: this.nextIndex, axis: 'x' }) },
					translateY: { value: anime.stagger(-this.cell, { grid: this.grid, from: this.nextIndex, axis: 'y' }) },
					scale: 1.5,
					easing: 'cubicBezier(.075, .2, .165, 1)'
				}, '-=800')

			this.index = this.nextIndex;

		},

	}
}
</script>

<style lang='scss'>
	.advanced-stagger {
		position: absolute;
		width: 100%;
		height: 100vh;
	}

	.animation-wrapper {
		width: 100%;
	}

	.stagger-visualizer {
		position: absolute;
		width: 1100px;
		height: 550px;
		transform-origin: left top;
	}

	.stagger-visualizer .dots-wrapper {
		transform: translateZ(0);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	.stagger-visualizer .dot {
		position: relative;
		z-index: 1;
		width: 23px;
		height: 23px;
		margin: 16px;
		background-color: currentColor;
		border-radius: 50%;
	}

	@media (min-width: 740px) {
		.stagger-visualizer .dot {
			background-color: transparent;
			background-image: linear-gradient(180deg, #ffffff 8%, #d3cdc6 100%);
		}
	}

	.stagger-visualizer .cursor {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 37px;
		height: 37px;
		margin: 9px;
		background-color: teal;
		border-radius: 50%;
	}
</style>