import { useState } from "react";
import { View } from "react-native";

import CodeScannerComponent from "./app/components/CodeScanner";
import ProductsList from "./app/components/ProductsList";
import { Product } from "./app/utils/types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductScanned = (
    scannedProduct: Product
  ) => {
    setProducts(prevProducts => {
      const existingProduct =
        prevProducts.find(
          item =>
            item.barcode ===
            scannedProduct.barcode
        );

      if (existingProduct) {
        return prevProducts.map(item =>
          item.barcode ===
          scannedProduct.barcode
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevProducts,
        {
          ...scannedProduct,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (
    barcode: string
  ) => {
    setProducts(prev =>
      prev.map(item =>
        item.barcode === barcode
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (
    barcode: string
  ) => {
    setProducts(prev =>
      prev
        .map(item =>
          item.barcode === barcode
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          item => item.quantity > 0
        )
    );
  };

  const totalAmount = products.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <View style={{ flex: 1 }}>
      <CodeScannerComponent
        onProductScanned={
          handleProductScanned
        }
      />

      <ProductsList
        products={products}
        onIncrease={
          increaseQuantity
        }
        onDecrease={
          decreaseQuantity
        }
        totalAmount={totalAmount}
      />
    </View>
  );
}

export default App;
