import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public cart = [];
  public discountAmount = 0;
  constructor() {}

  getProducts() {
    return [
      {
        id: 1,
        name: 'Business Adventures',
        price: 300,
        imagepath: '../assets/businessadventures.jpg',
        description:
          'This business classic written by longtime New Yorker contributor John Brooks is an insightful and engaging look into corporate and financial life in America. '
      },
      {
        id: 2,
        name: 'The 7 Habits of Highly Effective People',
        price: 329,
        imagepath: '../assets/sevenhabitsofhighlyeffectivepeople.jpg',
        description:
          'a holistic, integrated, principle centered approach for solving personal and professional problems. living with fairness, integrity, service, and human dignity--principles that give us the security to adapt to change and the wisdom and power to take advantage of the opportunities that change creates.'
      },
      {
        id: 3,
        name: 'Elon Musk',
        price: 295,
        imagepath: '../assets/elonmusk.jpg',
        description:
          'Ashlee Vance captures the full spectacle and arc of the genius life and work, from his tumultuous upbringing in South Africa and flight to the United States to his dramatic technical innovations and entrepreneurial pursuits.'
      },
      {
        id: 4,
        name: 'The $100 Startup',
        price: 280,
        imagepath: '../assets/dollar100startup.jpg',
        description:
          'In The $100 Startup, Chris Guillebeau shows you how to lead of life of adventure, meaning and purpose – and earn a good living.'
      },
      {
        id: 5,
        name: 'Steve Jobs',
        price: 388,
        imagepath: '../assets/stevejobs.jpg',
        description:
          'From the author of the bestselling biographies of Benjamin Franklin and Albert Einstein, this is the exclusive, New York Times bestselling biography of Apple co-founder Steve Jobs.'
      },
      {
        id: 6,
        name: 'JavaScript: The Good Parts',
        price: 300,
        imagepath: '../assets/javascriptgoodparts.jpg',
        description:
          'This authoritative book scrapes away these bad features to reveal a subset of JavaScript that is more reliable, readable, and maintainable than the language as a whole--a subset you can use to create truly extensible and efficient code.'
      },
      {
        id: 7,
        name: 'Eloquent JavaScript',
        price: 460,
        imagepath: '../assets/eloquentjs.jpg',
        description:
          'A concise and balanced mix of principles and pragmatics. I loved the tutorial-style game-like program development. This book rekindled my earliest joys of programming. Plus, JavaScript!" —Brendan Eich, creator of JavaScript'
      },
      {
        id: 8,
        name: 'Learning React: Functional Web Development with React and Redux',
        price: 520,
        imagepath: '../assets/learnreact.jpg',
        description:
          'Authors Alex Banks and Eve Porcello show you how to create UIs with this small JavaScript library that can deftly display data changes on large-scale, data-driven websites without page reloads.'
      }
    ];
  }
  calculatePrice() {
    let price = 0;
    this.cart.forEach((item: any) => {
      price = price + item.totalprice;
    });
    return price > 0 ? price : null;
  }

  shippingPrice(product: any) {
    let shippingPrice: number = 0.2 * product.quantity * product.price;
    shippingPrice = Math.round(shippingPrice * 1e2) / 1e2;
    return shippingPrice;
  }

  // 15% discount IF, TotalPrice of items(without Shipping and handling chagrges) is greater than 500Rs.
  discount() {
    let price = 0;
    price = this.calculatePrice();

    if (price >= 500) {
      price = price * 0.15;
      this.discountAmount = Math.round(price * 1e2) / 1e2;
      return this.discountAmount;
    } else {
      this.discountAmount = 0;
      return false;
    }
  }

  // Show offer IF cart price is lesser than 500rs
  showOffer() {
    const price: number = this.calculatePrice();
    const shopforAnotherPrice = 500 - price;
    return shopforAnotherPrice;
  }

  // Total shipping price, required to calculate final amount
  totalShippingPrice(): number {
    let price = 0;
    this.cart.forEach((item: any) => {
      price = price + this.shippingPrice(item);
    });
    price = Math.round(price * 1e2) / 1e2;
    return price > 0 ? price : null;
  }

  // Final amount to be paid
  FinalPayingAmount() {
    const totalPrice = this.calculatePrice();
    const shippingPrice = this.totalShippingPrice();

    let finalAmount = totalPrice + shippingPrice - this.discountAmount;
    finalAmount = Math.round(finalAmount * 1e2) / 1e2;
    finalAmount = Math.ceil(finalAmount);
    return finalAmount;
  }

  cartTotalQuantity() {
    let quantity = 0;
    this.cart.forEach((item: any) => {
      quantity = quantity + item.quantity;
    });
    return quantity;
  }

  // Particular Item Quantity.
  ItemQuantity(id: number) {
    let qty = 0;
    this.cart.forEach((item: any) => {
      if (id === item.id) {
        qty = item.quantity;
      }
    });

    if (qty === 0) {
      return null;
    } else {
      return qty;
    }
  }
}
