import { Component, OnInit } from '@angular/core';

import { MenuService } from '../menu.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
public item=[];
public quantity={};
public cartitems:any;
public total=0;



  constructor(private _menus:MenuService) { }

  ngOnInit() {
  
    
   this._menus.findItems().subscribe(data=>{
    var i=0;

    for(var val of data[0].menu){
   
  
      this.quantity[val.item]=val.quantity

 
      this._menus.findItemsDetails(val.item).subscribe(response=>{
        
        this.cartitems=response;
        this.item.push(this.cartitems[0])
        this.total=this.total+(this.cartitems[0].price*val.quantity);
      
        i++;
      })
      
      
    }
    
      
    
    }) 
  
    
  }


  onadd(id,quantity){
    
    if(quantity<5){

      this._menus.update(id,quantity+1);

   
    }
  }

  onsub(id,quantity){
    if(quantity>1){
 
        this._menus.update(id,quantity-1);
    
    }
  }

}
