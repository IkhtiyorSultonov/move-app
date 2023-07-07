import { IMove } from 'src/interfaces/app.interfaces';
import { create } from 'zustand';

interface InfoState {
	modal: boolean;
	currentMovie: IMove;
	setModal: (bool: boolean) => void;
	setCurrentMovie: (movie: IMove) => void;
}

export const useInfoStore = create<InfoState>()(set => ({
	modal: false,
	currentMovie: {} as IMove,
	setModal: (bool: boolean) => set(state => ({ ...state, modal: bool })),
	setCurrentMovie: (movie: IMove) => set(state => ({ ...state, currentMovie: movie })),
}));