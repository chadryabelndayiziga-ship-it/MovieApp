<template>
  <div id="app">
    <header class="app-header">
      <div class="recherche-movie">
        <p>MOVIE FLIX</p>
        <input type="text" placeholder="🔍 Rechercher un film..." v-model="searchQuery" @input="handleSearch" class="search-input" />
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
  padding: 15px;
  color: #e2e8f0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.recherche-movie {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.recherche-movie p {
  margin: 0;
  font-size: 18px sans-serif;
  font-weight: 700;
  color: #f87e38;
  white-space: normal;
  flex-shrink: 0;
}

.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.search-input {
  padding: 8px 14px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  font-size: 13px;
  outline: none;
  transition: all 0.3s ease;
  width: clamp(170px, 40vw, 280px);
  flex-shrink: 0;
  margin-right: 0;
}

.search-input:focus {
  border-color: #38bdf8;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
}

.search-input::placeholder {
  color: #94a3b8;
}

@media (max-width: 600px) {
  .recherche-movie {
    flex-direction: column;
    align-items: stretch;
  }

  .recherche-movie p {
    width: 100%;
    text-align: left;
  }

  .search-input {
    width: 100%;
    max-width: 100%;
  }
}
</style>