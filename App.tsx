import React, {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/services/store';
import {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, useFonts} from "@expo-google-fonts/poppins";
import Navigation from './src/navigations';

export default function App() {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });
    useEffect(() => {
        if (fontsLoaded) {

        }
    }, [fontsLoaded]);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigation />
                <StatusBar />
            </PersistGate>
        </Provider>
    );
}
