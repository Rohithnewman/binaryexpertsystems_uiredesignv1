import { create } from 'zustand';

interface AppState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isNavbarVisible: boolean;
  setNavbarVisible: (visible: boolean) => void;
  isPreloaderFinished: boolean;
  setPreloaderFinished: (finished: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  isNavbarVisible: true,
  setNavbarVisible: (visible) => set({ isNavbarVisible: visible }),
  isPreloaderFinished: false,
  setPreloaderFinished: (finished) => set({ isPreloaderFinished: finished }),
}));
