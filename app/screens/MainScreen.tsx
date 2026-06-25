import { View } from 'react-native';
import ProductsList from '../components/ProductsList';
import CodeScannerComponent from '../components/CodeScanner';

function MainScreen() {

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#f4f4f4',
            }}
        >
            <CodeScannerComponent />
            <ProductsList />
        </View>
    );
}

export default MainScreen;