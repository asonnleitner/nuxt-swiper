<template>
  <div class="pt-6">
    <div
      ref="main"
      v-swiper:main
      :auto-update="true"
      class="swiper"
      @ready="onReady"
      @slideChange="onSlideChange"
      @click-slide="onSlideClick"
    >
      <div class="swiper-wrapper">
        <div v-for="(img, i) in images" :key="i" class="swiper-slide">
          <img :src="img" alt />
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets" />
    </div>

    <div v-swiper:thumbs class="swiper swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(img, i) in images" :key="i" class="swiper-slide">
          <img :src="img" alt />
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets" />
    </div>
  </div>
</template>

<script>
import { decode } from 'js-base64';
export default {
  name: 'IndexPage',

  computed: {
    swiperMain() {
      return this.$refs.main.swiper
    },

    images() {
      return JSON.parse(
        decode('WyJodHRwczovL2RhdGEudXpvLmlvL2Nkbi1jZ2kvaW1hZ2Uvdz0xMjQsaD0xMjQsZml0PWNvdmVyLHE9ODAsZj1hdXRvLG1ldGFkYXRhPW5vbmUsZz1hdXRvLGRwcj0xL3VwbG9hZHMvaW1hZ2VzL3Byb2R1Y3RzLzIwNmE2YTU3LWZlMmYtNDkxOS1iZWJhLWJlN2Q2ZGE5NDIyMC9iZTg0NzU0MS00NDkxLTQyMDgtYjA5MC1lNWFjNTI1YTgyNmIuanBlZyIsImh0dHBzOi8vZGF0YS51em8uaW8vY2RuLWNnaS9pbWFnZS93PTEyNCxoPTEyNCxmaXQ9Y292ZXIscT04MCxmPWF1dG8sbWV0YWRhdGE9bm9uZSxnPWF1dG8sZHByPTEvdXBsb2Fkcy9pbWFnZXMvcHJvZHVjdHMvMjA2YTZhNTctZmUyZi00OTE5LWJlYmEtYmU3ZDZkYTk0MjIwL2I1NWYwMGI5LTJhOWItNDhhZS04YjdiLWFkNGZjMTBlY2VmZS5qcGVnIiwiaHR0cHM6Ly9kYXRhLnV6by5pby9jZG4tY2dpL2ltYWdlL3c9MTI0LGg9MTI0LGZpdD1jb3ZlcixxPTgwLGY9YXV0byxtZXRhZGF0YT1ub25lLGc9YXV0byxkcHI9MS91cGxvYWRzL2ltYWdlcy9wcm9kdWN0cy8yMDZhNmE1Ny1mZTJmLTQ5MTktYmViYS1iZTdkNmRhOTQyMjAvODQ0Yjc1NzAtOTkxNi00OGEyLTllMGQtZjc0ZGFjMjQ0ZDYzLmpwZWciLCJodHRwczovL2RhdGEudXpvLmlvL2Nkbi1jZ2kvaW1hZ2Uvdz0xMjQsaD0xMjQsZml0PWNvdmVyLHE9ODAsZj1hdXRvLG1ldGFkYXRhPW5vbmUsZz1hdXRvLGRwcj0xL3VwbG9hZHMvaW1hZ2VzL3Byb2R1Y3RzLzIwNmE2YTU3LWZlMmYtNDkxOS1iZWJhLWJlN2Q2ZGE5NDIyMC8xMzhlMDhjOC0yZjcwLTRmNWUtODRmZC01MTRkM2YyZmM5YjguanBlZyIsImh0dHBzOi8vZGF0YS51em8uaW8vY2RuLWNnaS9pbWFnZS93PTEyNCxoPTEyNCxmaXQ9Y292ZXIscT04MCxmPWF1dG8sbWV0YWRhdGE9bm9uZSxnPWF1dG8sZHByPTEvdXBsb2Fkcy9pbWFnZXMvcHJvZHVjdHMvMjA2YTZhNTctZmUyZi00OTE5LWJlYmEtYmU3ZDZkYTk0MjIwLzQ2YTg5YTkxLTNjYjYtNGY0Mi05ZTMwLWFjNjM3OTQ5ZTYxZS5qcGVnIiwiaHR0cHM6Ly9kYXRhLnV6by5pby9jZG4tY2dpL2ltYWdlL3c9MTI0LGg9MTI0LGZpdD1jb3ZlcixxPTgwLGY9YXV0byxtZXRhZGF0YT1ub25lLGc9YXV0byxkcHI9MS91cGxvYWRzL2ltYWdlcy9wcm9kdWN0cy8yMDZhNmE1Ny1mZTJmLTQ5MTktYmViYS1iZTdkNmRhOTQyMjAvNTIyMTBhZGEtM2E5NS00NzFjLWFlMWItYTQ3NTVhZDQzZGE3LmpwZWciXQ')
      )
    },
  },

  methods: {
    onSlideClick(index) {
      console.log('onSlideClick', index)
    },

    onSlideChange(swiper) {
      console.log('onSlideChange', swiper)
    },

    onReady() {
      console.log('READY ASS')
    },
  },
}
</script>
