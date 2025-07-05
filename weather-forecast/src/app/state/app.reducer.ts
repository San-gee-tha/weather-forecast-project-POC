
import { createReducer, on } from '@ngrx/store';
import { updateCity, updateUnit, clearAll } from './app.actions';
import { loadCurrentConditionsSuccess } from './app.actions.extra';
import { AppState, initialAppState } from './app.state';

export const appReducer = createReducer(
  initialAppState,
  on(updateCity, (state, { city }) => ({ ...state, selectedCity: city })),
  on(updateUnit, (state, { unit }) => ({ ...state, selectedUnit: unit })),
  on(loadCurrentConditionsSuccess, (state, { data }) => ({ ...state, currentConditions: data })),
  on(clearAll, () => initialAppState)
);
