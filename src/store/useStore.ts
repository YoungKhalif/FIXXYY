import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'admin'
  xp: number
  level: number
  streak: number
  avatar: string
  joinDate: string
  badges: string[]
  completedLessons: string[]
  completedCourses: string[]
}

interface Store {
  user: User | null
  isLoggedIn: boolean
  darkMode: boolean
  sidebarOpen: boolean
  notifications: number
  login: (user: User) => void
  logout: () => void
  addXP: (amount: number) => void
  toggleDark: () => void
  toggleSidebar: () => void
  completeLesson: (id: string) => void
  earnBadge: (id: string) => void
}

const defaultUser: User = {
  id: '1',
  name: 'Benjamin',
  email: 'benjamin@fixxyy.com',
  role: 'student',
  xp: 2450,
  level: 8,
  streak: 12,
  avatar: 'B',
  joinDate: '2024-01-15',
  badges: ['first_lesson', 'streak_7', 'python_beginner', 'quiz_master'],
  completedLessons: ['py-1','py-2','py-3','js-1','js-2'],
  completedCourses: [],
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: defaultUser,
      isLoggedIn: true,
      darkMode: true,
      sidebarOpen: true,
      notifications: 3,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
      addXP: (amount) => set((s) => {
        if (!s.user) return s
        const newXP = s.user.xp + amount
        const newLevel = Math.floor(newXP / 500) + 1
        return { user: { ...s.user, xp: newXP, level: newLevel } }
      }),
      toggleDark: () => set((s) => ({ darkMode: !s.darkMode })),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      completeLesson: (id) => set((s) => {
        if (!s.user || s.user.completedLessons.includes(id)) return s
        return { user: { ...s.user, completedLessons: [...s.user.completedLessons, id], xp: s.user.xp + 50 } }
      }),
      earnBadge: (id) => set((s) => {
        if (!s.user || s.user.badges.includes(id)) return s
        return { user: { ...s.user, badges: [...s.user.badges, id] } }
      }),
    }),
    { name: 'fixxyy-store' }
  )
)
