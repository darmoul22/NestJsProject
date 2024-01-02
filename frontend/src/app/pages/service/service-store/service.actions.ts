import {createAction, props} from "@ngrx/store";
import {ServiceModel} from "../../../core/models/service.model";

export const pageEnter = createAction('[Service] Page Enter');
export const loading = createAction('[Service] Loading');
export const loadSuccess = createAction('[Service] Load Success', props<{ services: ServiceModel[] }>());
export const loadError = createAction('[Service] Load Error', props<{ error: string }>());
export const selectService = createAction('[Service] Select Service', props<{ selectedServiceId: number}>());
export const clearSelectedService = createAction('[Service] Clear Selected Service');
export const addService = createAction('[Service] Add Service');
export const addServiceSuccess = createAction('[Service] Add Service Success');
export const addServiceError = createAction('[Service] Add Service Error');
export const removeService = createAction('[Service] Remove Service');
export const removeServiceSuccess = createAction('[Service] Remove Service Success');
export const removeServiceError = createAction('[Service] Remove Service Error');
export const updateService = createAction('[Service] Update Service');
export const updateServiceSuccess = createAction('[Service] Update Service Success');
export const updateServiceError = createAction('[Service] Update Service Error');
