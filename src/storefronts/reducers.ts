import {StorefrontAction, StorefrontActionNames} from "./actions";
import {StorefrontState} from "./Storefronts";



export function storefrontsReducer(state: StorefrontState, action: StorefrontAction): StorefrontState {
    console.log("STATE in storefrontsReducer: ")
    console.log(state)
    if (!state) {
        state = {
            storefronts: [],
            storefrontsLoading: false,
        }
    }

    switch (action.type) {
        case StorefrontActionNames.LOAD: {
            console.log("Storefront is loading.");
            return { ...state, storefronts: [], storefrontsLoading: true};
        }
        case StorefrontActionNames.LOADED_SUCCESS: {
            console.log("Storefront loaded successfully.");
            return { ...state, storefronts: action.payload?.storefronts, storefrontsLoading: false};
        }
        case StorefrontActionNames.LOADED_ERROR: {
            // Do an error thing.
            return { ...state, storefronts: [], storefrontsLoading: false, error: action.payload?.error };
        }
        default: {
            return state;
        }
    }
}