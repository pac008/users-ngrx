import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions';
import { User } from '../../interfaces/user.interface';

export interface UsersState {
    users: User[];
    loading: boolean;
    error: any;
}

export const usersInitialState: UsersState = {
    users: [],
    error: null,
    loading: false
}

const _usersReducer = createReducer(usersInitialState,

    on(UserActions.getUsers, state => ({ ...state, loading:true})),
    on(UserActions.getUsersSuccess, (state, {users}) => (
        { 
            ...state, 
            loading:false,
            users: [...users]
        }
      )
    ),
    on(UserActions.getUsersError, (state, {payload}) => (
        { 
            ...state, 
            loading:false,
            users: [],
            error: {
                message: payload.message,
                name: payload.name,
                // url: payload.url,
                status: payload.status
            }
        }
      )
    ),
    

);

export function usersReducer(state:UsersState | undefined, action:Action) {
    return _usersReducer(state, action);
}