import type { LifeCycle } from './types'

type AdapterTaskItem = [string, () => any]

class Layout {
  // TODO 类型定义完善
  lifecycle: LifeCycle | null = null
  container: HTMLElement | null = null
  adapterTasks: AdapterTaskItem[] = []
  // eventDocument = document.createElement('div')

  public async setSlot(
    name: string,
    adapter: () => LifeCycle | Promise<LifeCycle>,
  ) {
    this.adapterTasks.unshift([name, adapter])
  }

  public async setLifecycle(lifecycle: LifeCycle | (() => LifeCycle)) {
    let _lifecycle: LifeCycle =
      typeof lifecycle === 'function' ? lifecycle() : lifecycle

    this.lifecycle = {
      ..._lifecycle,
      bootstrap: async (props) => {
        this.container = props.container
        return _lifecycle?.bootstrap?.(props)
      },
      mount: async (props) => {
        const ret = await _lifecycle?.mount?.(props)
        await this.runAdapterTasks()
        return ret
      },
    }
  }

  public getLifeCycle() {
    return this.lifecycle
  }

  private async runAdapterTasks() {
    for (const task of this.adapterTasks) {
      if (task) {
        const [name, adapter] = task
        const slot = this.container?.querySelector(`[slot="${name}"]`)

        if (!slot) {
          console.warn(
            `@growing-web/layout: No element found with slot='${name}'.`,
          )
          return
        }
        const application = await adapter()
        const widget = document.createElement('web-widget')

        // @ts-ignore
        widget.application = () => application
        slot.appendChild(widget)
      }
    }
  }

  public createCustomEvent(key: string, detail: any) {
    return new CustomEvent(key, { detail })
  }

  // TODO 不使用window作为载体
  public dispatchEvent(event: CustomEvent<any>) {
    window.dispatchEvent(event)
  }

  public addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
  ) {
    window.addEventListener(type, listener)
  }
}

export { Layout }
