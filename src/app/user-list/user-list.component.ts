import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../services/user.service';
import *  as usersActions from '../store/actions';
import { AppState } from '../store/app.reducers';
import { User } from '../interfaces/user.interface';
import { catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  public users:User[] = [];
  public loading: boolean = false;
  public error = null;
  private usersSubscription!:Subscription;
  constructor(private userService:UserService,
              private store:Store<AppState> ) { }

  ngOnInit(): void {
    
    this.usersSubscription = this.store.select('users').subscribe( ({users, loading, error}) => {
      this.users = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch( usersActions.getUsers() )
    
    // this.userService.getUsers()
    //   .pipe(
    //     catchError(err => of (this.store.dispatch(usersActions.getUsersError({payload:err}))) )
    //   )
    //   .subscribe(users => {
    //     if ( users ) {
    //        this.store.dispatch( usersActions.getUsersSuccess({users}) )
    //     }
    // });

  }

  ngOnDestroy(): void {
      this.usersSubscription.unsubscribe()
  }

}
