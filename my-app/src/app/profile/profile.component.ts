import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
public user=[];
userphone={phno:''};
useradd={add:''};
phoneno:String;
add:string;
public error="";
pwd={password1:'',password2:''};
  constructor(private _menus:MenuService) { }

  ngOnInit() {
    this._menus.findUserDetails().subscribe(data=>{
  
      this.user=data[0];
      if(!data[0].phone){
          this.phoneno="Phone-no";
      }
      else{
        this.phoneno=data[0].phone;
      }
      if(!data[0].address){
        this.add="address";
    }
    else{
      this.add=data[0].address;
    }
     
    })
  }
  phone(){
    this._menus.updatePhone(this.userphone.phno)
    window.location.reload();
  }

  address(){
    this._menus.updateAdress(this.useradd.add)
    window.location.reload();
  }
password(){

  const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
  const valid = regex.test(this.pwd.password1);

  if(valid){
if(this.pwd.password1==this.pwd.password2){
  this._menus.updatepassword(this.pwd.password1)
}
else{
  this.error="Password and confirmed password doesnt match";
}
}
else{
  this.error="Password should have minimum 8 characters,at least 1 uppercase,1 lowercase letter and 1 number";
}
}


}
