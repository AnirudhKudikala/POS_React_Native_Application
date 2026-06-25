import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface Product {
    barcode: string;
    name: string;
    price: number;
    image?: string;
}

export interface CartItem extends Product{
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
