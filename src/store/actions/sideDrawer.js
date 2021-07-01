import { OPEN_SIDE_DRAWER, CLOSE_SIDE_DRAWER } from './types';

export function openSideDrawer() {
    return { type: OPEN_SIDE_DRAWER };
}

export function closeSideDrawer() {
    return { type: CLOSE_SIDE_DRAWER };
}