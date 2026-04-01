import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Cart } from 'src/carts/cart.entity';

@ChildEntity()
export class Client extends User {
  @OneToOne(() => Cart, (cart) => cart.client, { cascade: true, eager: true })
  // cascade makes it so that when you create a client, it will automatically create a cart for it.
  // eager makes the cart automatically load when calling a client from the db.
  // Sources: https://typeorm.io/docs/relations/relations/#cascades
  //          https://typeorm.io/docs/relations/eager-and-lazy-relations/#eager-relations
  @JoinColumn()
  cart: Cart;
}
