import {extend} from '../shared'
let activeRefect
class EffectReactive{
  private _fn
  public active = true
  public onStop?: () => void
  public scheduler?: () => void
  constructor(fn,options={}) {
    this._fn = fn
    extend(this,options)
    activeRefect = this
  }
  run() {
    if (this.active) {      
      return this._fn()    
    }
  }
  stop() {
    this.onStop && this.onStop()
    this.active = false
  }
  continue() {
    this.active = true
  }
}
const trackMap = new Map()
export function track(target, key) {
  let depsMap = trackMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    trackMap.set(target,depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key,dep)
  }
  trackDep(dep)
  // if(!activeRefect) return

  // dep.add(activeRefect)
}

export function trackDep(dep) {

  if (needTrackDep(dep)) {    
    dep.add(activeRefect)
  }

}

function needTrackDep(dep) {
  return activeRefect || !dep.has(activeRefect)
}

export function trigger(target, key) {
  let depsMap = trackMap.get(target)
  let dep = depsMap.get(key)
  
  triggerDep(dep)
  // for (const _effect of dep) {
  //   if (_effect.scheduler) {
  //     _effect.scheduler()
  //   } else {
  //     _effect.run()
  //   }
  // }
}

export function triggerDep(dep) {
  for (const _effect of dep) {
    if (_effect.scheduler) {
      _effect.scheduler()
    } else {
      _effect.run()
    }
  }
}

export function effect(fn, options:any = {}) {
  const _effect = new EffectReactive(fn,options)
  
  _effect.run()
  const runner:any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

export function stop(runner) {
  runner.effect.stop()
}