import { track, trigger } from './effect'
import { reactive, readonly } from './reactive'
import { isObject } from '../shared/index'
function createGet(isReadonly) {
  return (target, key) => {
    if (key === '__is_readonly__') {      
      return isReadonly
    } else if (key === '__is_reactive__') {
      return !isReadonly
    }
    let res = Reflect.get(target, key)
    if (isObject(res)) {
      res = isReadonly? readonly(res) :reactive(res)
    }
    !isReadonly && track(target, key)
    return res
  }
}

function createSet(isReadonly) { 
    return (target, key, value) => {
      if (isReadonly) {
        console.warn(`key:${key} set fail, because target is readonly`)
        return true
      } else {        
        const res = Reflect.set(target,key,value)
        trigger(target,key)
        return res
      }
    }
  
}

export function createProxyHandlers(isReadonly=false) {
  return {
    get: createGet(isReadonly),
    set: createSet(isReadonly)
  }
}



