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
            this.showThirdInterstitial();
    }
    changeScreen(action) {
        if (action == 'playGame') {
            this.props.navigation.navigate('PreCompetition');
        }
    }

    showThirdInterstitial = () => {
        const unitInterstitialID = 'ca-app-pub-8367276121301574/6529218283'
        const advert = firebase.admob().interstitial(unitInterstitialID);
        const AdRequest = firebase.admob.AdRequest;
        const request = new AdRequest();
        advert.loadAd(request.build());
        advert.on('onAdLoaded', () => {
            advert.show();
        });
    };

    render() {

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
                    </ImageBackground>
                </View>
            );
        }
    }
}
