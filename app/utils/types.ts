import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface Product {
    barcode: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export type RootStackParamList = {
  PermissionsScreen: undefined;
  MainScreen: undefined;
};

export type PermissionsScreenNavigationProp =
  NativeStackNavigationProp<
    RootStackParamList,
    "PermissionsScreen"
  >;