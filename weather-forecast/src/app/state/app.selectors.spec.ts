import { selectAppState, selectSelectedCity, selectSelectedUnit, selectSelectedUnitandCity, selectCurrentConditions } from './app.selectors';
import { AppState } from './app.state';
import { unitType } from '../modals/cities.modal';

describe('App Selectors', () => {
  const mockState: { app: AppState } = {
    app: {
      selectedCity: { key: 1, name: 'City1', country: 'Country1', administrativeArea: 'Area1', type: 'city' },
      selectedUnit: unitType.METRIC,
      currentConditions: { temp: 25, desc: 'Sunny' },
      // ...other state properties if needed
    } as any
  };

  it('should select app state', () => {
    expect(selectAppState.projector(mockState.app)).toBe(mockState.app);
  });

  it('should select selected city', () => {
    expect(selectSelectedCity.projector(mockState.app)).toEqual(mockState.app.selectedCity);
  });

  it('should select selected unit', () => {
    expect(selectSelectedUnit.projector(mockState.app)).toEqual(unitType.METRIC);
  });

  it('should select selected unit and city', () => {
    expect(selectSelectedUnitandCity.projector(mockState.app)).toEqual({ unit: unitType.METRIC, city: mockState.app.selectedCity });
  });

  it('should select current conditions', () => {
    expect(selectCurrentConditions.projector(mockState.app)).toEqual(mockState.app.currentConditions);
  });
});
