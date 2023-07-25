import { configure } from 'mobx-miniprogram'

// 引入模型
export { user } from './user'

export { global } from './global'

export { cart } from './cart'


configure({ enforceActions: "observed" });