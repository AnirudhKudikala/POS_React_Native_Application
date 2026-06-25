import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    useCameraDevice,
    useCameraPermission
} from 'react-native-vision-camera';
import { CodeScanner } from 'react-native-vision-camera-barcode-scanner';
import { playBeep } from '../utils/audio';
import { useCartStore } from '../store/cartStore';

const CodeScannerComponent = () => {
    const lastBarcodeRef = useRef<string | null>(null);
    const cameraPermission = useCameraPermission();
    const device = useCameraDevice('back');
    const scanBarcode = useCartStore(state => state.scanBarcode);
    const SCAN_LATENCY_MS = 1500;

    useEffect(() => {
        cameraPermission.requestPermission();
    }, []);

    const onBarcodeScanned = async (barcodes: any) => {
        if (barcodes.length === 0) {
            return;
        }

        const barcode = barcodes[0].rawValue;

        if (!barcode) {
            return;
        }

        if (lastBarcodeRef.current === barcode) {
            return;
        }

        lastBarcodeRef.current = barcode;

        console.log('Scanned:', barcode);

        try {
            await scanBarcode(barcode);
            playBeep();
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            if (lastBarcodeRef.current === barcode) {
                lastBarcodeRef.current = null;
            }
        }, SCAN_LATENCY_MS);
    };

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
                // barcodeFormats={['all-formats']}
                barcodeFormats={['ean-13', 'code-128']}
                onBarcodeScanned={onBarcodeScanned}
                onError={error => {
                    console.error('Camera Error:', error);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CodeScannerComponent;
