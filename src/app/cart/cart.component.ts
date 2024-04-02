import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
products:any = [];
baseUrl = environment.url;
totalPrice = 0;
private apiService = inject(ApiService);
private toaster = inject(ToastrService);

ngOnInit() {
  this.getProducts();
}

getProducts(){
const items = localStorage.getItem('cart');
this.products = items ? JSON.parse(items) : [];
this.totalPrice = 0;
this.products.forEach((data:any) => {
  this.totalPrice += data.quantity * data.price;
})
}

addToCart(item:any){
this.apiService.addToCart(item);
this.getProducts();
}

deleteFromCart(id: string){
  const items = localStorage.getItem('cart');
  let products = items ? JSON.parse(items) : [];
  products.forEach((data:any , index:number)=> {
    if(data.id === id && data.quantity ===1){
     products.splice(index, 1)
    } else if(data.id === id && data.quantity > 1) {
      data.quantity--;
    }
  })
  localStorage.setItem('cart', JSON.stringify(products));
  this.getProducts();
}

ordered(){
  localStorage.removeItem('cart');
  this.toaster.success("Ordered Placed Successfully","Contact our office for confirmation")
  this.getProducts()
}

}
