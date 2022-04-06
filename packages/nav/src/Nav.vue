<template>
  <div class="app-nav" v-html="nav"></div>
</template>

<script>
import html from './nav.js';

export default {
  data() {
    return {
      nav: html()
    };
  }
};
</script>