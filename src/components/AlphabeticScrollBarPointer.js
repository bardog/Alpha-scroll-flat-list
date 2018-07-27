import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

class AlphabeticScrollBarPointer extends Component {
    render() {
        return (
            <View
                style={{
                    ...styles.container,
                    top: this.props.top - 10,
                    backgroundColor: this.props.color,
                }}
            >
                <Text style={styles.letter}>
                    {this.props.letter}
                </Text>
            </View>
        );
    }
}

AlphabeticScrollBarPointer.propTypes = {
    top: PropTypes.number,
    color: PropTypes.string,
    letter: PropTypes.string
};

const styles = {
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 25,
        width: 50,
        height: 50,
        zIndex: 999,
        right: 50
    },
    letter: {
        fontSize: 20,
        fontWeight: 'bold', 
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center',
    }
};

export default AlphabeticScrollBarPointer;