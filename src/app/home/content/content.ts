import { Product } from './../../core/models/product';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <app-content-header (toggleSize)="toggleSize($event)" (onProductViewComplete)="hideProducts()"></app-content-header>
    <app-customize></app-customize>
    <app-product-list [(toggleLayout)]='toggleLayout' [products]='products' [filters]="filters"></app-product-list>
  `,
//   styleUrls: ['./content-header.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() products: Product[];
  @Input() filters;
  @Output() onProductViewComplete = new EventEmitter();

  toggleLayout = {size: 'COZY'};

  constructor() { }

  ngOnInit() {
  }

  toggleSize(layoutInfo) {
    this.toggleLayout = layoutInfo;
  }
  
  hideProducts() {
    this.onProductViewComplete.emit();
  }

}
