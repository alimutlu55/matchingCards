import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ImageBackground, Platform, StatusBar } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import characterList from '../../documents/characters';
import hardShip from '../../documents/hardShip';
import { SafeAreaView } from 'react-navigation';
import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: {},
            player2: {},
            visible: false,
            hardship: hardShip[1]
        };

        this.isPlayer1Selected = false
        this.isPlayer2Selected = false
        this.selectedPlayer = 'Player1'
        this.isFirstSelect = true
        this.index = 1;
    }

    componentDidMount() {
        setTimeout(() => {
            this.showThirdInterstitial();
        }, 7000)
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
    selectChracter(item) {
        if (this.selectedPlayer == 'Player1') {
            this.isPlayer1Selected = true;
            this.setState({ player1: item })
            if (this.isFirstSelect) {
                this.selectedPlayer = 'Player2'
                this.isFirstSelect = false;
            }
        } else {
            this.isPlayer2Selected = true;
            this.setState({ player2: item })
        }

    }

    changeHardship(value) {
        if (value == "next") {
            if (this.index < 2) {
                this.index++;
                this.setState({ hardship: hardShip[this.index] })
            }
        } else if (value == "previous") {
            if (this.index > 0) {
                this.index--;
                this.setState({ hardship: hardShip[this.index] })
            }
        }
    }

    startGameControls() {
        if (this.isPlayer1Selected) {
            if (this.isPlayer2Selected) {
                return true;
            }
        } else return false;
    }

    changeScreen() {
        if (this.startGameControls()) {
            this.props.navigation.navigate('Competition', { player1: this.state.player1, player2: this.state.player2, difficulty: this.state.hardship.id });
            this.endOfPage();
        } else {
            this.setState({ visible: true })
        }

    }

    endOfPage() {
        this.selectedPlayer = 'Player1'
        this.isFirstSelect = true
    }
    render() {
        const Banner = firebase.admob.Banner;
        const AdRequest = firebase.admob.AdRequest;
        const request = new AdRequest();
        const unitId = 'ca-app-pub-8367276121301574/2138547137';
        return (
            <View>
                <StatusBar hidden={true} />
                <ImageBackground
                    source={require("../../images/wallpaper/imgPlayGame.jpg")}
                    style={{ width: '100%', height: '100%' }}
                >
                    <View>
                        <Dialog
                            visible={this.state.visible}
                            onTouchOutside={() => {
                                this.setState({ visible: false });
                            }}
                        >
                            <DialogContent style={{ width: 245, height: 120, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#d7dbdd' }}>
                                <View>
                                    <Image style={{ marginTop: 20, width: 60, height: 60 }} source={require("../../images/pokeball/pokeball.png")} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'lucida grande', fontWeight: 'bold', color: '#460404' }}>LÜTFEN KARAKTER SEÇİNİZ...</Text>
                                </View>
                            </DialogContent>
                        </Dialog>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View style={{ width: 60, height: 45, padding: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Home')}
                            >
                                <Image style={{ width: 60, height: 40 }} source={require("../../images/icons/icnHomePage.png")} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: height * 25 / 100, justifyContent: 'flex-start', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ marginHorizontal: 80 }}>
                                    <TouchableOpacity
                                        style={{ borderColor: '#003a29', borderWidth: 1, height: 64, width: 64 }}
                                        onPress={() => this.selectedPlayer = 'Player1'}
                                    >
                                        <Image source={this.state.player1.image} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14, fontFamily: 'lucida grande', fontWeight: 'bold', color: '#460404' }}>
                                        {this.state.player1.id}
                                    </Text>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() => this.changeHardship("previous")}
                                        >
                                            <Image source={require("../../images/hardship/imgLeft.png")} />
                                        </TouchableOpacity>
                                        <Image style={{ height: 25, width: 90 }} source={this.state.hardship.image} />
                                        <TouchableOpacity
                                            onPress={() => this.changeHardship("next")}
                                        >
                                            <Image source={require("../../images/hardship/imgRight.png")} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => this.changeScreen()}>
                                        <Image style={{ width: 150, height: 50, marginTop: 3 }} source={require("../../images/buttons/btnStart.png")} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginHorizontal: 80 }}>
                                    <TouchableOpacity
                                        style={{ borderColor: '#003a29', borderWidth: 1, height: 64, width: 64 }}
                                        onPress={() => this.selectedPlayer = 'Player2'}
                                    >
                                        <Image source={this.state.player2.image} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14, fontFamily: 'lucida grande', fontWeight: 'bold', color: '#460404' }}>
                                        {this.state.player2.id}
                                    </Text>
                                </View>
                            </View>
                            <SafeAreaView style={{ width: width / 1, height: height / 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {characterList.map((item) => {
                                    return (
                                        <TouchableOpacity
                                            style={{ borderColor: '#003a29', borderWidth: 1, margin: 10, width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}
                                            onPress={() => this.selectChracter(item)}>
                                            <Image source={item.image} />
                                        </TouchableOpacity>
                                    )
                                })}
                            </SafeAreaView>
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
