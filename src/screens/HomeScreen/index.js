import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, BackHandler, StatusBar, Dimensions, AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count:0
        }
        this.cardType = 'deste1'
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
            this.props.navigation.navigate('Card', { gameType: "timely", cardType: this.cardType });
        } else if (gameType == "timeless") {
            this.props.navigation.navigate('Card', { gameType: "timeless", cardType: this.cardType });
        }
        else if (gameType == "competition") {
            this.props.navigation.navigate('PreCompetition', { gameType: "timeless",cardType: this.cardType  });
        }
        else if (gameType == "new") {
            this.props.navigation.navigate('CardSelect');
        }
    }

    render() {
        this._retrieveData()
        return (
            <View>
                <ImageBackground
                    source={require("../../images/wallpaper/gameScreen.png")}
                    style={{ width: width, height: height }}>
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
            </View>

        )
    }
}
