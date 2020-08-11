<template>
  <div>
    this is home
    <div>
      <p>{{username}}</p>
      <p>{{password}}</p>
      <h3>{{$store.getters['token']}}</h3>
    </div>
    <button @click="changeName">用户</button>
    <button @click="changePass">密码</button>
  </div>
</template>

<script>

export default {
  computed: {
    username() {
      return this.$store.state.username;
    },
    password() {
      return this.$store.state.password;
    }
  },
  methods: {
    changeName() {
      this.$store.dispatch('SetUserName', `姓名${Math.random()}`);
      
    },
    changePass() {
      this.$store.commit('SetPassword', `**${Math.random()}`)
    }
  }
}
</script>
<style>
</style>