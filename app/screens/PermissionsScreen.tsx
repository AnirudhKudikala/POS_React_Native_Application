import { useEffect } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCameraPermission } from "react-native-vision-camera";
import { useNavigation } from "@react-navigation/native";
import { PermissionsScreenNavigationProp } from "../utils/types";

const PermissionsScreen = () => {
  const navigation = useNavigation<PermissionsScreenNavigationProp>();

  const {
    hasPermission,
    canRequestPermission,
    requestPermission,
  } = useCameraPermission();

  useEffect(() => {
    if (hasPermission) {
      navigation.replace("MainScreen");
    }
  }, [hasPermission, navigation]);

  const onContinue = async () => {
    const granted = await requestPermission();

    if (granted) {
      navigation.replace("MainScreen");
    }
  };

  const permissionDenied =
    !hasPermission && !canRequestPermission;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📷</Text>

      <Text style={styles.title}>
        Camera Permission
      </Text>

      {permissionDenied ? (
        <>
          <Text style={styles.message}>
            Camera permission has been denied.

            {"\n\n"}

            Please enable Camera permission from your device
            Settings to continue using the application.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={Linking.openSettings}
          >
            <Text style={styles.buttonText}>
              Open Settings
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.message}>
            This application uses your camera to scan
            product barcodes.

            {"\n\n"}

            No photos or videos are stored.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onContinue}
          >
            <Text style={styles.buttonText}>
              Continue
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EEF3",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  icon: {
    fontSize: 72,
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
  },

  message: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 28,
    textAlign: "center",
    color: "#475569",
  },

  button: {
    marginTop: 40,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 18,
    backgroundColor: "#E8EEF3",

    shadowColor: "#D9D9D9",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 18,

    elevation: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563EB",
  },
});