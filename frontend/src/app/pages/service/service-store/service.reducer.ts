import { ServiceActions } from ".";
import {ServiceState} from "./service.state";
import {createReducer, on} from "@ngrx/store";


export const initialServiceState: ServiceState = {
  services: null,
  selectedServiceId: null,
  error: null,
  loading: false,
}

export const serviceReducer = createReducer(
  initialServiceState,
  on(ServiceActions.loading, (state, {}) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ServiceActions.loadSuccess, (state, { services }) => ({
    ...state,
    services,
    loading: false,
    error: null,
  })),
  on(ServiceActions.loadError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ServiceActions.selectService, (state, {selectedServiceId}) => ({
    ...state,
    selectedServiceId,
  })
  ),
  on(ServiceActions.clearSelectedService, (state, {}) => ({
    ...state,
    selectedServiceId: null,
  })
  )
)
