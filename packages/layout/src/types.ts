// TODO 类型定义完善
export interface LifeCycle {
  bootstrap?: (properties: any) => Promise<any>
  mount?: (properties: any) => Promise<any>
  update?: (properties: any) => Promise<any>
  unmount?: (properties: any) => Promise<any>
  unload?: (properties: any) => Promise<any>
}
