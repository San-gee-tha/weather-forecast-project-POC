import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherApiService } from '../weather-api.service';
import { updateCity } from './app.actions';
import { loadCurrentConditionsSuccess, loadCurrentConditionsFailure } from './app.actions.extra';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private weatherApiService: WeatherApiService
  ) {}

  // Example: Effect to fetch current conditions when a city is added or updated
//   fetchCurrentConditions$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(updateCity),
//       mergeMap(action =>
//         this.weatherApiService.getCurrentConditions(action.city.key).pipe(
//           map(data => loadCurrentConditionsSuccess({ data })),
//           catchError(error => of(loadCurrentConditionsFailure({ error })))
//         )
//       )
//     )
//   );
}
