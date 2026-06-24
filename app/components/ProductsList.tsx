import React from "react";
import {
  FlatList,
  View,
} from "react-native";
import ProductItem from "./ProductItem";
import { Product } from "../utils/types";

interface Props {
    products: Product[];
    onIncrease: (barcode: string) => void;
    onDecrease: (barcode: string) => void;
}

const ProductsList = ({
  products,
  onIncrease,
  onDecrease,
}: Props) => {
  return (
    <View style={{ flex: 0.6, backgroundColor: "white" }}>
      <FlatList
        data={products}
        keyExtractor={item =>
          item.barcode
        }
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onIncrease={
              onIncrease
            }
            onDecrease={
              onDecrease
            }
          />
        )}
      />
    </View>
  );
};

export default ProductsList;