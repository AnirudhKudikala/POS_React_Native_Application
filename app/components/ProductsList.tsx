import { useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ProductItem from './ProductItem';
import { useCartStore } from '../store/cartStore';

const ProductsList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const {cart, totalAmount} = useCartStore();

    const sendEmail = () => {
        console.log('Send receipt to:', email);

        setIsModalVisible(false);
        setEmail('');
    };
    return (
        <View style={{ flex: 0.6, backgroundColor: 'white' }}>
            <FlatList
                data={cart}
                keyExtractor={item => item.barcode}
                renderItem={({ item }) => (
                    <ProductItem item={item}/>
                )}
            />
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: ₹{totalAmount}</Text>
                <TouchableOpacity
                    disabled={cart.length === 0}
                    activeOpacity={cart.length === 0 ? 0.5 : 1}
                    style={[
                        styles.sendModalButton,
                        cart.length === 0 && styles.sendModalButtonDisabled,
                    ]} 
                    onPress={() => setIsModalVisible(true)}
                >
                    <Text style={styles.sendButtonText}>Send Email</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={isModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Send Receipt</Text>

                        <TextInput
                            placeholder="Enter customer email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setEmail('');
                                    setIsModalVisible(false);
                                }}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.sendModalButton}
                                onPress={sendEmail}
                            >
                                <Text style={styles.sendText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        backgroundColor: '#FFF'
    },

    totalText: {
        fontSize: 22,
        fontWeight: 'bold'
        //   textAlign: "right",
    },
    sendButton: {
        backgroundColor: '#1E40AF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10
    },

    sendButtonText: {
        color: 'white',
        fontWeight: '600'
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)'
    },

    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20
    },

    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 50
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 24
    },

    cancelButton: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },

    cancelText: {
        fontSize: 16
    },

    sendModalButton: {
        marginLeft: 12,
        backgroundColor: '#1E40AF',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },

    sendModalButtonDisabled: {
        opacity: 0.5,
    },

    sendText: {
        color: 'white',
        fontWeight: '600'
    }
});

export default ProductsList;
