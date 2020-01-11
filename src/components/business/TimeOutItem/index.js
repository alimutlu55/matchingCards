import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Dimensions, Image, View } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ImageBackground
                style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center' }}
                source={require("../../../images/wallpaper/imgTimeOut.jpg")} >
                <TouchableOpacity onPress={this.props.onClick}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require("../../../images/icons/txtTimeOut.png")}
                            style={{ width: 80, height: 26 }} />
                        <Image
                            source={require("../../../images/buttons/btnTryAgain.png")}
                            style={{ width: 100, height: 30 }} />

                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}
