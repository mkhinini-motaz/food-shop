import { SET_IS_LOADING } from "./types";

export function setIsLoading(isLoading) {
    return { type: SET_IS_LOADING, payload: isLoading };
}
