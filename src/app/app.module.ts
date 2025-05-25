import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './features/search/store/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { searchReducer } from './features/search/store/reducer';
import { HttpClientModule } from '@angular/common/http';
import { localStorageMetaReducer } from './features/search/store/local-storage.metareducer';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { search: searchReducer },
      { metaReducers: [localStorageMetaReducer] }
    ),
    EffectsModule.forRoot([SearchEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
