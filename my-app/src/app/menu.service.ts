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
  private authStatusListener = new Subject<boolean>();
private _url:string="/assets/data/data.json";
  constructor(private http:HttpClient) { }
  getMenu():Observable<Imenu>{
    return this.http.get<Imenu>("http://localhost:3000/api/posts");
    
  }

  getNonveg():Observable<Imenu>{
    return this.http.get<Imenu>("http://localhost:3000/api/posts/nonveg");
    
  }

  getveg():Observable<Imenu>{
    return this.http.get<Imenu>("http://localhost:3000/api/posts/veg");
    
  }

  createUser(name: string,email: string,password: string){
    
    const authData={name:name,email:email,password:password};
  
    this.http.post("http://localhost:3000/signup",authData)
    .subscribe(response=>{

        window.location.reload();
    })
}

finduser(email:string,password:string){

  const mail={email:email,password:password}
  this.http.post<Itoken>("http://localhost:3000/login",mail).subscribe(
    response=>{
 
      const token=response.token;
      this.token=token;
      sessionStorage.setItem('token',this.token);
      const expiresInDuration=response.expiresIn;
      this.tokentimer=setTimeout(()=>{
          this.logout();
      },expiresInDuration);
      window.location.reload();
    
  }
  )

  
}

logout(){
  this.token=null;

  clearTimeout(this.tokentimer);
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user_id');
  sessionStorage.removeItem('username');
}

getuser(){

const token={token:sessionStorage.getItem('token')}
   this.http.post<Iuser>("http://localhost:3000/token",token).subscribe(
    data =>{ 
     
      sessionStorage.setItem('user_id',data._id.toString())
      sessionStorage.setItem('username',data.name)


}

   );

}

updateCart(itemid){
  const item={name:sessionStorage.getItem('user_id'),item:itemid}

  this.http.post("http://localhost:3000/addcart",item).subscribe(response=>{

  })
}

findItems(){
  const userid={id:sessionStorage.getItem('user_id')}
 
  return this.http.post("http://localhost:3000/findItem",userid)
}

findItemsDetails(arr){
  
  const item={id:arr}
  return this.http.post("http://localhost:3000/findDetails",item)
}

update(id:any,quantity:any){
 
  const item={userid:sessionStorage.getItem('user_id'),menuid:id,quan:quantity}
  this.http.post("http://localhost:3000/update",item).subscribe(data =>{

  })
}


display(){

  const token={token:sessionStorage.getItem('token')}
   return this.http.post<Iuser>("http://localhost:3000/token",token)
  
  }

  remove(id){
   
    const item={userid:sessionStorage.getItem('user_id'),menuid:id}
    this.http.post("http://localhost:3000/removeItem",item).subscribe(data =>{
    
    })
  }


  findUserDetails(){
   
    const user={id:sessionStorage.getItem('user_id')}
    return this.http.post("http://localhost:3000/profile",user)
  }

  updatePhone(phno){
    const ph={id:sessionStorage.getItem('user_id'),phone:phno}

    this.http.post("http://localhost:3000/phone",ph).subscribe(data=>{
 
    })
  }

  updateAdress(address){
    const a={id:sessionStorage.getItem('user_id'),add:address}
  
    this.http.post("http://localhost:3000/ad",a).subscribe(data=>{
    
    })
  }

  updatepassword(pwd){
    const pass={id:sessionStorage.getItem('user_id'),password:pwd}
  
    this.http.post("http://localhost:3000/passw",pass).subscribe(data=>{
 
      window.location.reload();
    })
  }
}
