import {StackNavigator} from 'react-navigation';
import MainScreen from './MainScreen';
import StoreScreen from './StoreScreen';
import CameraScreen from './CameraScreen';
import BarcodeScreen from './BarcodeScreen';

const App = StackNavigator({
    Main: {screen: MainScreen},
    Stores: {screen: StoreScreen},
    CameraScreen: {screen: CameraScreen},
    BarcodeScreen: {screen: BarcodeScreen},
});

export default App;
