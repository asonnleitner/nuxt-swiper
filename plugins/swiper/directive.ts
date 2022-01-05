import { DirectiveOptions } from 'vue/types/options'

import { Swiper } from 'swiper'

import { swiperSlideClickEventHandler, swiperEventsHandler } from './events'

import {
  getDataAttr,
  getDataAttrBool,
  getEventEmitter,
  getSwiper,
} from './utils'

export default (SwiperClass: typeof Swiper): DirectiveOptions => ({
  // bind click event to element
  bind(el, binding, vnode) {
    const requiredClass = 'swiper'
    // throw and error if the binding element doesn't have the required class
    // Because we want the HTML to be rendered on server, add the class to the element
    // on the client side results in a layout shift
    if (el.classList.contains(requiredClass)) {
      // add event listeners to the element and handle on slide click
      el.addEventListener('click', (event) => {
        const swiper = getSwiper.instance(el, binding, vnode)
        const emit = getEventEmitter(vnode)

        swiperSlideClickEventHandler(swiper, event, emit)
      })
    } else {
      throw new Error(
        `The element: ${el} is missing the class: ${requiredClass}`
      )
    }
  },

  // create swiper instance if not already created and handle swiper events
  inserted(el, binding, vnode) {
    const swiperOptions = getSwiper.options(binding)
    const instanceName = getSwiper.instanceName(el, binding, vnode)
    const emit = getEventEmitter(vnode)

    const context = vnode.context as any

    let swiper: Swiper = context?.[instanceName]

    // when using <KeepAlive> the swiper will be destroyed, but not the instance,
    // so we need to check if instance is already destroyed
    if (!swiper || swiper.destroyed) {
      swiper = new SwiperClass(el, swiperOptions)
      context[instanceName] = swiper

      swiperEventsHandler(swiper, emit)

      emit('ready', swiper)
      // NOTE: re-instance swiper when the nextTick with <KeepAlive>
      // Vue.nextTick(instancing) || setTimeout(instancing)
    }
  },

  // update swiper instance when options or DOM changed
  componentUpdated(el, binding, vnode) {
    const autoUpdate = getDataAttrBool(getDataAttr(vnode, 'autoUpdate'))

    if (autoUpdate) {
      const swiper = getSwiper.instance(el, binding, vnode)

      if (swiper) {
        const swiperOptions = getSwiper.options(binding)
        const isLoop = swiperOptions?.loop

        if (isLoop) {
          swiper?.loopDestroy?.()
        }

        swiper?.update?.()
        swiper?.navigation?.update?.()
        swiper?.pagination?.render?.()
        swiper?.pagination?.update?.()

        if (isLoop) {
          swiper?.loopCreate?.()
          swiper?.update?.()
        }
      }
    }
  },

  // unbind - destroy swiper instance
  unbind(el, binding, vnode) {
    const attrs = {
      autoDestroy: false,
      deleteInstance: false,
      cleanStyles: false,
    }

    Object.keys(attrs).map(
      // @ts-ignore
      (key) => (attrs[key] = getDataAttrBool(getDataAttr(vnode, key)))
    )

    if (attrs.autoDestroy) {
      const swiper = getSwiper.instance(el, binding, vnode)

      if (swiper && (swiper as any).initialized) {
        swiper?.destroy?.(attrs.deleteInstance, attrs.cleanStyles)
      }
    }
  },
})
