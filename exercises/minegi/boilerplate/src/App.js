import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';

const App = () => {
    return (
        <Provider store={createStore(reducers)}>
            <View>
                <Text style={styles.textStyle}>Hello World!</Text>
            </View>
        </Provider>
    );
};

const styles = {
    textStyle: {
        fontSize: 20,
    }
}

export default App;
