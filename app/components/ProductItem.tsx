import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Product } from "../utils/types";

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
    <View style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.imagePlaceholder}>
            📦
          </Text>
        )}
      </View>

      {/* Product Details */}
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

      {/* Quantity Controls */}
      <View style={styles.rightSection}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() =>
              onDecrease(item.barcode)
            }
          >
            <Text style={styles.buttonText}>
              −
            </Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={styles.circleButton}
            onPress={() =>
              onIncrease(item.barcode)
            }
          >
            <Text style={styles.buttonText}>
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
    </View>
  );
};

export default ProductItem;

const BACKGROUND = "#dddddd";
const BUTTON = "#d1d1d1"

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: 18,
    marginVertical: 10,

    padding: 16,

    borderRadius: 22,

    backgroundColor: BACKGROUND,

    // iOS
    shadowColor: "#e0e0e0",
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 24,

    // Android
    elevation: 10
  },

  imageContainer: {
    width: 70,
    height: 70,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: BUTTON,

    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 4,

    elevation: 4,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },

  imagePlaceholder: {
    fontSize: 34,
  },

  details: {
    flex: 1,
    marginLeft: 18,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },

  price: {
    marginTop: 6,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },

  barcode: {
    marginTop: 4,
    fontSize: 12,
    color: "#94A3B8",
  },

  rightSection: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 90,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  circleButton: {
    width: 36,
    height: 36,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: BUTTON,

    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: -2,
      height: -2,
    },
    shadowOpacity: 1,
    shadowRadius: 3,

    elevation: 3,
  },

  buttonText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
  },

  quantity: {
    marginHorizontal: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    minWidth: 22,
    textAlign: "center",
  },

  total: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
});