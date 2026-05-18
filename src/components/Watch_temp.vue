<template>
  <div class="watch-page">
    <div class="back-link">

      <!-- <router-link to="/" >← Back to Gallery</router-link> -->
      <button @click="$router.go(-1)" >← Back to Gallery</button>
    </div>
    <div class="watch-content">
      <div class="video-player">
        <video controls :src="currentMovie.trailer" class="video"></video>
        <div class="movie-details">
          <h1>{{ currentMovie.title }}</h1>
          <p class="genre">{{ currentMovie.genre }}</p>
          <p class="description">{{ currentMovie.description }}</p>
          <button
            class="movie-favorite"
            :class="currentMovie.favorite ? 'movie-active' : ''"
            aria-label="Favorite"
            @click="toggleFavorite(currentMovie.title)">
            ★
          </button>
        </div>
      </div>
      <div class="other-videos">
        <h3>Other Videos</h3>
        <div class="other-list">
          <div v-for="movie in otherMovies" :key="movie.title" class="other-card" @click="watchMovie(movie.originalIndex)">
            <img :src="movie.image" :alt="movie.title" />
            <p>{{ movie.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMovie: null,
      movies: [
        {
          title: "The Matrix",
          genre: "Sci-Fi",
          image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
          description: "Un hacker découvre que le monde dans lequel il vit est une simulation contrôlée par des machines.",
          trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          favorite: true
        },
        {
          title: "Inception",
          genre: "Sci-Fi",
          image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
          description: "Un voleur spécialisé dans les rêves reçoit la mission d'implanter une idée dans l'esprit d'une cible.",
          trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          favorite: false
        },
        {
          title: "Interstellar",
          genre: "Sci-Fi",
          image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          description: "Des astronautes voyagent à travers un trou noir pour trouver une nouvelle planète habitable.",
          trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          favorite: true
        },
        {
          title: "Arrival",
          genre: "Drama / Sci-Fi",
          image: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
          description: "Une experte en linguistique tente de communiquer avec des extraterrestres arrivés sur Terre.",
          trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          favorite: true
        },
        {
          title: "John Wick",
          genre: "Action",
          image: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
          description: "Un ancien tueur à gages reprend les armes pour se venger.",
          trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          favorite: true
        },
        {
          title: "The Creator",
          genre: "Science-fiction / Action / Aventure",
          description: "Dans un futur où les humains sont en guerre contre l'intelligence artificielle, un ancien soldat reçoit une mission secrète qui pourrait changer le destin du monde.",
          image: "https://image.tmdb.org/t/p/w500/vBZ0qvaRxqEhZwl6LWmruJqWE8Z.jpg",
          trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        },
        {
          title: "Avatar",
          genre: "Action /Adventure",
          description: "Un ancien marine découvre la planète Pandora et se retrouve au cœur d'un conflit entre humains et Na'vi.",
          image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
          trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          favorite: true
        },
        {
          title: 'Man of Steel',
          genre: 'Action, Super-héros',
          description: 'Clark Kent découvre ses pouvoirs et devient Superman pour protéger Metropolis.',
          image: 'https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_.jpg',
          trailer: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          favorite: true
        },
        {
          title: "Avengers: Endgame",
          genre: "Action /Adventure",
          description: "Les Avengers restants unissent leurs forces pour tenter d'annuler les actions de Thanos.",
          image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
          trailer: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
          favorite: true
        }
      ]
    }
  },
  mounted() {
    this.loadMovie()
  },

  watch: {
    '$route.params.id'() {
      this.loadMovie()
    }
  },

  computed: {
    otherMovies() {
      const id = Number(this.$route.params.id)

      return this.movies
        .map((movie, index) => ({
          ...movie,
          originalIndex: index
        }))
        .filter(movie => movie.originalIndex !== id)
    }
  },

  methods: {
    loadMovie() {
      const id = Number(this.$route.params.id)

      if (
        isNaN(id) ||
        id < 0 ||
        id >= this.movies.length
      ) {
        return
      }

      this.currentMovie = this.movies[id]
    },

    toggleFavorite(title) {
      const movieIndex = this.movies.findIndex(
        movie => movie.title === title
      )

      if (movieIndex !== -1) {
        this.movies[movieIndex].favorite =
          !this.movies[movieIndex].favorite
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
  background: #090b11;
  color: #e2e8f0;
  min-height: 100vh;
}

.back-link {
  padding: 20px;
  color: #e2e8f0;
  text-decoration: none;
}

.watch-content {
  display: flex;
  padding: 20px;
}

.video-player {
  flex: 2;
  margin-right: 20px;
}

.video {
  width: 100%;
  height: auto;
}

.movie-details {
  margin-top: 20px;
}

.movie-favorite {
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: #64748b;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}

.movie-favorite.movie-active {
  background: linear-gradient(135deg, #fbbf24, #f97316);
  color: #0f172a;
}

.other-videos {
  flex: 1;
}

.other-list {
  display: flex;
  flex-direction: column;
}

.other-card {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.other-card img {
  width: 50px;
  height: 75px;
  margin-right: 10px;
}
</style>