import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectSelectedCity = createSelector(
  selectAppState,
  (state) => state.selectedCity
);

export const selectSelectedUnit = createSelector(
  selectAppState,
  (state) => state.selectedUnit
);

export const selectCurrentConditions = createSelector(
  selectAppState,
  (state) => state.currentConditions
);
