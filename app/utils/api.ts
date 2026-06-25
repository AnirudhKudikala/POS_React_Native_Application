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