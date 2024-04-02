import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent {
baseUrl = environment.url
private apiService:ApiService = inject(ApiService);
public products:any = [];


ngOnInit(){
  this.getItems();
}


  getItems(){
    this.apiService.get(`product`).subscribe((data:any)=>{
      this.products = data
    })
  }


addToCart(item: any){
  this.apiService.addToCart(item)
}
}