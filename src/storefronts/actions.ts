import IAction from "../actions";
import {Storefront} from "./storefront";
import {StorefrontError} from "../errors";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "@reduxjs/toolkit";
import {StorefrontState} from "./Storefronts";

export enum StorefrontActionNames {
    LOAD = 'Storefronts.Load',
    LOADED_SUCCESS = 'Storefronts.LoadedSuccess',
    LOADED_ERROR = 'Storefronts.LoadedError',
}

export class StorefrontAction implements IAction<StorefrontState> {
    type: string;
    payload?: StorefrontState

    constructor(type: string, payload?: StorefrontState) {
        this.type = type;
        this.payload = payload;
    }

    // Action Creators.
    public static loadStorefronts(): StorefrontAction {
        return {
            type: StorefrontActionNames.LOAD,
            payload: {
                storefronts: [],
                storefrontsLoading: true,
                error: undefined
            }
        };
    }

    public static storefrontsLoadedSuccess(storefronts?: Storefront[]): StorefrontAction {
        return {
            type: StorefrontActionNames.LOADED_SUCCESS,
            payload: {
                storefronts: storefronts,
                storefrontsLoading: false
            }
        };
    }

    public static storefrontsLoadedError(error?: StorefrontError): StorefrontAction {
        return {
            type: StorefrontActionNames.LOADED_ERROR,
            payload: {
                storefronts: [],
                error: error,
                storefrontsLoading: false
            }
        };
    }
}

export const fetchStorefronts = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    console.log("Fetching storefronts.");
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        console.log("Returning a promise.");
        return new Promise<void> ((resolve, reject) => {

            console.log("Dispatching the loadStorefronts() event.");
            dispatch(StorefrontAction.loadStorefronts());
            console.log("Fetching storefronts.");

            // Fetch code goes here.
            setTimeout( () => {
                const newStorefronts:Storefront[] = [
                    {
                        id: 1,
                        name: "Carrie's Coffee",
                        guid: "1234-5678-90ab-cdef",
                    }
                ];
                try {
                    dispatch(StorefrontAction.storefrontsLoadedSuccess(newStorefronts))
                    resolve();
                } catch (error) {
                    dispatch(StorefrontAction.storefrontsLoadedError(new StorefrontError("Error loading storefronts.")));
                    reject(error);
                }
            }, 2000);

        });
    }
}