<template>
  <div class="movie-app-shell">
    <div class="movie-filters">
      <h3>Genres</h3>
      <button @click="filter = 'all'" :class="filter === 'all' ? 'filter-active' : ''">All</button>
      <button @click="filter = 'Sci-Fi'" :class="filter === 'Sci-Fi' ? 'filter-active' : ''">Sci-Fi</button>
      <button @click="filter = 'Action'" :class="filter === 'Action' ? 'filter-active' : ''">Action</button>
      <button @click="filter = 'Drama'" :class="filter === 'Drama' ? 'filter-active' : ''">Drama</button>
      <button @click="filter = 'Adventure'" :class="filter === 'Adventure' ? 'filter-active' : ''">Adventure</button>
    </div>
    
    <div class="movie-list">
       
      <div class="movie-card" v-for="movie in filteredMovies" :key="movie.title" >
        <img :src="movie.image" :alt="movie.title" class="movie-square-avatar" />
        <div class="movie-info">
          <div class="movie-header">
            <div>
              <h2>{{ movie.title }}</h2>
              <p class="movie-subtitle">{{ movie.genre }}</p>
            </div>
            <button class="movie-watch" @click="watchMovie(movie)">
              Watch
            </button>
            <button 
              class="movie-favorite" 
              :class="movie.favorite ? 'movie-active' : ''" 
              aria-label="Favorite"
              @click="toggleFavorite(movie.title)">
              ★
            </button>
          </div>
          <div class="movie-tags">
            <span class="movie-tag">{{ movie.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { movies } from '../data/movies'

export default {
  data() {
    return {
      searchQuery: '',
      filter: 'all',
      movies
    }
  },
  mounted() {
    // Initialize searchQuery from URL query parameter
    if (this.$route.query.search) {
      this.searchQuery = this.$route.query.search
    }
  },
  watch: {
    '$route.query.search'(newSearch) {
      this.searchQuery = newSearch || ''
    }
  },
  computed: {
    filteredMovies() {
      let filtered = this.movies
      if (this.filter !== 'all') {
        filtered = filtered.filter((movie) => movie.genre.includes(this.filter))
      }
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(query) ||
          movie.genre.toLowerCase().includes(query) ||
          movie.description.toLowerCase().includes(query)
        )
      }
      return filtered
    }
  },
  methods: {
    toggleFavorite(title) {
      const movieIndex = this.movies.findIndex((movie) => movie.title === title)
      if (movieIndex !== -1) {
        this.movies[movieIndex].favorite = !this.movies[movieIndex].favorite
      }
    },
    watchMovie(movie) {
      const index = this.movies.findIndex((m) => m.title === movie.title)
      if (index !== -1) {
        this.$router.push('/watch/' + index)
      }
    }
  }     
}
</script>

<style>
:root {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100vh;
  margin: 0;
}

body {
  background: #090b11;
  color: #e2e8f0;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.movie-app-shell {
  min-height: 100vh;
  background: radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 28%),
    linear-gradient(180deg, #090b11 0%, #02040b 100%);
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
}

.movie-filters {
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: sticky;
  top: 2rem;
  background-color: rgba(135, 142, 154, 0.16);
  height: 100%;
  border-radius: 15px;
  padding: 2.5rem 1rem;
}

.movie-filters h3 {
  margin: 0 0 1rem 0;
  color: #e2e8f0;
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.movie-filters button {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.12);
  color: #94a3b8;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 180ms ease;
}

.movie-filters button:hover {
  background: rgba(15, 23, 42, 1);
  border-color: rgba(56, 189, 248, 0.3);
  color: #38bdf8;
}

.movie-filters button.filter-active {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  border-color: #38bdf8;
  color: #0f172a;
  font-weight: 600;
  
}
 
.movie-list {
  flex: 1;
  max-width: 900px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.movie-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.12);
  padding: 1rem;
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.22);
  transition: transform 180ms ease, border-color 180ms ease;
  border-radius: 15px;
  min-width: 0;
}

.movie-card:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 189, 248, 0.3);
}

.movie-square-avatar {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid rgba(148, 163, 184, 0.18);
  background: #0f172a;
}

.movie-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.movie-header {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: flex-start;
}

.movie-header h2 {
  margin: 0;
  font-size: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: aliceblue;
}

.movie-subtitle {
  margin: 0.35rem 0 0;
  color: #94a3b8;
  font-size: 0.88rem;
  line-height: 1.5;
}

.movie-favorite {
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 180ms ease, color 180ms ease, transform 180ms ease;
  flex-shrink: 0;
}

.movie-favorite.movie-active {
  background: linear-gradient(135deg, #fbbf24, #f97316);
  color: #0f172a;
  transform: translateY(-1px);
}

.movie-tags {
  margin-top: 0.5rem;
}

.movie-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.05);
  color: #cbd5e1;
  line-height: 1.2;
}

.tag-family {
  background: rgba(16, 185, 129, 0.16);
  color: #a7f3d0;
}

.tag-friends {
  background: rgba(59, 130, 246, 0.16);
  color: #93c5fd;
}

.tag-work {
  background: rgba(168, 85, 247, 0.16);
  color: #d8b4fe;
}

.tag-important {
  background: rgba(249, 115, 22, 0.16);
  color: #fdba74;
}

@media (max-width: 900px) {
  .movie-app-shell {
    flex-wrap: wrap;
    padding: 1.5rem;
  }

  .movie-filters {
    width: 100%;
    position: relative;
    top: 0;
    height: auto;
    padding: 1.5rem 1rem;
  }

  .movie-list {
    max-width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

@media (max-width: 760px) {
  .movie-list {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (max-width: 600px) {
  .movie-app-shell {
    padding: 1rem;
  }

  .movie-card {
    padding: 1rem;
  }

  .movie-header {
    flex-wrap: wrap;
    align-items: center;
  }

  .movie-header button,
  .movie-favorite {
    width: auto;
  }

  .movie-square-avatar {
    height: 180px;
  }

  .movie-tag {
    font-size: 0.75rem;
  }
}

.movie-watch {
  border: none;
  background-color: #0ea5e9;
  padding: 10px 5px;
  border-radius: 6px;
}

</style>