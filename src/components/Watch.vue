<template>
  <div class="watch-page">
    <div class="back-link">
      <router-link to="/">← Back to Gallery</router-link>
    </div>

    <div class="watch-content">
      <div class="video-player">
        <video v-if="currentMovie.trailer" controls class="video">
          <source :src="currentMovie.trailer" type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
        <div v-else class="video-empty">Vidéo non disponible</div>

        <div class="movie-details">
          <div class="movie-poster">
            <img :src="currentMovie.image" :alt="currentMovie.title" class="poster-image" />
          </div>
          <div class="movie-info">
            <h1>{{ currentMovie.title }}</h1>
            <p class="genre">{{ currentMovie.genre }}</p>
            <p class="description">{{ currentMovie.description }}</p>
            <button
              class="movie-favorite"
              :class="currentMovie.favorite ? 'movie-active' : ''"
              aria-label="Toggle Favorite"
              @click="toggleFavorite(currentMovie.title)">
              <span class="favorite-icon">★</span>
              <span class="favorite-text">{{ currentMovie.favorite ? 'Favorited' : 'Add to Favorites' }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="other-videos">
        <h3>Other Videos</h3>
        <div class="other-list">
          <div
            v-for="(movie, index) in otherMovies"
            :key="movie.title"
            class="other-card"
            @click="watchMovie(index)">
            <img :src="movie.image" :alt="movie.title" />
            <div class="other-meta">
              <div class="other-title">
                <strong>{{ movie.title }}</strong>
                <span class="favorite-tag" :class="movie.favorite ? 'active' : ''">★</span>
              </div>
              <p class="other-genre">{{ movie.genre }}</p>
              <p class="other-description">{{ movie.description }}</p>
            </div>
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
      movies
    }
  },
  computed: {
    currentMovie() {
      const id = Number(this.$route.params.id)
      return this.movies[id] || this.movies[0] || {}
    },
    otherMovies() {
      const id = Number(this.$route.params.id)
      return this.movies.filter((_, index) => index !== id)
    }
  },
  methods: {
    toggleFavorite(title) {
      const movieIndex = this.movies.findIndex((movie) => movie.title === title)
      if (movieIndex !== -1) {
        this.movies[movieIndex].favorite = !this.movies[movieIndex].favorite
      }
    },
    watchMovie(index) {
      this.$router.push('/watch/' + index)
    }
  }
}
</script>

<style scoped>
.watch-page {
  background: linear-gradient(135deg, #090b11 0%, #0f172a 50%, #1e293b 100%);
  color: #e2e8f0;
  min-height: 100vh;
  padding: 0;
}

.back-link {
  display: inline-block;
  margin: 24px 32px;
  color: #38bdf8;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(56, 189, 248, 0.1);
  transition: all 180ms ease;
}

.back-link:hover {
  background: rgba(56, 189, 248, 0.2);
  transform: translateX(-2px);
}

.watch-content {
  display: flex;
  gap: 32px;
  padding: 0 32px 32px;
  max-width: 1400px;
  margin: 0 auto;
}

.video-player {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.video {
  width: 100%;
  height: auto;
  min-height: 400px;
  border-radius: 20px;
  background: #000;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.video-empty {
  width: 100%;
  min-height: 400px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 1.2rem;
  font-weight: 500;
  border: 2px dashed rgba(255, 255, 255, 0.1);
}

.movie-details {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  padding: 32px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  flex-shrink: 0;
}

.poster-image {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.15);
  transition: transform 180ms ease;
}

.poster-image:hover {
  transform: scale(1.02);
}

.movie-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.movie-info h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1.1;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.genre {
  margin: 0;
  color: #38bdf8;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  background: rgba(56, 189, 248, 0.1);
  border-radius: 20px;
  display: inline-block;
}

.description {
  margin: 0;
  color: #cbd5e1;
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 700px;
}

.movie-favorite {
  border: none;
  padding: 16px 28px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.05));
  color: #94a3b8;
  cursor: pointer;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 200ms ease;
  align-self: flex-start;
  margin-top: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
}

.movie-favorite::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 500ms ease;
}

.movie-favorite:hover::before {
  left: 100%;
}

.movie-favorite:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.08));
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(255, 255, 255, 0.15);
}

.movie-favorite.movie-active {
  background: linear-gradient(135deg, #fbbf24, #f97316);
  color: #0f172a;
  box-shadow: 0 12px 25px rgba(251, 191, 36, 0.4);
  border: 1px solid #fbbf24;
  animation: favoritePulse 0.6s ease;
}

.movie-favorite.movie-active:hover {
  background: linear-gradient(135deg, #f59e0b, #ea580c);
  box-shadow: 0 15px 30px rgba(251, 191, 36, 0.5);
}

.favorite-icon {
  font-size: 1.4rem;
  transition: all 200ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
}

.movie-favorite.movie-active .favorite-icon {
  color: #ffffff;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(251, 191, 36, 0.6);
  animation: starGlow 2s ease-in-out infinite alternate;
}

.favorite-text {
  font-weight: 600;
  letter-spacing: 0.3px;
}

@keyframes favoritePulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes starGlow {
  0% {
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(251, 191, 36, 0.6);
    filter: brightness(1);
  }
  100% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.4);
    filter: brightness(1.2);
  }
}

.other-videos {
  flex: 1;
  max-width: 400px;
}

.other-videos h3 {
  margin: 0 0 24px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #e2e8f0;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(56, 189, 248, 0.3);
}

.other-list {
  display: grid;
  gap: 20px;
}

.other-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
  border-radius: 20px;
  cursor: pointer;
  align-items: flex-start;
  transition: all 180ms ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
}

.other-card:hover {
  transform: translateY(-4px);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(56, 189, 248, 0.08));
  box-shadow: 0 12px 24px rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.3);
}

.other-card img {
  width: 90px;
  height: 120px;
  object-fit: cover;
  border-radius: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.other-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.other-title {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}

.other-title strong {
  color: #e2e8f0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  flex: 1;
}

.favorite-tag {
  color: #64748b;
  font-size: 1.2rem;
  transition: all 180ms ease;
}

.favorite-tag.active {
  color: #fbbf24;
  text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
}

.other-genre {
  margin: 0;
  color: #38bdf8;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.other-description {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.9;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive design */
@media (max-width: 1024px) {
  .watch-content {
    flex-direction: column;
    gap: 24px;
  }

  .other-videos {
    max-width: 100%;
  }

  .movie-details {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .poster-image {
    width: 180px;
    height: 260px;
  }

  .movie-info h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .watch-content {
    padding: 0 16px 16px;
  }

  .back-link {
    margin: 16px;
  }

  .movie-details {
    padding: 24px 16px;
  }

  .poster-image {
    width: 150px;
    height: 220px;
  }

  .movie-info h1 {
    font-size: 1.8rem;
  }

  .other-card {
    padding: 16px;
    gap: 12px;
  }

  .other-card img {
    width: 70px;
    height: 95px;
  }
}
</style>