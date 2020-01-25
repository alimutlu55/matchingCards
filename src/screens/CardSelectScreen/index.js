import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, AsyncStorage, TouchableOpacity, Image, ImageBackground, Animated, Easing } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.turnValue = new Animated.Value(0);
    }

    componentDidMount() {
        this._turn()
    }
    _changeScreen() {
        this.props.navigation.navigate('Home')
    }

    _storeData = async (value) => {
        try {
            await AsyncStorage.setItem('cardType', value);
            this._changeScreen()
        } catch (error) {
            // Error saving data
        }
    };
    _turn() {
        this.turnValue.setValue(0)
        Animated.timing(
            this.turnValue,
            {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear
            }
        ).start(() => this._turn())
    }

    render() {
        const turn = this.turnValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg']
        })
        const turnRevers = this.turnValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View >
                <ImageBackground
                    source={require("../../images/wallpaper/imgPlayGame.jpg")}
                    style={{ width: width, height: height }}>
                    <View style={{ width: 60, height: 45, padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Image style={{ width: 60, height: 40 }} source={require("../../images/icons/icnHomePage.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginBottom: 10 }}>
                            <Image style={{ width: 380, height: 100, borderRadius: 10, marginRight: 25 }} source={require("../../images/buttons/txtHeader.png")} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Image style={{ width: 90, height: 40, borderRadius: 10, marginRight: 17 }} source={require("../../images/buttons/txtApple.png")} />
                            </View>
                            <View>
                                <Image style={{ width: 65, height: 40, borderRadius: 10, marginLeft: 17 }} source={require("../../images/buttons/txtSun.png")} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 150 }}>
                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this._storeData('deste1')}>
                                    <Animated.Image
                                        style={{
                                            width: 74,
                                            height: 74,
                                            borderRadius: 10,
                                            marginRight: 10,
                                            transform: [{ rotate: turn }]
                                        }}
                                        source={require('../../images/cardbackImage/cardback1.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this._storeData('deste2')}>
                                    <Animated.Image
                                        style={{
                                            width: 74,
                                            height: 74,
                                            borderRadius: 10,
                                            marginLeft: 15,
                                            transform: [{ rotate: turnRevers }]
                                        }}
                                        source={require('../../images/cardbackImage/cardback.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default index;

const styles = StyleSheet.create({

});
