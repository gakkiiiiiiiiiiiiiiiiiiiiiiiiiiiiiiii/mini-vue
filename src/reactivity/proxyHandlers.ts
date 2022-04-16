import {track,trigger} from './effect'
function createGet(isReadonly) {
  return (target, key) => {
    const res = Reflect.get(target,key)
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



