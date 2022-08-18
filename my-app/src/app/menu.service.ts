import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from "rxjs";
import { Imenu } from './menutype';
import { Itoken } from './tokentype';
import { Iuser } from './usertype';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private token:string; 
  private tokentimer:any;
  //private authStatusListener = new Subject<boolean>();
  //private _url:string="/assets/data/data.json";
  constructor(private http:HttpClient) { }

  getMenu():Observable<Imenu>{
    return this.http.get<Imenu>("http://54.237.202.253:3000/api/posts"); 
  }

  getNonveg():Observable<Imenu>{
    return this.http.get<Imenu>("http://54.237.202.253:3000/api/posts/nonveg");
  }

  getveg():Observable<Imenu>{
    return this.http.get<Imenu>("http://54.237.202.253:3000/api/posts/veg");
  }

  createUser(name: string,email: string,password: string){
    var res:any;
    const authData={name:name,email:email,password:password};
    this.http.post("http://54.237.202.253:3000/signup",authData)
    .subscribe(response=>{
        res=response
        window.location.reload();
    })
    console.log(res)
  }

  finduser(email:string,password:string){

    const mail={email:email,password:password}
    this.http.post<Itoken>("http://54.237.202.253:3000/login",mail).subscribe(
      response=>{
        const token=response.token;
        this.token=token;
        sessionStorage.setItem('token',this.token);
        const expiresInDuration=response.expiresIn;
        this.tokentimer=setTimeout(()=>{
          this.logout();
        },expiresInDuration);
        window.location.reload();
    
      })
  }

  logout() {
    this.token=null;
    clearTimeout(this.tokentimer);
    sessionStorage.removeItem('token');
  }

  getuser():Observable<any>{
   
    const token={token:sessionStorage.getItem('token')}
    var subject = new Subject<string>();
    let username
    this.http.post<Iuser>("http://54.237.202.253:3000/token",token).subscribe(
    data =>{  
      username=[data.name,data._id]
      subject.next(username);
    });
   return subject.asObservable()

  }

  updateCart(itemid){
    this.getuser().subscribe(
    data=>{
      const item={name:data[1],item:itemid}
      this.http.post("http://54.237.202.253:3000/addcart",item).subscribe(data=>{    
        window.location.reload();
      })
    })  
  }

  findItems(){
    const userid={token:sessionStorage.getItem('token')}
    return this.http.post("http://54.237.202.253:3000/findItem",userid)
  }

  findItemsDetails(arr){ 
    const item={id:arr}
    return this.http.post("http://54.237.202.253:3000/findDetails",item)
  }

  update(id:any,quantity:any){
    console.log("k")
    this.getuser().subscribe(
    data=>{
      const item={userid:data[1],menuid:id,quan:quantity}
      this.http.post("http://54.237.202.253:3000/update",item).subscribe(data =>{
        window.location.reload();
      })
    })
  }


  display(){
    const token={token:sessionStorage.getItem('token')}
    return this.http.post<Iuser>("http://54.237.202.253:3000/token",token)
  }

  removeCart(id){
    this.getuser().subscribe(
      data=>{
        const item={userid:data[1],menuid:id}
        this.http.post("http://54.237.202.253:3000/removeItem",item).subscribe(data =>{
          window.location.reload();    
        })
      })
  }


  findUserDetails(){
    const user={token:sessionStorage.getItem('token')}
    return this.http.post("http://54.237.202.253:3000/profile",user)
  }

  updatePhone(phno){
    this.getuser().subscribe(
      data=>{
        const ph={id:data[1],phone:phno}
        this.http.post("http://54.237.202.253:3000/phone",ph).subscribe(data=>{
          window.location.reload();
        })    
      })  
  }

  updateAdress(address){
    this.getuser().subscribe(
    data=>{
      const a={id:data[1],add:address}
      this.http.post("http://54.237.202.253:3000/ad",a).subscribe(data=>{
        window.location.reload();
      })
    })
  }

  updatepassword(pwd){
    this.getuser().subscribe(
    data=>{
      const pass={id:data[1],password:pwd}
      this.http.post("http://54.237.202.253:3000/passw",pass).subscribe(data=>{
        window.location.reload();
      })
    })  
  }
  
}
