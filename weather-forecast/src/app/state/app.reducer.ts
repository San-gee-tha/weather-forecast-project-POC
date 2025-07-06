
import { createReducer, on } from '@ngrx/store';
import { updateCity, updateUnit, clearAll } from './app.actions';
import { AppState, initialAppState } from './app.state';

export const appReducer = createReducer(
  initialAppState,
  on(updateCity, (state, { city }) => ({ ...state, selectedCity: city })),
  on(updateUnit, (state, { unit }) => ({ ...state, selectedUnit: unit })),
  on(clearAll, () => initialAppState)
);
