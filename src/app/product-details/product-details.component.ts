import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  title = 'Shop At Tact';
  public products: any = [];
  public service: any;
  constructor(private _productsService: ProductsService) {}

  // Find that Particular product from cart or return -1
  findProduct(product: any): any {
    let index = -1;

    this.service.cart.find(function(item: any, i: number) {
      if (item.id === product.id) {
        index = i;
      }
    });
    return index;
  }

  // Filter that Particular product and Return new Array.
  filterProduct(id: number, cart: any): any {
    const filteredcart = cart.filter((item: any) => item.id !== id);
    return filteredcart;
  }

  // When user clicks on 'ADD ITEM'
  // Find that item from our cart, Gets it's Index
  // IF we don't have that item in our cart-list, then add it as  'NEW ITEM',
  // ELSE Increment that item present in the cart, Return New cart
  handleIncrement(product: any): void {
    const itemIndex = this.findProduct(product);

    if (itemIndex === -1) {
      let newItem: any = product;
      const quantity = 1;
      const totalprice = newItem.price;

      newItem = {
        ...newItem,
        quantity,
        totalprice
      };
      this.service.cart.push(newItem);
    } else {
      this.service.cart[itemIndex].quantity =
        this.service.cart[itemIndex].quantity + 1;
      this.service.cart[itemIndex].totalprice =
        this.service.cart[itemIndex].quantity * product.price;
    }
  }

  // Decide whether'Remove Button' should show or hide
  // SHOW, If we have that item in our cart-list
  // HIDE, If we don't have that item in our cart-list
  deactivateButton(product: any) {
    const itemIndex: number = this.findProduct(product);
    if (
      this.service.cart[itemIndex] &&
      this.service.cart[itemIndex].quantity > 0
    ) {
      return 'show';
    } else {
      return 'hide';
    }
  }

  // When user Clicks on 'Remove Button'
  // Find that item from cart, Get it's Index.
  // IF we have that item in our cart-list, then decrement it and Return New cart.
  // Load cart - Will filter and return 'New cart' array, where cart-items quantity > 0
  handleDecrement(product: any) {
    const itemIndex: number = this.findProduct(product);

    if (
      this.service.cart[itemIndex] &&
      this.service.cart[itemIndex].quantity > 0
    ) {
      this.service.cart[itemIndex].quantity =
        this.service.cart[itemIndex].quantity - 1;
      this.service.cart[itemIndex].totalprice =
        this.service.cart[itemIndex].quantity * product.price;
    }
    this.loadCart();
  }

  // Load cart- Checks if quantity > 0, then retain it.
  // Else, Remove that products having 0 quantity.
  // Assign New Cart and Return it.
  loadCart() {
    this.service.cart.forEach((item: any) => {
      if (item.quantity <= 0) {
        this.service.cart = this.filterProduct(item.id, this.service.cart);
      }
    });

    return this.service.cart;
  }

  ngOnInit() {
    this.service = this._productsService;
    this.products = this.service.getProducts();
  }
}
