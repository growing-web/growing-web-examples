class Layout {
  lifecycle = null
  container = null

  async setSlot(name, adapter) {}

  async setLifecycle(lifecycle) {}

  getLifeCycle() {}

  createCustomEvent(key, detail) {}

  dispatchEvent(event) {}

  addEventListener(type, listener) {}
}

export { Layout }
