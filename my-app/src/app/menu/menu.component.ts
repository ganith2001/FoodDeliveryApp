import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public items=[];
  public arr=[];
  public arr2=[]
  public type="Both";
  searched:String;
  constructor(private _menus:MenuService) { }
  

  ngOnInit() {
    this._menus.getMenu().subscribe(
      data => this.items = Object.values(data)
     
    );

   
    if(sessionStorage.getItem('token')){
      this._menus.display().subscribe(data=>{
       
        for(var val of data.menu){
          
          this.arr.push(val)
          
        }
        for(var i=0;i<this.arr.length;i++){
          this.arr2.push(this.arr[i].item)
        }
       
       
      });
    }
  }

  cities=[
    {city:"Bangalore"},
    {city:"Delhi"},
    {city:"Mumbai"},
    {city:"Chennai"}
  ]
  name1:string="City" ;
  onClick(c){
    this.name1=c.city;
  }

  nonveg(){
    this._menus.getNonveg().subscribe(
      data => this.items = Object.values(data));
      this.type="Non-veg"
  }

  veg(){
    this._menus.getveg().subscribe(
      data => this.items = Object.values(data));
      this.type="Veg"
  }

  onadd(id){
  
      this._menus.updateCart(id);
      //window.location.reload();
  }
  onremove(id){
    console.log("lol")
    this._menus.removeCart(id);
   // window.location.reload();
  } 


}

