import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  public cartItems: any = JSON.parse(localStorage.getItem('cart')) || [];
  public service: any;

  constructor(private _productsService: ProductsService) {}

  // Removes whole product from the Cart list
  removeProduct(id: number): any {
    this.service.cart = this.service.cart.filter((item: any) => item.id !== id);
    // localStorage.setItem('cart', JSON.stringify(this.cartItems));
    return this.service.cart;
  }
  ngOnInit() {
    // Service for Sharing data and Common functions.
    this.service = this._productsService;
  }
}
