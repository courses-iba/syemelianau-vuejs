<template>
  <div class="app">
    <AppHeader title="Vue App" />
    <AppMenu />
    <RouterView />
  </div>
</template>

<script>
import AppMenu from '@/containers/AppMenu';
import AppHeader from '@/containers/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMenu
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.app {
  display: flex;
  flex-direction: column;
}
</style>
