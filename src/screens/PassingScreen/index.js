import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform, StatusBar } from 'react-native';
import firebase from 'react-native-firebase';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

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
        if (this.props.gameType != 'timely') {
            if (this.props.currentStage == '4' || this.props.currentStage == '6' || this.props.currentStage == '8') {
                this.showThirdInterstitial();
            }
        }
        const Banner = firebase.admob.Banner;
        const AdRequest = firebase.admob.AdRequest;
        const request = new AdRequest();
        const unitId = 'ca-app-pub-8367276121301574/2138547137';
        return (
            <View>
                <StatusBar hidden={true} />
                <ImageBackground
                    source={require("../../images/wallpaper/imgPlayGame.jpg")}
                    style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={this.props.onClick}
                        >
                            <Image style={{ width: 150, height: 110 }}
                                source={require("../../images/icons/txtPassingScreen.png")} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground >
            </View>
        );
    }
}
