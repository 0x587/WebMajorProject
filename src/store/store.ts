import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// 为 store state 声明类型
export interface State {
    username: string | undefined,
    role: string | undefined
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        username: undefined,
        role: undefined
    },
    mutations: {
        login(state, obj: { username: string, role: string }) {
            state.username = obj.username
            state.role = obj.role
        }
    }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(key)
}