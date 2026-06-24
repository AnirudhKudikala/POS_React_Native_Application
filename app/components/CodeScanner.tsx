import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { CodeScanner } from "react-native-vision-camera-barcode-scanner";
import { products } from '../utils/products';
import { Product } from '../utils/types';

interface Props {
    onProductScanned: (
      product: Product
    ) => void;
}

const CodeScannerComponent = ({
    onProductScanned,
  }: Props) => {
    const [isScanning, setIsScanning] = useState(true);
    const cameraPermission = useCameraPermission()
    const device = useCameraDevice("back");

    useEffect(() => {
        cameraPermission.requestPermission()
    }, [])

    if (!device) {
        return (
            <View style={styles.textContainer}>
            <Text>Loading camera...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 0.4 }}>
            <CodeScanner
                style={{ flex: 1 }}
                isActive={true}
                barcodeFormats={['all-formats']}
                onBarcodeScanned={(barcodes) => {
                    if (!isScanning) {
                        return;
                    }
                
                    if (barcodes.length > 0) {
                        console.error("Scanned:", barcodes[0].rawValue);
                        const scannedProductRawvalue = barcodes[0].rawValue
                        if (!scannedProductRawvalue) {
                            return;
                        }
                        const product = products.find(
                            item => item.barcode === scannedProductRawvalue
                        );
                          
                        if (product) {
                            onProductScanned(product);
                            console.log(product);
                            setIsScanning(false)
                        }
                    }
                }}        
                onError={(error) => {
                    console.error("Camera Error:", error);
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

export default CodeScannerComponent