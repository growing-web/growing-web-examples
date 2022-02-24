<template>
	<div class="layout">
		this is the page layout
		<!-- <pre>query:
{{ $route.query }}</pre> -->
		<!-- <pre>{{ $props }}</pre> -->
		<header v-if="header === null">
			this is the default header
		</header>
		<component v-else :is="header"></component>
		<ul class="menu">
			<li><router-link :to="{ name: 'home' }" exact>home</router-link></li>
			<li><router-link :to="{ name: 'page-1' }">page 1</router-link></li>
			<li><router-link :to="{ name: 'page-2' }">page 2</router-link></li>
		</ul>
		<router-view></router-view>
		<footer v-if="footer === null">
			this is the default footer
		</footer>
		<component v-else :is="footer"></component>
	</div>
</template>

<script>
	export default {
  	name: 'layout',
		props: {
			header: {
				required: false,
				default: null
			},
			footer: {
				required: false,
				default: null
			}
		}
	}
</script>
