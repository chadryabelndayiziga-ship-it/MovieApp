 <template>
  <div id="app">
    <header class="app-header">
      <div class="recherche-movie">
        <p>MOVIE FLIX</p>
        <form action="" @submit.prevent="handleSearch">
          <input type="text" placeholder="🔍search for movie here" v-model="searchQuery" />
        </form>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      // Emit or navigate to search results
      this.$router.push({ path: '/', query: { search: this.searchQuery } })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-header {
  background: #090b11;
  padding: 20px;
  color: #e2e8f0;
}

.recherche-movie p {
  margin: 0;
  font-size: 15px;

}
</style>