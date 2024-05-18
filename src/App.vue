<template>
  <nav>
    <router-link to="/">home</router-link> |
    <router-link to="/login">login</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/record">Record</router-link> |
    <router-link to="/me">Me</router-link>
  </nav>
  <router-view/>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header{
  display: flex
  ali
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
