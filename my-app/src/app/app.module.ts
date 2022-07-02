import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

 
import { AppComponent  } from './app.component';



import { MatToolbarModule } from '@angular/material/toolbar';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { NavComponent } from './nav/nav.component';
import {MatMenuModule} from '@angular/material/menu';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatInputModule } from '@angular/material/input';

import { MenuService } from './menu.service';
import { MenuComponent } from './menu/menu.component';

import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';



import { RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProfileComponent } from './profile/profile.component';






@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    HomeComponent,
    CartComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
   
    MatToolbarModule,
    
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgbModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
 
    RouterModule,
    MatFormFieldModule,
    AppRoutingModule
    
    
    
    
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
