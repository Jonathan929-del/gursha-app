// Imports
import Navbar from './components/Navbar';
import {name as appName} from './app.json';
import {AuthProvider} from './context/Auth';
import {NativeRouter} from "react-router-native";
import {AppRegistry, View, StatusBar} from 'react-native';
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

  const SERVER_API = 'https://gursha.onrender.com'

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NativeRouter>
          <StatusBar
            backgroundColor='#000'
            barStyle='light-content'
          />
          <View style={{height:'100%'}}>
            <Navbar theme={theme} SERVER_API={SERVER_API}/>
          </View>
        </NativeRouter>
      </PaperProvider>
    </AuthProvider>
  );
};





// App Registry
AppRegistry.registerComponent(appName, () => App);