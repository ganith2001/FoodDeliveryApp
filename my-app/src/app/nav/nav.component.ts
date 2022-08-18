import { Component, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../menu.service';





@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public login:any;
  public user={username:'',email:'',password1:'',password2:''};
  public userlogin={email:'',password:''};
  public log=true;
  public t:string;
  public arr=[];
  public arr2=[]
  public length1:Number;
  public error="";

  constructor(public modalService: NgbModal,private _menus:MenuService) { }

  submitted = false;
  ngOnInit() {

    if(sessionStorage.getItem('token')){

      this._menus.getuser().subscribe(data=>this.t=data[0])
      this.log=false;

   }
     
  }

  disable=true;
  open1(login){
    this.modalService.open(login);
    this.disable=false;
  }

  open2(signup){
    this.modalService.open(signup);
    this.disable=false;
  }

  close(){
    this.disable=true;
    this.error="";
    this.userlogin.email="";
    this.userlogin.password="";
    this.user.email="";
    this.user.username="";
    this.user.password1="";
    this.user.password2=""
  }

  onSignup() {
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    const valid = regex.test(this.user.password1);

    if(valid) {
      if(this.user.password1==this.user.password2){
        this._menus.createUser(this.user.username,this.user.email,this.user.password1)
      }
      else {
        this.error="Password and confirmed password doesnt match";
      }
    }
    else {
      this.error="Password should have minimum 8 characters,at least 1 uppercase,1 lowercase letter and 1 number";
    }
  }

  onLogin(){
    this._menus.finduser(this.userlogin.email,this.userlogin.password);
    this.error="Incorrect password or email";
  }

  onLogout(){
    this._menus.logout();
    window.location.reload();
  }

}
 