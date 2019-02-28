import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, map, take, tap } from 'rxjs/operators'
import { Cart } from 'shared/models/cart.model'
import { CartItem } from 'shared/models/cart-item.model'
import { Product } from 'shared/models/product.model'

@Injectable()
export class CartService {
  public cart: Cart

  private itemsSubject$: BehaviorSubject<CartItem[]>
  public items$: Observable<CartItem[]>
  public totalQuantity$: Observable<number>
  public totalPrice$: Observable<number>

  private readonly path = 'api/shopping_carts'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient) {
    this.itemsSubject$ = new BehaviorSubject<CartItem[]>([])
    this.items$ = this.itemsSubject$.asObservable()
    this.totalQuantity$ = this.itemsSubject$
      .asObservable()
      .pipe(map(items => this._getTotalQuantity(items)))
    this.totalPrice$ = this.itemsSubject$
      .asObservable()
      .pipe(map(items => this._getTotalPrice(items)))

    // load cart from backend
    this.loadCart()
  }

  private loadCart() {
    this.getCart()
      .pipe(
        tap(cart => {
          // save cartId to local
          localStorage.setItem('cartId', cart._id)
          this.cart = cart
          this.itemsSubject$.next(cart.items)
        }),
        take(1)
      )
      .subscribe()
  }

  addToCart(product: Product, quantity: number) {
    // update or add item
    const cartItem = this.cart.items.find(item => item.product._id === product._id)
    if (cartItem) {
      cartItem.quantity = quantity
    } else {
      this.cart.items.push({ product, quantity })
    }

    // remove items whose quantity is 0
    this.cart.items = this.cart.items.filter(item => item.quantity > 0)

    this.updateItems()
  }

  updateItems() {
    // update local
    this.itemsSubject$.next(this.cart.items)

    // update backend
    this.updateCart(this.cart)
  }

  clearShoppingCart() {
    this.cart.items = []
    this.updateItems()
  }

  private updateCart(cart: Cart) {
    this.http
      .patch(this.path, JSON.stringify(cart), { headers: this.headers })
      .pipe(take(1))
      .subscribe()
  }

  private getCart(): Observable<Cart> {
    const cartId = localStorage.getItem('cartId')

    if (cartId) {
      return this.getExistCart(cartId)
    } else {
      return this.createEmptyCart()
    }
  }

  private getExistCart(cartId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.path}/${cartId}`).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          localStorage.removeItem('cartId')
          return this.createEmptyCart()
        } else {
          return throwError(error)
        }
      })
    )
  }

  private createEmptyCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.path}/create`)
  }

  public getQuantityByProductId(productId: string): Observable<number> {
    return this.items$.pipe(
      map(items => items.filter(cartItem => cartItem.product._id === productId)[0]),
      map(item => (item ? item.quantity : 0))
    )
  }

  private _getTotalQuantity(items: CartItem[]): number {
    return items
      .map(item => item.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  private _getTotalPrice(items: CartItem[]): number {
    return items
      .map(item => item.quantity * item.product.price)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  public getTotalQuantity(): number {
    return this.cart.items
      .map(item => item.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  public getTotalPrice(): number {
    return this.cart.items
      .map(item => item.quantity * item.product.price)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }
}
