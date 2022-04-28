export class Layout {
  lifecycle = null
  container = null
  adapterTasks = []

  async setSlot(name, adapter) {
    this.adapterTasks.unshift([name, adapter])
  }

  async setLifecycle(lifecycle) {
    let _lifecycle = typeof lifecycle === 'function' ? lifecycle() : lifecycle

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

  getLifeCycle() {
    return this.lifecycle
  }

  async runAdapterTasks() {
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
}
