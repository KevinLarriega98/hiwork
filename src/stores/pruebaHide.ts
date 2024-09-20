import { create } from "zustand";

type PruebaHideState = {
    hide: boolean;
    setHide: (hide: boolean) => void;
};

const pruebaHide = create<PruebaHideState>((set) => ({
    hide: false,
    setHide: (hide) => set({ hide }),
}));

export default pruebaHide;
