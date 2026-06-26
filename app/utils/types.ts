import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface Product {
    id: number,
    barcode: string;
    name: string;
    price: number;
    image?: string;
}

export interface CartItem extends Product{
    quantity: number
}

export interface ProductsDetails {
    productId: number,
    quantity: number
}

export type RootStackParamList = {
    PermissionsScreen: undefined;
    MainScreen: undefined;
};

export type PermissionsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'PermissionsScreen'
>;
