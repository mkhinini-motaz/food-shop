import { OPEN_SIDE_DRAWER, CLOSE_SIDE_DRAWER} from '../actions';

export const initialSideDrawerReducerState = {
    isOpen: false,
};

export default (state = initialSideDrawerReducerState, action) => {
    if (action.type === OPEN_SIDE_DRAWER) {
        return { ...state, isOpen: true }
    }

    if (action.type === CLOSE_SIDE_DRAWER) {
        return { ...state, isOpen: false }
    }

    return state;
};
