import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, Image, TouchableOpacity, BackHandler, StatusBar, AsyncStorage, Animated } from 'react-native';
import hardShip from '../../documents/hardShip';
import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.springValue = new Animated.Value(0.3)
        this.index = 1
        this.cardType = 'deste1'
        this.cardType = this.props.navigation.state.params.cardType
        this.gameType = this.props.navigation.state.params.gameType
    }

    _springPlay() {
        this.springValue.setValue(0.3)
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 1
            }
        ).start()
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
    handleBackPress = () => {
        this.props.navigation.navigate('Home')
        return true;
    }

    UNSAFE_componentWillMount() {
        StatusBar.setHidden(true);
    }


    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this._springPlay()
        //Here is the Trick
        const { navigation } = this.props;             //ÖNEMLİİİİİ
        //Adding an event listner om focus
        //So whenever the screen will have focus it will set the state to zero
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ count: 0 });
        });
    }

    _changeScreen(value) {
        if (value == 'Easy') {
            this.props.navigation.navigate('Card', {
                gameType: "timely",
                cardType: this.cardType,
                stageOneTime: 15,
                stageTwoTime: 20,
                stageThreeTime: 30,
                stageFourTime: 40,
                stageFiveTime: 50,
                stageSixTime: 60,
                stageSevenTime: 90,
                stageEightTime: 120
            })
        }
        if (value == 'Medium') {
            this.props.navigation.navigate('Card', {
                gameType: "timely",
                cardType: this.cardType,
                stageOneTime: 6,
                stageTwoTime: 12,
                stageThreeTime: 18,
                stageFourTime: 24,
                stageFiveTime: 38,
                stageSixTime: 42,
                stageSevenTime: 78,
                stageEightTime: 106
            })
        }
        if (value == 'Hard') {
            this.props.navigation.navigate('Card', {
                gameType: "timely",
                cardType: this.cardType,
                stageOneTime: 5,
                stageTwoTime: 9,
                stageThreeTime: 12,
                stageFourTime: 18,
                stageFiveTime: 24,
                stageSixTime: 36,
                stageSevenTime: 58,
                stageEightTime: 68
            })
        }

    }

    render() {
        const Banner = firebase.admob.Banner;
        const AdRequest = firebase.admob.AdRequest;
        const request = new AdRequest();
        const unitId = 'ca-app-pub-8367276121301574/2138547137';
        this._retrieveData()
        return (
            <View>
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
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {hardShip.map((item) => {
                            return (
                                <TouchableOpacity
                                    style={{ marginLeft: 25 }}
                                    onPress={() => this._changeScreen(item.id)}>
                                    <Animated.Image
                                        style={{ width: 130, height: 45 , transform: [{ scale: this.springValue }] }}
                                        source={item.image} />
                                </TouchableOpacity>
                            )
                        })}

                    </View>
                    <Banner
                        unitId={unitId}
                        size={"SMART_BANNER"}
                        request={request.build()}

                    />
                </ImageBackground>
            </View >
        );
    }
}

export default index;
