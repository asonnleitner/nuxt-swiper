import Vue from 'vue'
// eslint-disable-next-line import/no-named-as-default
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'

import directive from './directive'
import { getSwiper } from '~/plugins/swiper/utils'

getSwiper.defaultOptions = {
  loop: true,
}

Vue.directive('swiper', directive(Swiper))
