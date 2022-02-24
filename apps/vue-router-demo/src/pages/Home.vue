<template>
	<div class="page">
		This is the homepage.<br>It has default header and footer.
	</div>
</template>

<script>
	export default {
  	name: 'home-page',
		beforeRouteLeave (to, from, next) {
			this.$dialog.confirm('Do you want to proceed?')
			.then(function () {
				next();
			})
			.catch(function () {
				next(false);
			});
		}
	}
</script>
