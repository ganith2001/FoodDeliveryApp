import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { Routes } from "@angular/router";

import { CartComponent } from "../cart/cart.component";
import { HomeComponent } from "../home/home.component";
import { MenuComponent } from "../menu/menu.component";
import { ProfileComponent } from '../profile/profile.component';

   var routes:Routes=[
    {path:'home',component:HomeComponent},
   
   
    {path:'',redirectTo:'/home',pathMatch:"full"}
];

if(sessionStorage.getItem('username')){
   var routes:Routes=[
   
    {path:'home',component:MenuComponent},
    {path:'cart',component:CartComponent},
    {path:'profile',component:ProfileComponent},
    {path:'',redirectTo:'/home',pathMatch:"full"}
  ]

}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
