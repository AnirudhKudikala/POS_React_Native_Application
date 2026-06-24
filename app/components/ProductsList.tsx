import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductItem from "./ProductItem";
import { Product } from "../utils/types";

interface Props {
    products: Product[];
    totalAmount: number;
    onIncrease: (barcode: string) => void;
    onDecrease: (barcode: string) => void;
}

const ProductsList = ({
  products,
  totalAmount,
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
      <View style={styles.footer}>
        <Text style={styles.totalText}>
            Total: ₹{totalAmount}
        </Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#E5E5E5",
      backgroundColor: "#FFF",
    },
  
    totalText: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "right",
    },
});

export default ProductsList;