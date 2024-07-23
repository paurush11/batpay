import { create } from 'zustand'
import { addBalance, computeBalanceForUser } from '../actions/addBalance'

type BankStoreState = {
    lockedBalance: number,
    unlockedBalance: number
}

type BankStoreActions = {
    deposit: (amount: number) => void,
    withdraw: (amount: number) => void
    fetchBalance: (userId: string) => void
}

const useBankStore = create<BankStoreActions & BankStoreState>((set) => ({
    lockedBalance: 0,
    unlockedBalance: 0,
    deposit: (amount: number) => set((state) => ({ unlockedBalance: state.unlockedBalance - amount, lockedBalance: state.lockedBalance + amount })),
    withdraw: (amount: number) => set((state) => ({ unlockedBalance: state.unlockedBalance + amount })),
    fetchBalance: async (userId: string) => {
        try {
            const balance = await computeBalanceForUser(userId);
            set({ lockedBalance: balance.lockedBalance, unlockedBalance: balance.unLockedBalance })
        } catch (E) {
            set({ lockedBalance: 0, unlockedBalance: 0 })
        }
    }
}))


export {
    useBankStore
}