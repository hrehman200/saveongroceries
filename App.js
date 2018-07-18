import {StackNavigator} from 'react-navigation';
import MainScreen from './MainScreen';
import StoreScreen from './StoreScreen';

const App = StackNavigator({
    Main: {screen: MainScreen},
    Stores: {screen: StoreScreen}
});

export default App;
