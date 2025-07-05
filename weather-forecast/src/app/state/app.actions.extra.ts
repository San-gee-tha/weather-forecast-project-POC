import { createAction, props } from '@ngrx/store';

export const loadCurrentConditionsSuccess = createAction(
  '[App] Load Current Conditions Success',
  props<{ data: any }>()
);

export const loadCurrentConditionsFailure = createAction(
  '[App] Load Current Conditions Failure',
  props<{ error: any }>()
);
