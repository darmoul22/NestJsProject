import {ServiceModel} from "../../../core/models/service.model";

export interface ServiceState{
  services : ServiceModel[] | null;
  selectedServiceId: number | null;
  error : string | null;
  loading : boolean
}
