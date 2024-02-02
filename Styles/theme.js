import { ThemeProvider, createTheme } from '@rneui/themed';
import { lightColors } from './Colors';

const theme_ = {
    headerStyle_backgroundColor: '#130f40',
    headerTintColor: '#fff',
    activeBackgroundColor: '#30336b',
    inactiveBackgroundColor: '#130f40',
    activeTintColor: '#ffffff',
    inactiveTintColor: '#57606f',

    backgroundColor : "#000",
    textColor : "#fff",
    titleColor : "#d1d8e0",
    
}
const theme__ = createTheme({
  // Use only one color scheme
  colors: lightColors,
  // And set that mode as default
  mode: 'dark',

});

const theme = createTheme({
    // Use only one color scheme
    colors: theme__.darkColors,
    // And set that mode as default
    mode: 'dark',

  });

  
export default theme;