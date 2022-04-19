import { reactive } from "./reactive";
import { trackDep, triggerDep } from './effect'
import { hasChanged,isObject } from '../shared/index'
// export function ref(value) {
//   return reactive({value})
// }
class refImpl{
  private _value: any
  private _rawValue:any
  public deps = new Set()
  constructor(value) {
    this._rawValue = value
    this._value = convert(value)
  }
  get value() {
    trackDep(this.deps)
    return this._value
  }
  set value(newValue) {
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerDep(this.deps)
    }
  }
}

function convert(value) {
  return isObject(value) ?reactive(value) : value
}

export function ref(value) {
  return new refImpl(value)
}