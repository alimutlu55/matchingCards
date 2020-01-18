import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, ImageBackground, Image, TouchableOpacity, BackHandler, Platform, StatusBar } from 'react-native';
import ScreenItem from '../../components/business/ScreenItem';
import pokemonsCardList from '../../documents/pokemons';
import pokemonsMatchedCardList from '../../documents/matchOfCards';
import Sound from 'react-native-sound';
import PassingScreen from '../PassingScreen'
import TimeOutItem from '../../components/business/TimeOutItem'
import firebase from 'react-native-firebase'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class CardScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stage: 1,
            timer: null,
            counter: 0,
        };
        this.isClickedTwo = 0
        this.isMatch = false
        this.matchControlList = []
        this.matches = 0
        this.loggedCardList = []
        this.cardList = []
        this.isFilled = false
        this.lock = false
        this.startTimer = false;
        this.timerHeight = height / 1.3
        this.gameType = this.props.navigation.state.params.gameType
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        if (this.gameType == "timely") {
            let timer = setInterval(this.meter, 1000);
            this.setState({ timer });
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.backHandler.remove()
    }

    meter = () => {
        this.timerHeight = this.timerHeight - (height / 1.3 / this.time)
        if (this.state.counter > 0) {
            this.setState({
                counter: this.state.counter - 1
            });
        }
    }

    handleBackPress = () => {
        this.endOfStage();
        this.props.navigation.navigate('Home')
        return true;
    }

    isTimeOut() {
        if (this.state.counter == 0) {
            return true;
        }
        else return false;

    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    fillCardList(numberOfCards) {
        var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (var i = 0; i < numberOfCards / 2; i++) {
            var randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
            numbers.splice(numbers.indexOf(randomNumber), 1);
            this.cardList.push(pokemonsCardList[randomNumber]);
            this.cardList.push(pokemonsMatchedCardList[randomNumber]);
            pokemonsCardList[randomNumber].isBack = true
            pokemonsMatchedCardList[randomNumber].isBack = true
        }
        this.shuffle(this.cardList)
        this.isFilled = true
    }

    loggedCard(item) {
        if (item == 'flipLoggedCards') {
            this.loggedCardList[0].isBack = true;
            this.loggedCardList[1].isBack = true;
            this.loggedCardList[0].isLock = false;
            this.loggedCardList[1].isLock = false;
            this.loggedCardList = [];
            this.isClickedTwo = 0;
            this.setState({})
        } else {
            this.loggedCardList.push(item);
        }

    }

    isMatchControl(item) {
        this.matchControlList.push(item);
        if (this.matchControlList.length == 2) {
            if (this.matchControlList[0].id == this.matchControlList[1].id) {
                setTimeout(() => {
                    this.giveSound('correct')
                }, 100);
                this.matchControlList = [];
                this.loggedCardList = [];
                this.matches++;
                return true;
            }
            this.matchControlList = [];
        }
        return false;
    }

    flipCard(item) {
        this.timeLock = true;
        this.giveSound('click')
        if (!item.isLock && this.isClickedTwo < 2) {
            this.isClickedTwo++;
            this.loggedCard(item);
            this.isMatch = this.isMatchControl(item);
            item.isBack = false;
            item.isLock = true;
            this.setState({})
            if (this.isClickedTwo == 2 && this.isMatch == false) {
                setTimeout(() => {
                    this.loggedCard('flipLoggedCards')
                    this.loggedCardList = [];
                }, 500);
            } else if (this.isMatch == true) {
                this.isClickedTwo = 0;
            }
        }
    }
    giveSound(getType) {
        var voicePath = getType + '_' + 'voice.mp3';
        var sound = new Sound(voicePath, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            this.playSound(sound);
        });
    }

    playSound(sound) {
        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
                sound.release();
            } else {
                console.log('playback failed due to audio decoding errors');
                sound.release();
            }
        });
    }

    endOfStage() {
        this.cardList.forEach(function (element) {
            element.isBack = true
            element.isLock = false
        });
        this.matches = 0
        //setTimeout(() => {
        this.isFilled = false
        this.cardList = []
        this.loggedCardList = []
        this.matchControlList = []
        this.state.counter = 0
        this.lock = false
        this.isClickedTwo = 0
        //   }, 100);
    }

    loadControls(stage) {
        if (stage == 1) cardListSize = 4, maxMatchOfStage = 2, this.cardListWidth = 2.4, this.state.counter = 15, this.time = 15;
        if (stage == 2) cardListSize = 6, maxMatchOfStage = 3, this.cardListWidth = 1.6, this.state.counter = 20, this.time = 20;
        if (stage == 3) cardListSize = 8, maxMatchOfStage = 4, this.cardListWidth = 1.4, this.state.counter = 30, this.time = 30;
        if (stage == 4) cardListSize = 10, maxMatchOfStage = 5, this.cardListWidth = 1.3, this.state.counter = 40, this.time = 40;;
        if (stage == 5) cardListSize = 12, maxMatchOfStage = 6, this.cardListWidth = 1.3, this.state.counter = 50, this.time = 50;;
        if (stage == 6) cardListSize = 16, maxMatchOfStage = 8, this.cardListWidth = 1.5, this.state.counter = 60, this.time = 60;
        if (stage == 7) cardListSize = 20, maxMatchOfStage = 10, this.cardListWidth = 1.4, this.state.counter = 90, this.time = 90;
        if (stage == 8) cardListSize = 28, maxMatchOfStage = 14, this.cardListWidth = 1.2, this.state.counter = 120, this.time = 120;
        this.timerHeight = height / 1.3
        this.lock = true;
    }
    changeStage(stage) {
        this.setState({ stage: stage + 1 })
    }

    changeScreen(value) {
        if (value == 'Finish') {
            this.endOfStage()
            this.props.navigation.navigate('EndOfGame')
        }
        if (value == 'Home') {
            this.endOfStage()
            this.props.navigation.navigate('Home')
        }

    }

    loadStage(stage) {
        if (!this.lock) {        //SetSTATE yaptıgında sürekli kartları yenilemesin diye bölümlere lock koydum.
            this.loadControls(stage);
        }
        if (!this.isFilled) {    // CARDLİST DOLU MU KONTROL YAPAR BOŞ İSE DOLDURUR.
            this.fillCardList(cardListSize);
        }
        if (this.matches < maxMatchOfStage) { // Eşleşme durumunun kontrolünü yapar.
            if (this.gameType == "timely") {              // Süreli süresiz kontrolü yapar.
                if (!this.isTimeOut()) {      // Süreli ise zaman kontrolü yapar.
                    return (
                        <View>
                            <StatusBar hidden={true} />
                            <ImageBackground
                                source={require("../../images/wallpaper/imgPlayGame.jpg")}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <View style={{ width: 60, height: 45, padding: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.changeScreen('Home')}
                                    >
                                        <Image style={{ width: 60, height: 40 }} source={require("../../images/icons/icnHomePage.png")} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: height * 77 / 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width }}>
                                    <View style={{ width: width / this.cardListWidth, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {this.cardList.map((item) => {
                                            return (
                                                <ScreenItem style={stage - 1} card={item} onClick={() => this.flipCard(item)} />
                                            )
                                        })}
                                    </View>
                                    <View style={{ backgroundColor: 'red', borderWidth: 1, borderRadius: 10, marginBottom: 25, width: 18, height: height / 1.3, justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <View style={{ borderRadius: 10, backgroundColor: 'green', width: 18, height: this.timerHeight, alignItems: 'flex-start' }} />
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    )
                } else {
                    this.endOfStage();
                    return (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <TimeOutItem onClick={() => this.setState({})} />
                        </View>
                    )
                }

            } else {
                return (
                    <View>
                        <StatusBar hidden={true} />
                        <ImageBackground
                            source={require("../../images/wallpaper/imgPlayGame.jpg")}
                            style={{ width: '100%', height: '100%', flex: 1 }}
                        >
                            <View style={{ width: 60, height: 45, padding: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.changeScreen('Home')}
                                >
                                    <Image style={{ width: 60, height: 40 }} source={require("../../images/icons/icnHomePage.png")} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: height * 77 / 100, alignItems: 'center', justifyContent: 'center', width: width }}>
                                <View style={{ width: width / this.cardListWidth, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {this.cardList.map((item) => {
                                        return (
                                            <ScreenItem style={stage - 1} card={item} onClick={() => this.flipCard(item)} />
                                        )
                                    })}
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                )
            }
        } else {
            if (stage == 8) {
                this.changeScreen('Finish');
            } else {
                this.endOfStage();
                return (
                    <PassingScreen gameType={this.gameType} currentStage={stage} onClick={() => this.changeStage(stage)} />
                )
            }
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.loadStage(this.state.stage)}
            </SafeAreaView>
        );
    }
}
