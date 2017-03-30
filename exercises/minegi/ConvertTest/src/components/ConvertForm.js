import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
    Header,
    Card,
    CardSection,
    Input,
    Button
} from './common';

import * as MapConverter from '../MapConverter';

class ConvertForm extends Component {
    state = {
        // default values
        //lat: '37.508114',
        //lon: '127.106156',
        lat: '',
        lon: '',
        x: '0',
        y: '0'
    }

    onButtonPress() {
        const { x, y } = MapConverter.convertToPosition(this.state.lon, this.state.lat);
        if (x && y) {
            this.setState({ x: x, y: y });
        }
    }

    renderX() {
        if (this.state.x) {
            return (
                <Text style={styles.resultTextStyle}>
                    X = {this.state.x}
                </Text>
            );
        }
    }

    renderY() {
        if (this.state.y) {
            return (
                <Text style={styles.resultTextStyle}>
                    Y = {this.state.y}
                </Text>
            );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="ConvertTest" />
                <Card>
                    <CardSection>
                        <Input
                            label="Latitude"
                            placeholder="ex: 37.508114"
                            onChangeText={lat => this.setState({ lat })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Longitude"
                            placeholder="ex: 127.106156"
                            onChangeText={lon => this.setState({ lon })}
                        />
                    </CardSection>
                        
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Convert
                        </Button>
                    </CardSection>
                    <View>
                        <Text style={styles.resultTextStyle}>
                            X = {this.state.x}, Y = {this.state.y}
                        </Text>
                    </View>
                </Card>
            </View>
        );
    }
}

const styles = {
    resultTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        position: 'relative'
    }
}

export default ConvertForm;
