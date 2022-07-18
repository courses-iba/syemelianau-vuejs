<template>
  <div class="login">
    <form class="card">
      <div class="element">
        <label>Username: </label>
        <input
            class="input"
            name="username"
            type="text"
            :value="credentials.username"
            @onChange="e => setCredentials({ ...credentials, username: e.target.value })"
        />
      </div>
      <div class="element">
        <label>Password: </label>
        <input
            class="input"
            name="password"
            type="password"
            :value="credentials.password"
            @onChange="e => setCredentials({ ...credentials, password: e.target.value })"
        />
      </div>
      <div class="element">
        <button class="input button" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    setCredentials(credentials) {
      this.credentials = credentials;
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  padding: 10vh;
}

.login * {
  color: #586069;
}

.card {
  padding: 3vh 10vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  transition: 0.3s;
}

.element {
  display: flex;
  flex-direction: column;
  padding: 1vh 0;
}

.input {
  padding: 1vh;
  background: none;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
}

.button {
  cursor: pointer;
  transition: .3s;
}

.button:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.button:active {
  transition: none;
  background-color: #f1f8ff;
  border-color: #c8e1ff;
}
</style>
