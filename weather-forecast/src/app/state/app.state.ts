
import { citiesModal, unitType } from '../modals/cities.modal';

export interface AppState {
  selectedCity: citiesModal | null;
  selectedUnit: unitType;
  currentConditions: any;
}

export const initialAppState: AppState = {
  selectedCity: null,
  selectedUnit: unitType.IMPERIAL,
  currentConditions: null
};
