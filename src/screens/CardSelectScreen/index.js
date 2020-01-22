import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, AsyncStorage, TouchableOpacity, Image, ImageBackground } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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

    render() {
        return (
            <View >
                <ImageBackground
                    source={require("../../images/wallpaper/imgPlayGame.jpg")}
                    style={{ width: width, height: height }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginBottom: 10 }}>
                            <Image style={{ width: 380, height: 100, borderRadius: 10, marginRight: 17 }} source={require("../../images/buttons/txtHeader.png")} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Image style={{ width: 90, height: 40, borderRadius: 10, marginRight: 17 }} source={require("../../images/buttons/txtApple.png")} />
                            </View>
                            <View>
                                <Image style={{ width: 65, height: 40, borderRadius: 10, marginLeft: 17 }} source={require("../../images/buttons/txtSun.png")} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 100 }}>
                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this._storeData('deste1')}>
                                    <Image style={{ width: 90, height: 90, borderRadius: 10 }} source={require("../../images/cardbackImage/cardback1.png")} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this._storeData('deste2')}>
                                    <Image style={{ width: 90, height: 90, borderRadius: 10 }} source={require("../../images/cardbackImage/cardback.png")} />
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
