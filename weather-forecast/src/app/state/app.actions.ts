import { createAction, props } from '@ngrx/store';
import { citiesModal, unitType } from '../modals/cities.modal';

export const updateCity = createAction(
  '[App] Update City',
  props<{ city: citiesModal }>()
);

export const updateUnit = createAction(
  '[App] Update Unit',
  props<{ unit: unitType }>()
);

export const clearAll = createAction('[App] Clear All');

