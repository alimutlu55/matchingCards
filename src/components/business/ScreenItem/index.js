import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class ScreenItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    isBackControl() {
        if (this.props.card.isBack == false) {
            return this.props.card.frontSide
        } else {
            return this.props.card.backSide
        }
    }

    render() {
        return (
            <TouchableOpacity touchSoundDisabled  onPress={this.props.onClick} >
                <View style={{ padding: 10 }}>
                    <Image
                        style={styles[this.props.style]}
                        source={this.isBackControl()}
                    />

                </View>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create([
    {
        height: height / 6,
        width: width / 10,
        marginHorizontal:10,
        borderRadius:10   
    },
    {
        height: height / 6,
        width: width / 10,
        marginHorizontal:20,
        borderRadius:10     
    },
    {
        height: height / 6,
        width: width / 10,
        marginHorizontal:10,
        borderRadius:10     
    },
    {
        height: height / 6,
        width: width / 10,
        marginHorizontal:4,
        borderRadius:10     

    },
    {
        height: height / 6,
        width: width / 10, 
        marginHorizontal:10,
        borderRadius:10     
    },
    {
        height: height / 7,
        width: width / 11,
        marginHorizontal:10,
        borderRadius:10      
    },
    {
        height: height / 7,
        width: width / 11,
        marginHorizontal:2,
        borderRadius:10      
    },
    {
        height: height / 8,
        width: width / 12,
        borderRadius:10  
        //marginHorizontal:10    
    },
    {
        height: height / 2,
        width: width / 12,
        borderRadius:10  
        //marginHorizontal:10    
    }
])