import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    BackHandler,
    StatusBar,
    Dimensions,
    AsyncStorage,
    Animated,
    Easing
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Dialog, { DialogContent } from 'react-native-popup-dialog';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            count: 0
        }
        this.turnValue = new Animated.Value(0);
        this.cardType = 'deste1'
    }

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

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('cardType');
            if (value !== null) {
                this.cardType = value
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    UNSAFE_componentWillMount() {
        StatusBar.setHidden(true);
    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener.remove();
    }

    componentDidMount() {
        this._turn()
        SplashScreen.hide();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        //Here is the Trick
        const { navigation } = this.props;             //ÖNEMLİİİİİ
        //Adding an event listner om focus
        //So whenever the screen will have focus it will set the state to zero
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ count: 0 });
        });
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Home')
        return true;
    }

    changeScreen(gameType) {
        if (gameType == "timely") {
            this.props.navigation.navigate('HardShip', { gameType: "timely", cardType: this.cardType });
        } else if (gameType == "timeless") {
            this.props.navigation.navigate('Card', { gameType: "timeless", cardType: this.cardType });
        }
        else if (gameType == "competition") {
            this.props.navigation.navigate('PreCompetition', { gameType: "timeless", cardType: this.cardType });
        }
        else if (gameType == "new") {
            this.props.navigation.navigate('CardSelect');
        }
        else if (gameType == "hardShip") {
            this.props.navigation.navigate('HardShip');
        }
    }

    render() {
        const turn = this.turnValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg']
        })
        const opacity = this.turnValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        })
        this._retrieveData()
        return (
            <View>
                <ImageBackground
                    source={require("../../images/wallpaper/gameScreen.png")}
                    style={{ width: width, height: height }}>
                    <View>
                        <Dialog
                            visible={this.state.visible}
                            onTouchOutside={() => {
                                this.setState({ visible: false });
                            }}
                        >
                            <DialogContent style={{ width: 200, height: 140, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#d7dbdd' }}>
                                <View>
                                    <Image style={{ marginTop: 20, width: 60, height: 60, borderRadius: 10 }} source={require("../../images/deste1/balık1.png")} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'lucida grande', fontWeight: 'bold', color: '#460404' }}>Hello :) Press CARDS and select true deck to find me.</Text>
                                </View>
                            </DialogContent>
                        </Dialog>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ visible: true })}>
                            <Animated.Image
                                style={{
                                    opacity: opacity,
                                    width: 60,
                                    height: 60,
                                    margin: 20,
                                    transform: [{ rotate: turn }]
                                }}
                                source={require('../../images/deste1/balık1.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                        <View style={{ paddingHorizontal: 10, marginBottom: 5 }}>
                            <TouchableOpacity onPress={() => this.changeScreen("timeless")}>
                                <Image style={{ width: 155, height: 50 }} source={require("../../images/buttons/btnTimeless.png")} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 10, marginBottom: 5 }}>
                            <TouchableOpacity onPress={() => this.changeScreen("competition")}>
                                <Image style={{ width: 155, height: 50 }} source={require("../../images/buttons/btnChallange.png")} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 10, marginBottom: 5 }}>
                            <TouchableOpacity onPress={() => this.changeScreen("timely")}>
                                <Image style={{ width: 150, height: 50 }} source={require("../../images/buttons/btnTimely.png")} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 10, marginBottom: 5 }}>
                            <TouchableOpacity onPress={() => this.changeScreen("new")}>
                                <Image style={{ width: 70, height: 60 }} source={require("../../images/buttons/cards.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View >

        )
    }
}
