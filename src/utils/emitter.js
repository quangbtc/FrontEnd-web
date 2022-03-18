import eventEmitter from "events"
const _emitter=new eventEmitter()
_emitter.setMaxListeners(0) // Unlimit emitter
export const emitter=_emitter