import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {initializeTokensFromLocalStorage} from "./pages/authentication/auth-store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements  OnInit {
  constructor(private store: Store) {
  }
  title = 'Spike Angular Admin Tempplate';

  ngOnInit(): void {
     //this.store.dispatch(AppinitializeTokensFromLocalStorage());
  }
}
