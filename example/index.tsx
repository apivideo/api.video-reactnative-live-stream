import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import Navigation from './navigation';

AppRegistry.registerComponent(appName, () => Navigation);
