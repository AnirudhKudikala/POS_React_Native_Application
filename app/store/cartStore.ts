import { create } from 'zustand';
import { CartItem } from '../utils/types';
import { getProductByBarcode } from '../utils/api';

interface CartStore {
    cart: CartItem[];
    totalAmount: number;

    scanBarcode: (barcode: string) => Promise<void>;
    increaseQuantity: (barcode: string) => void;
    decreaseQuantity: (barcode: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    totalAmount: 0,

    scanBarcode: async barcode => {
        let product = await getProductByBarcode(barcode);

        if (!product) {
            console.log('Product not found');
            return;
        }

        const cartItems = {...product, quantity: 1}

        set(state => {
            const existing = state.cart.find(item => item.barcode === barcode);

            let updatedCart: CartItem[];

            if (existing) {
                updatedCart = state.cart.map(item =>
                    item.barcode === barcode
                        ? {
                              ...item,
                              quantity: item.quantity + 1
                          }
                        : item
                );
            } else {
                updatedCart = [
                    ...state.cart,
                    {
                        ...cartItems
                    }
                ];
            }

            return {
                cart: updatedCart,
                totalAmount: updatedCart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                )
            };
        });
    },

    increaseQuantity: barcode =>
        set(state => {
            const cart = state.cart.map(item =>
                item.barcode === barcode
                    ? {
                          ...item,
                          quantity: item.quantity + 1
                      }
                    : item
            );

            return {
                cart,
                totalAmount: cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                )
            };
        }),

    decreaseQuantity: barcode =>
        set(state => {
            const cart = state.cart
                .map(item =>
                    item.barcode === barcode
                        ? {
                              ...item,
                              quantity: item.quantity - 1
                          }
                        : item
                )
                .filter(item => item.quantity > 0);

            return {
                cart,
                totalAmount: cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                )
            };
        }),

    clearCart: () =>
        set({
            cart: [],
            totalAmount: 0
        })
}));
