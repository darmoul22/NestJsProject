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
  ),
  on(ServiceActions.updateServiceSuccess,(state, {service}) =>{
      const updatedIndex = state.services!.findIndex(s => s.id === service.id);
      console.log('index :', updatedIndex)
      if (updatedIndex && updatedIndex !== -1 && state.services){
        const updatedServices = [
          ...state.services.slice(0, updatedIndex),
          service,
          ...state.services.slice(updatedIndex + 1),
        ];

        return { ...state, services: updatedServices };
      }
      return  {...state, loading: false}
  }
  ),
  on(ServiceActions.updateServiceError, (state, {error})=>({
    ...state,
    loading: false,
    error,
  })
  ),
)
