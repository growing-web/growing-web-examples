<template>
	<div class="page">
		This is page 1.<br>It has custom header and no footer.
	</div>
</template>

<script>
	export default {
    name: 'page-1',
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
