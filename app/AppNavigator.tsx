import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PermissionsScreen from './screens/PermissionsScreen';
import MainScreen from './screens/MainScreen';

const RootStack = createNativeStackNavigator({
    initialRouteName: 'PermissionsScreen',
    screenOptions: {
        headerShown: false
    },
    screens: {
        PermissionsScreen,
        MainScreen
    }
});

const Navigation = createStaticNavigation(RootStack);

export default function AppNavigator() {
    return <Navigation />;
}
