import { reactive } from "./reactive";
import { trackDep, triggerDep } from './effect'
import { hasChanged,isObject } from '../shared/index'
// export function ref(value) {
//   return reactive({value})
// }
const enum refFlag{
  IS_REF="__is_ref__"
}
class refImpl{
  private _value: any
  private _rawValue:any
  public deps = new Set()
  public [refFlag.IS_REF] = true
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

export function isRef(ref) {
  return ref && isObject(ref) && !!ref[refFlag.IS_REF]
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}