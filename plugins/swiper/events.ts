import { Swiper } from 'swiper'
import { toKebabCase } from './utils'

// https://swiperjs.com/api/#events
// not all emits work, but all the common ones do
const emits = [
  '_beforeBreakpoint',
  '_containerClasses',
  '_freeModeNoMomentumRelease',
  '_slideClass',
  '_slideClasses',
  '_swiper',
  'activeIndexChange',
  'afterInit',
  'autoplay',
  'autoplayStart',
  'autoplayStop',
  'beforeDestroy',
  'beforeInit',
  'beforeLoopFix',
  'beforeResize',
  'beforeSlideChangeStart',
  'beforeTransitionStart',
  'breakpoint',
  'changeDirection',
  'click',
  'destroy',
  'disable',
  'doubleClick',
  'doubleTap',
  'enable',
  'fromEdge',
  'hashChange',
  'hashSet',
  'imagesReady',
  'init',
  'keyPress',
  'lazyImageLoad',
  'lazyImageReady',
  'lock',
  'loopFix',
  'momentumBounce',
  'navigationHide',
  'navigationShow',
  'observerUpdate',
  'orientationchange',
  'paginationHide',
  'paginationRender',
  'paginationShow',
  'paginationUpdate',
  'progress',
  'reachBeginning',
  'reachEnd',
  'realIndexChange',
  'resize',
  'scroll',
  'scrollbarDragEnd',
  'scrollbarDragMove',
  'scrollbarDragStart',
  'setTransition',
  'setTranslate',
  'slideChange',
  'slideChangeTransitionEnd',
  'slideChangeTransitionStart',
  'slideNextTransitionEnd',
  'slideNextTransitionStart',
  'slidePrevTransitionEnd',
  'slidePrevTransitionStart',
  'slideResetTransitionEnd',
  'slideResetTransitionStart',
  'sliderFirstMove',
  'sliderMove',
  'slidesGridLengthChange',
  'slidesLengthChange',
  'snapGridLengthChange',
  'snapIndexChange',
  'swiper',
  'tap',
  'toEdge',
  'touchEnd',
  'touchMove',
  'touchMoveOpposite',
  'touchStart',
  'transitionEnd',
  'transitionStart',
  'unlock',
  'update',
  'zoomChange',
]

const swiperSlideClickEventHandler = (
  swiper: Swiper | null,
  event: MouseEvent,
  emit: (event: string, ...args: any[]) => void
) => {
  if (swiper && !swiper.destroyed) {
    const eventPath = event.composedPath?.() || (event as any).path // IE11

    if (event?.target && eventPath) {
      const slides = Array.from(swiper.slides)
      const paths = Array.from(eventPath)

      if (
        slides.includes(<Element>event.target) ||
        paths.some((item) => slides.includes(<Element>item))
      ) {
        const clickedIndex = swiper.clickedIndex
        const realIndex = Number(swiper.clickedSlide?.dataset?.swiperSlideIndex)

        const realIndexValue = Number.isInteger(realIndex) ? realIndex : null

        // provide camelCase and kebab-case event names for convenience
        ;['clickSlide', 'click-slide'].map((event) =>
          emit(event, clickedIndex, realIndexValue)
        )
      }
    }
  }
}

const swiperEventsHandler = (
  swiper: Swiper,
  emit: (event: string, ...args: any[]) => void
) =>
  emits.map((event) =>
    swiper.on(event as any, (...args: any[]) =>
      [event, toKebabCase(event)].map((e) => emit(e, ...args))
    )
  )

export { swiperEventsHandler, swiperSlideClickEventHandler }
