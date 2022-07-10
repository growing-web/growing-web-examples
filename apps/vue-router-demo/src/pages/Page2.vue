<template>
	<div class="page">
		This is page 2.<br>It has custom footer.
	</div>
</template>

<script>
	export default {
    name: 'page-2',
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
