import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import * as usersActions from '../actions';

@Injectable({
    providedIn: 'root'
})
export class UsersEffects {
    constructor(private actions$: Actions,
                private userService:UserService
        ) {}

    getUsers$ = createEffect(
        () => this.actions$
                .pipe(
                    ofType(usersActions.getUsers),
                    tap(console.log),
                    mergeMap( 
                        () => this.userService.getUsers()
                        .pipe(
                            tap(console.log),
                            map( users => usersActions.getUsersSuccess({users}) ),
                            tap(console.log),
                                catchError( err => of(usersActions.getUsersError({payload:err}) ))
                            )
                        
                    )
                )
        )
}
