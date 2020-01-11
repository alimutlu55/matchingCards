import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Dimensions, Platform, StatusBar } from 'react-native';
import firebase from 'react-native-firebase';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.result = this.props.navigation.state.params.result
    }

    componentDidMount() {

    }
    changeScreen(action) {
        if (action == 'playGame') {
            this.props.navigation.navigate('PreCompetition');
        }
    }

    render() {

        const Banner = firebase.admob.Banner;
        const AdRequest = firebase.admob.AdRequest;
        const request = new AdRequest();
        const unitId = 'ca-app-pub-8367276121301574/2138547137';

        if (this.result == 'Scoreless') {
            return (
                <View>
                    <StatusBar hidden={true} />
                    <ImageBackground
                        source={require("../../images/wallpaper/imgWin.png")}
                        style={{ width: width, height: height }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ width: 60, height: 45, padding: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Home')}
                                >
                                    <Image style={{ width: 60, height: 40 }} source={require("../../images/icons/icnHomePage.png")} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: height * 80 / 100, justifyContent: 'center', alignContent: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View>
                                        <TouchableOpacity onPress={() => this.changeScreen('playGame')}>
                                            <Image
                                                style={{ width: 120, height: 60 }}
                                                source={require("../../images/icons/txtScoreless.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}>
                            <Banner
                                unitId={unitId}
                                size={'SMART_BANNER'}
                                request={request.build()}
                            />
                        </View>
                    </ImageBackground>
                </View>
            );
        } else {
            return (
                <View>
                    <StatusBar hidden={true} />
                    <ImageBackground
                        source={require("../../images/wallpaper/imgWin.png")}
                        style={{ width: width, height: height }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ width: 60, height: 45, padding: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Home')}
                                >
                                    <Image style={{ width: 60, height: 40 }} source={require("../../images/icons/icnHomePage.png")} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: height * 80 / 100, justifyContent: 'center', alignContent: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View>
                                        <Image source={this.result.character.image} />
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => this.changeScreen('playGame')}>
                                            <Image
                                                style={{ width: 120, height: 60 }}
                                                source={require("../../images/icons/txtPlayAgain.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}>
                            <Banner
                                unitId={unitId}
                                size={'SMART_BANNER'}
                                request={request.build()}
                            />
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }
}
