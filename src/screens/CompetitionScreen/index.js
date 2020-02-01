import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ImageBackground, BackHandler, StatusBar } from 'react-native';
import ScreenItem from '../../components/business/ScreenItem';
import pokemonsCardList from '../../documents/pokemons';
import pokemonsMatchedCardList from '../../documents/matchOfCards';
import deste1CardList from '../../documents/deste1';
import deste1MatchedCardList from '../../documents/matchOfCardsD1';
import Sound from 'react-native-sound';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.isClickedTwo = 0
        this.numberOfCards = 28;
        this.isMatch = false
        this.matchControlList = []
        this.matches = 0
        this.loggedCardList = []
        this.cardList = []
        this.isFilled = false
        this.lock = false
        this.maxMatchOfStage = 14;
        this.player1 = { score: 0, character: {} }
        this.player1.character = this.props.navigation.state.params.player1
        this.player2 = { score: 0, character: {} }
        this.player2.character = this.props.navigation.state.params.player2
        this.currentPlayer = this.player1.character;
        this.difficulty = this.props.navigation.state.params.difficulty
        this.cardType = this.props.navigation.state.params.cardType

    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
         //Here is the Trick
         const { navigation } = this.props;             //ÖNEMLİİİİİ
         //Adding an event listner om focus
         //So whenever the screen will have focus it will set the state to zero
         this.focusListener = navigation.addListener('didFocus', () => {
             this.setState({ count: 0 });
         });
    }
    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        this.endOfStage();
        this.props.navigation.navigate('PreCompetition')
        return true;
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
            } else {
                this.cardList.push(pokemonsCardList[randomNumber]);
                this.cardList.push(pokemonsMatchedCardList[randomNumber]);
            }

            if (this.cardType === 'deste1') {
                deste1CardList[randomNumber].isBack = true
                deste1MatchedCardList[randomNumber].isBack = true
            } else {
                pokemonsCardList[randomNumber].isBack = true
                pokemonsMatchedCardList[randomNumber].isBack = true
            }
        }
        this.shuffle(this.cardList)
        this.isFilled = true
    }

    loggedCard(item) {
        if (item == 'flipLoggedCards') {
            if (this.currentPlayer == this.player2.character) {
                this.currentPlayer = this.player1.character
            } else if (this.currentPlayer == this.player1.character) {
                this.currentPlayer = this.player2.character
            }
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
                if (this.currentPlayer == this.player1.character) {
                    this.player1.score++;
                } else if (this.currentPlayer == this.player2.character) {
                    this.player2.score++;
                }

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
                }, 1000);
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
        setTimeout(() => {
            this.isFilled = false
            this.cardList = []
            this.loggedCardList = []
            this.matchControlList = []
            this.matches = 0
            this.state.counter = 0
            this.lock = false
            this.isClickedTwo = 0
            this.setState();
        }, 1000);
    }

    gameFinishControl() {
        if (this.player1.score + this.player2.score == this.numberOfCards / 2) {
            return true;
        }
        return false;
    }

    getResult() {
        if (this.player1.score > this.player2.score) {
            return this.player1;
        } else if (this.player2.score > this.player1.score) {
            return this.player2;
        } else if (this.player1.score == this.player2.score) {
            return 'Scoreless'
        }
    }



    render() {

        if (!this.isFilled) {
            if (this.difficulty == "Easy") {
                this.gameSizeWidthRate = 1.4
                this.cardSize = 4
                this.gameSizeHeightRate = 1.4
                this.numberOfCards = 12
                this.fillCardList(this.numberOfCards);
            } else if (this.difficulty == "Medium") {
                this.gameSizeWidthRate = 1.2
                this.cardSize = 6
                this.gameSizeHeightRate = 1.4
                this.numberOfCards = 18
                this.fillCardList(this.numberOfCards);
            } else if (this.difficulty == "Hard") {
                this.gameSizeWidthRate = 1.2
                this.cardSize = 7
                this.gameSizeHeightRate = 1.2
                this.numberOfCards = 28
                this.fillCardList(this.numberOfCards);
            }                                                // CARDLİST DOLU MU KONTROL YAPAR BOŞ İSE DOLDURUR.

        }

        if (!this.gameFinishControl()) {
            return (
                <View>
                    <StatusBar hidden={true} />
                    <ImageBackground
                        source={require("../../images/wallpaper/imgPlayGame.jpg")}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <View style={{ height: height * 20 / 100, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>

                                <View style={{ marginVertical: 3, flexDirection: 'row' }}>
                                    <Image style={{ width: 30, height: 30 }} source={this.player1.character.image} />
                                    <Text style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 26, marginHorizontal: 10 }}>{this.player1.score}</Text>
                                </View>

                                <View style={{ width: 42, height: 42, marginVertical: 3, borderColor: 'green', borderWidth: 1, borderRadius: 5 }}>
                                    <Image style={{ width: 40, height: 40 }} source={this.currentPlayer.image} />
                                </View>

                                <View style={{ marginVertical: 3, flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 26, marginHorizontal: 10 }}>{this.player2.score}</Text>
                                    <Image style={{ width: 30, height: 30 }} source={this.player2.character.image} />
                                </View>

                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', height: height * 70 / 100, paddingTop: 10 }}>
                                <View style={{ width: width / this.gameSizeWidthRate, height: height / this.gameSizeHeightRate, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    {this.cardList.map((item) => {
                                        return (
                                            <ScreenItem style={this.cardSize} card={item} onClick={() => this.flipCard(item)} />
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            );


        } else {
            this.endOfStage();
            return (
                <View>
                    {this.props.navigation.navigate('GameFinish', { result: this.getResult() })}
                </View>

            )


        }
    }
}
