import {localStorageSync} from "ngrx-store-localstorage";

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['auth'], // List the slices of state to persist
    rehydrate: true,
  })(reducer);
}
