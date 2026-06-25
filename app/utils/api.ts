import { CartItem } from "./types";

const BASE_URL = 'http://localhost:3000';

export const getProductByBarcode = async (barcode: string) => {
    const response = await fetch(`${BASE_URL}/products/${barcode}`);
    const json = await response.json();

    if (!json.success) {
        return null;
    }

    return {
        id: json.data.id,
        barcode: json.data.barcode,
        name: json.data.name,
        price: Number(json.data.price),
    };
};

export const sendReceipt = async (
    email: string,
    cart: CartItem[],
    totalAmount: number
) => {
    const response = await fetch(
        `${BASE_URL}/email/send-email`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                cart,
                totalAmount,
            }),
        }
    );

    return response.json();
};