import { getFilters } from './reducers/selectors';
import { Taxonomy } from './../core/models/taxonomy';
import { environment } from './../../environments/environment';
import { ProductActions } from './../product/actions/product-actions';
import { AppState } from './../interfaces';
import { getProducts, getTaxonomies } from './../product/reducers/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from '../core/models/product';
import { HttpService } from '../core/services/http';

@Component({
  selector: 'app-home',
  templateUrl: `home.component.html`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productTypes: Array<string> = [];
  selectedProductType: string;

  products$: Observable<any>;
  taxonomies$: Observable<any>;
  selectedFilters$: Observable<number[]>;
  productTypeListVisible: boolean = true;
  showProductsList: boolean = false;

  constructor(private store: Store<AppState>, private actions: ProductActions, private http: HttpService) {
    // Get all products for the product list component
    this.products$ = this.store.select(getProducts);
    this.taxonomies$ = this.store.select(getTaxonomies);
    this.selectedFilters$ = this.store.select(getFilters);
  }

  ngOnInit() { 
    // this.http.get("/on15x")
    this.http.get("/products/productTypes")
      .subscribe((data) => {
        this.productTypes = data.json();
        this.selectedProductType = this.productTypes[0];
      });
  }

  showProducts() {
    this.showProductsList = true;
  }

  hideProducts() {
    this.showProductsList = false;
  }

  hideProductTypeList() {
    this.productTypeListVisible = false;
    this.store.dispatch(this.actions.getAllProducts(this.selectedProductType));
    // this.store.dispatch(this.actions.getAllTaxonomies());
  }

}
