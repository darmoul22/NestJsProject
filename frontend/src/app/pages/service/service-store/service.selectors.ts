import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ServiceState} from "./service.state";

export const selectServiceState = createFeatureSelector<ServiceState>('service')
export const selectServices = createSelector(selectServiceState, (state) => state.services);
export const selectError = createSelector(selectServiceState, (state) => state.error);
export const selectLoading = createSelector(selectServiceState, (state) => state.loading);
export const selectSelectedServiceId = createSelector(selectServiceState, (state) => state.selectedServiceId);
export const selectActiveService = createSelector(
  selectServices,
  selectSelectedServiceId,
  (services,id) => {
    return services?.find(service => service.id === id) || null
  })
