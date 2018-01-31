import { SearchActions } from './../../reducers/search.actions';
import { getFilters } from './../../reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from './../../../interfaces';
import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-taxons',
  templateUrl: './taxons.component.html',
  styleUrls: ['./taxons.component.scss']
})
export class TaxonsComponent implements OnChanges {
  @Input() taxonomies;
  @Output() onFilterComplete = new EventEmitter();

  searchFilters$: Observable<any>;
  selectedFilters = {};
  isFilterApplied: boolean = false;
  currentTaxonomyIndex: number;
  currentTaxonomy: string;

  constructor(private store: Store<AppState>, 
    private actions: SearchActions,
    private ref: ChangeDetectorRef) {
    this.searchFilters$ = this.store.select(getFilters);
    this.searchFilters$.subscribe(data => {
      this.selectedFilters = data;
      this.isFilterApplied = data && (Object.keys(data).length > 0);
    });
  }

  ngOnChanges() {
    this.currentTaxonomyIndex = 0;
    this.currentTaxonomy = this.taxonomies[0];
  }

  nextTaxonomy() {
    this.currentTaxonomyIndex++;
    this.currentTaxonomy = this.taxonomies[ this.currentTaxonomyIndex ];
  }

  previousTaxonomy() {
    this.currentTaxonomyIndex--;
    this.currentTaxonomy = this.taxonomies[ this.currentTaxonomyIndex ];
  }

  showProducts() {
    this.onFilterComplete.emit();
  }

  isChecked(taxonomy, taxon) {
    return this.selectedFilters[taxonomy] && this.selectedFilters[taxonomy].indexOf(taxon.name) >= 0;
  }

  taxonSelected(taxonomy, taxon, checked) {
    if (checked) {
      this.store.dispatch(this.actions.addFilter({taxonomy: taxonomy.name, taxon: taxon.name}));
    } else {
      this.store.dispatch(this.actions.removeFilter({taxonomy: taxonomy.name, taxon: taxon.name}));
    }
  }
}
