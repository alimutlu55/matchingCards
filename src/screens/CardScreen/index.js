import React, { Component } from 'react';
import { View, SafeAreaView, Dimensions, ImageBackground, Image, AsyncStorage, TouchableOpacity, BackHandler, Platform, StatusBar } from 'react-native';
import ScreenItem from '../../components/business/ScreenItem';
import pokemonsCardList from '../../documents/pokemons';
import pokemonsMatchedCardList from '../../documents/matchOfCards';
import deste1CardList from '../../documents/deste1';
import deste1MatchedCardList from '../../documents/matchOfCardsD1';
import Sound from 'react-native-sound';
import PassingScreen from '../PassingScreen'
import TimeOutItem from '../../components/business/TimeOutItem'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class CardScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stage: 1,
            timer: null,
            counter: 0
        };
        this.isClickedTwo = 0
        this.isMatch = false
        this.matchControlList = []
        this.cardListSize = 0
        this.maxMatchOfStage = 0
        this.matches = 0
        this.loggedCardList = []
        this.cardList = []
        this.isFilled = false
        this.lock = false
        this.startTimer = false;
        this.timerHeight = height / 1.3
        this.cardType = this.props.navigation.state.params.cardType
        this.gameType = this.props.navigation.state.params.gameType
        this.stageOneTime = this.props.navigation.state.params.stageOneTime
        this.stageTwoTime = this.props.navigation.state.params.stageTwoTime
        this.stageThreeTime = this.props.navigation.state.params.stageThreeTime
        this.stageFourTime = this.props.navigation.state.params.stageFourTime
        this.stageFiveTime = this.props.navigation.state.params.stageFiveTime
        this.stageSixTime = this.props.navigation.state.params.stageSixTime
        this.stageSevenTime = this.props.navigation.state.params.stageSevenTime
        this.stageEightTime = this.props.navigation.state.params.stageEightTime
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

            if (this.cardType === 'deste1') {
                this.cardList.push(deste1CardList[randomNumber]);
                this.cardList.push(deste1MatchedCardList[randomNumber]);
            } else if (this.cardType === 'deste2') {
                this.cardList.push(pokemonsCardList[randomNumber]);
                this.cardList.push(pokemonsMatchedCardList[randomNumber]);
            }

            if (this.cardType === 'deste1') {
                deste1CardList[randomNumber].isBack = true
                deste1MatchedCardList[randomNumber].isBack = true
            } else if (this.cardType === 'deste2') {
                pokemonsCardList[randomNumber].isBack = true
                pokemonsMatchedCardList[randomNumber].isBack = true
            }
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
        if (stage == 1) this.cardListSize = 4, this.maxMatchOfStage = 2, this.cardListWidth = 2.4, this.state.counter = this.stageOneTime, this.time = this.stageOneTime;
        if (stage == 2) this.cardListSize = 6, this.maxMatchOfStage = 3, this.cardListWidth = 1.6, this.state.counter = this.stageTwoTime, this.time = this.stageTwoTime;
        if (stage == 3) this.cardListSize = 8, this.maxMatchOfStage = 4, this.cardListWidth = 1.4, this.state.counter = this.stageThreeTime, this.time = this.stageThreeTime;
        if (stage == 4) this.cardListSize = 10, this.maxMatchOfStage = 5, this.cardListWidth = 1.3, this.state.counter = this.stageFourTime, this.time = this.stageFourTime;;
        if (stage == 5) this.cardListSize = 12, this.maxMatchOfStage = 6, this.cardListWidth = 1.5, this.state.counter = this.stageFiveTime, this.time = this.stageFiveTime;;
        if (stage == 6) this.cardListSize = 16, this.maxMatchOfStage = 8, this.cardListWidth = 1.5, this.state.counter = this.stageSixTime, this.time = this.stageSixTime;
        if (stage == 7) this.cardListSize = 20, this.maxMatchOfStage = 10, this.cardListWidth = 1.4, this.state.counter = this.stageSevenTime, this.time = this.stageSevenTime;
        if (stage == 8) this.cardListSize = 28, this.maxMatchOfStage = 14, this.cardListWidth = 1.2, this.state.counter = this.stageEightTime, this.time = this.stageEightTime;
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
            this.fillCardList(this.cardListSize);
        }
        if (this.matches < this.maxMatchOfStage) { // Eşleşme durumunun kontrolünü yapar.
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
