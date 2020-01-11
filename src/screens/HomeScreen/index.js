import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, BackHandler, StatusBar, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    componentDidMount() {
        SplashScreen.hide();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Home')
        return true;
    }

    changeScreen(gameType) {
        if (gameType == "timely") {
            this.props.navigation.navigate('Card', { gameType: "timely" });
        } else if (gameType == "timeless") {
            this.props.navigation.navigate('Card', { gameType: "timeless" });
        }
        else if (gameType == "competition") {
            this.props.navigation.navigate('PreCompetition', { gameType: "timeless" });
        }

    }

    render() {
        return (
            <View>
                <StatusBar hidden={true} />
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
                    </View>
                </ImageBackground>
            </View>

        )
    }
}
