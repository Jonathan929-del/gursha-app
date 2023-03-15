// Imports
import Navbar from './components/Navbar';
import {name as appName} from './app.json';
import {AppRegistry, View} from 'react-native';
import {NativeRouter} from "react-router-native";
import {Provider as PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';





// Theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff8c00',
    secondary: 'yellow',
  },
};





// Main Function
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NativeRouter>
        <View style={{height:'100%'}}>
          <Navbar theme={theme}/>
        </View>
      </NativeRouter>
    </PaperProvider>
  );
};





// App Registry
AppRegistry.registerComponent(appName, () => App);