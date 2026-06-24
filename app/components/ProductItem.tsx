import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

interface Product {
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Props {
  item: Product;
  onIncrease: (barcode: string) => void;
  onDecrease: (barcode: string) => void;
}

const ProductItem = ({
  item,
  onIncrease,
  onDecrease,
}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            item.image ??
            "https://via.placeholder.com/60",
        }}
        style={styles.image}
      />

      <View style={styles.details}>
        <Text
          numberOfLines={2}
          style={styles.name}
        >
          {item.name}
        </Text>

        <Text style={styles.price}>
          ₹{item.price}
        </Text>
      </View>

      <View style={styles.quantityBox}>
        <TouchableOpacity
          onPress={() =>
            onDecrease(item.barcode)
          }
        >
          <Text style={styles.button}>
            -
          </Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>
          {item.quantity}
        </Text>

        <TouchableOpacity
          onPress={() =>
            onIncrease(item.barcode)
          }
        >
          <Text style={styles.button}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>
        ₹
        {item.price *
          item.quantity}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF",
    marginBottom: 8,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },

  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  button: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#2563EB",
  },

  quantity: {
    fontSize: 18,
    fontWeight: "600",
    minWidth: 30,
    textAlign: "center",
  },

  total: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "700",
    width: 70,
    textAlign: "right",
  },
});

export default ProductItem;