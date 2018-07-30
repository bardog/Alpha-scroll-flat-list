import React, { Component } from 'react';
import {View, Text, PanResponder} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import ResponsiveFontSize from 'react-native-responsive-fontsize';

const ALPHABET = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class AlphabeticScrollBar extends Component {
    constructor (props) {
        super(props);

        this.state = {
            activeLetter: undefined,
            activeLetterViewTop: 0,
            alphabet: props.reverse ? [...ALPHABET].reverse() : ALPHABET
        };
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: debounce(this.handleOnFingerTouch.bind(this)),
            onPanResponderMove: debounce(this.handleOnFingerMove.bind(this)),
            onPanResponderTerminate: this.handleOnFingerStop.bind(this),
            onPanResponderRelease: this.handleOnFingerStop.bind(this),
        });
    }

    componentWillReceiveProps (newProps) {
        if (newProps.reverse !== this.props.reverse) {
            const alphabet = newProps.reverse ? [...ALPHABET].reverse() : ALPHABET;
            
            this.setState({
                alphabet
            });
        }
    }

    getTouchedLetter (y) {
        const top = y - (this.containerTop || 0) - 5;

        if (top >= 1 && top <= this.containerHeight) {
            this.setState({
                activeLetterViewTop: top
            });

            return this.state.alphabet[Math.round((top / this.containerHeight) * this.state.alphabet.length)]
        }
    }

    handleOnFingerTouch (e, gestureState) {
        this.handleOnTouchLetter(this.getTouchedLetter(gestureState.y0));
    }

    handleOnFingerMove (evt, gestureState) {
        this.handleOnTouchLetter(this.getTouchedLetter(gestureState.moveY));
    }

    handleOnTouchLetter (activeLetter) {
        this.setState({
            activeLetter
        });
        
        this.props.onScroll(activeLetter, this.state.activeLetterViewTop);
    }

    handleOnFingerStop () {
        this.setState({
            activeLetter: undefined
        });

        this.props.onScrollEnds();
    }

    handleOnLayout () {
        this.alphabetContainer.measure((width, x1, y1, height, px, py) => {
            if (!this.containerTop && !this.containerHeight) {
                this.containerTop = py;
                this.containerHeight = height;
            }
        });
    }

    render() {
        return (
            <View
                ref={elem => this.alphabetContainer = elem}
                {...this.panResponder.panHandlers}
                onLayout={this.handleOnLayout.bind(this)}
                style={styles.container}
            >
                {this.state.alphabet.map(letter => (
                    <View key={letter} style={{paddingVertical: 1}}>
                        <Text style={{
                            ...styles.letter,
                            fontSize: ResponsiveFontSize(this.props.isPortrait ? 2 : 1.6), 
                        }}>
                            {letter}
                        </Text>
                    </View>
                ))}
            </View>
        );
    }
}

const styles = {
    container: {
        position: 'absolute',
        right: 0,
        padding: 10
    },
    letter: {
        alignSelf: 'center',
        fontWeight: 'bold'
    }
};

AlphabeticScrollBar.propTypes = {
    onScroll: PropTypes.func,
    onScrollEnds: PropTypes.func,
    activeColor: PropTypes.string,
    reverse: PropTypes.bool,
    isPortrait: PropTypes.bool
};

AlphabeticScrollBar.propTypes = {
    onScroll: () => {},
    onScrollEnds: () => {}
};

export default AlphabeticScrollBar;