import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar, Dimensions, Image, TouchableOpacity } from 'react-native';

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
            <View>
                <StatusBar hidden={true} />
                <ImageBackground
                    source={require("../../images/wallpaper/gameFinishImage.jpg")}
                    style={{ width: width, height: height, flexDirection: 'column' }}>
                    <View style={{ padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Image style={{ width: 36, height: 36 }} source={require("../../images/icons/icnHomeEOG.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width: 190, height: 60 }}
                            source={require("../../images/icons/txtEndOfTheGame.png")}
                        />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
