import { VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import { Swiper, SwiperOptions } from 'swiper'

// convert camelCase to kebab-case
export const toKebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

// get data from vnode data attributes
export const getDataAttr = (vnode: VNode, attr: string): string | undefined =>
  vnode.data &&
  vnode.data.attrs &&
  (vnode.data.attrs[attr] || vnode.data.attrs[toKebabCase(attr)])

// parse empty vnode attribute a value return false
export const getDataAttrBool = (value: any): boolean =>
  [true, undefined, null, '', 'true', '1', 1].includes(value)

export const getSwiper = {
  // default options object which will be overridden by the provided default options in the directive
  defaultOptions: {} as SwiperOptions,

  // get swiper options from directive
  options(binding: DirectiveBinding): SwiperOptions {
    return Object.assign(this.defaultOptions, binding.value)
  },

  // get swiper instance name in directive
  instanceName(
    el: HTMLElement,
    binding: DirectiveBinding,
    vnode: VNode
  ): string {
    return (
      binding.arg || // v-swiper:[arg]
      // or vnode data attribute 'instanceName' | 'instance-name'
      getDataAttr(vnode, 'instanceName') ||
      // or element id
      el.id ||
      // '$swiper' as fallback, which is also the default
      '$swiper'
    )
  },

  // get swiper instance in directive
  instance(
    el: HTMLElement,
    binding: DirectiveBinding,
    vnode: VNode
  ): Swiper | null {
    // get instance name to use as key on vnode.context
    const instanceName = this.instanceName(el, binding, vnode)
    return (vnode.context as any)[instanceName] || null
  },
}

// emit event in directive
export const getEventEmitter = (
  vnode: VNode
): ((name: string, ...args: any[]) => void) => {
  // const handlers   = vnode.data?.on || vnode.componentOptions?.listeners
  const handlers = vnode.data?.on || vnode.componentOptions?.listeners

  return (name, ...args) => {
    // @ts-ignore
    const handle = handlers?.[name]
    if (handle) handle.fns(...args)
  }
}
