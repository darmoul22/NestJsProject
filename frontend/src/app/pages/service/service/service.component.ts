import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {AsyncPipe, NgForOf} from "@angular/common";
import {TablerIconsModule} from "angular-tabler-icons";
import {Store} from "@ngrx/store";
import { ServiceActions, ServiceSelectors } from '../service-store';
import {Observable} from "rxjs";
import {ServiceModel} from "../../../core/models/service.model";
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}
@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    TablerIconsModule,
    AsyncPipe
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {
  services$ !: Observable<ServiceModel[] | null>
  productcards: productcards[] = [
    {
      id: 1,
      imgSrc: '/assets/images/products/p1.jpg',
      title: 'Boat Headphone',
      price: '285',
      rprice: '375',
    },
    {
      id: 2,
      imgSrc: '/assets/images/products/p2.jpg',
      title: 'MacBook Air Pro',
      price: '285',
      rprice: '375',
    },
    {
      id: 3,
      imgSrc: '/assets/images/products/p3.jpg',
      title: 'Red Valvet Dress',
      price: '285',
      rprice: '375',
    },
    {
      id: 4,
      imgSrc: '/assets/images/products/p4.jpg',
      title: 'Cute Soft Teddybear',
      price: '285',
      rprice: '375',
    },
    {
      id: 5,
      imgSrc: '/assets/images/products/p4.jpg',
      title: 'Cute Soft Teddybear',
      price: '285',
      rprice: '375',
    },
  ];
  constructor(private readonly store: Store) {
    this.store.dispatch(ServiceActions.pageEnter())
  }

  ngOnInit(): void {
    this.services$ = this.store.select(ServiceSelectors.selectServices);
  }

}
