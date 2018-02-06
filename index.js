import React, { Component } from 'react';
import {
    View,
    Text,
    ViewPropTypes,
    Picker,
    Image,
    Modal,
    TouchableOpacity,
    Animated,
    Platform,
} from 'react-native';

/* Packages */
import PropTypes from 'prop-types';
import _ from 'lodash';

/* External components */
import Icon from '../../components/common/Icon';

/* Styles */
import styles from './styles';

class PickerCustom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [{
                value: -1,
                label: this.props.placeholder
            }],
            selected: -1,

            isVisible: false, /* For IOS modal */

            animatedHeight: new Animated.Value(0),
        };

        /* Ref */
        this.picker
    };

    componentWillMount() {
        const { selectedValue, data } = this.props;

        this.setState({
            selected: selectedValue,
            data: [
                ...this.state.data,
                ...data
            ]
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedValue !== this.props.selectedValue) {

            this.setState({
                selected: nextProps.selectedValue
            });
        };
    };

    getPickeredItem(selected = this.state.selected) {
        const { data } = this.state;

        var selectedItem = _.find(data, { value: selected });

        if (typeof selectedItem !== "undefined") {
            return selectedItem;
        }

        return false;
    }

    getPlaceholder() {
        var selectedItem = this.getPickeredItem();

        if (selectedItem) {
            return selectedItem.label
        };

        return '';
    };

    getPickeredItemValue() {
        var selectedItem = this.getPickeredItem();

        if (selectedItem) {
            return selectedItem.value
        };

        return false;
    };

    hide() {
        Animated.timing(
            this.state.animatedHeight,
            {
                toValue: 0,
                duration: 300
            }
        ).start(() => {
            this.setState({
                isVisible: false
            });
        });
    };

    show() {
        this.setState({
            isVisible: true,
            selectedIOS: this.state.selected
        });

        Animated.timing(
            this.state.animatedHeight,
            {
                toValue: 259,
                duration: 300
            }
        ).start();
    };

    handleValueChangeIOS(itemValue) {
        this.setState({
            selectedIOS: itemValue,
        });
    };

    handleValueChange(itemValue) {
        const { onValueChange, } = this.props;

        var selectedItem = this.getPickeredItem(itemValue);


        if (Platform.OS === 'ios') {
            this.hide();
        };

        onValueChange(selectedItem);
    };

    handlePickerPress() {
        if (Platform.OS === 'ios') {
            this.show();
        }
    };

    renderPickerItems() {
        const { data } = this.state;

        return data.map(
            (item, index) => {
                return (
                    <Picker.Item
                        key={index}
                        value={item.value}
                        label={item.label}
                        color={this.props.pickerItemColor}
                    />
                );
            }
        );
    };

    renderAndroidPicker() {
        const { mode } = this.props;

        return (
            <Picker
                ref={
                    (ref) => {
                        this.picker = ref;
                    }
                }
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'transparent',
                    color: 'transparent'
                }}
                mode={mode}
                selectedValue={this.state.selected}
                onValueChange={
                    (itemValue) => {
                        return this.handleValueChange(itemValue);
                    }
                }
            >
                {this.renderPickerItems()}
            </Picker>
        );
    };

    renderIOSPicker() {
        return (
            <Modal
                animationType={'none'}
                transparent={true}
                visible={this.state.isVisible}
                onRequestClose={
                    () => {
                        return this.hide();
                    }
                }
            >
                <View style={styles.modal_outer_container}>
                    <TouchableOpacity
                        style={styles.modal_outer_container}
                        activeOpacity={1}
                        onPress={
                            () => {
                                return this.hide();
                            }
                        }
                    />
                    <Animated.View
                        style={[
                            styles.modal_inner_container, {
                                height: this.state.animatedHeight
                            },
                        ]}
                    >
                        <View style={styles.modal_button_holder}>
                            <TouchableOpacity
                                style={[styles.modal_button, { left: 0 }]}
                                onPress={
                                    () => {
                                        return this.hide();
                                    }
                                }
                            >
                                <Text style={[styles.modal_button_text, styles.modal_button_text_cancel]}>
                                    {this.props.cancelButtonText}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modal_button, { right: 0 }]}
                                onPress={
                                    () => {
                                        return this.handleValueChange(this.state.selectedIOS);
                                    }
                                }
                            >
                                <Text style={styles.modal_button_text}>
                                    {this.props.confirmButtonText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Picker
                            style={{ marginTop: -1 }}
                            selectedValue={this.state.selectedIOS}
                            onValueChange={
                                (itemValue, itemIndex) => {
                                    return this.handleValueChangeIOS(itemValue);
                                }
                            }
                        >
                            {this.renderPickerItems()}
                        </Picker>
                    </Animated.View>
                </View>
            </Modal>
        );
    };

    renderPicker() {
        if (Platform.OS === 'ios') {
            return this.renderIOSPicker();
        } else {
            return this.renderAndroidPicker();
        }
    };

    render() {
        const { label } = this.props;
        const { containerStyle, pickerContainerStyle, placeholderStyle, iconStyle } = this.props;

        var iconProps = {
            name: this.props.icon,
            size: this.props.iconSize,
            color: this.props.iconColor,
            style: this.props.iconStyle
        };

        return (
            <View
                style={[
                    styles.container,
                    containerStyle,
                ]}
            >
                <View >
                    <TouchableOpacity
                        style={[
                            styles.inner_container,
                            pickerContainerStyle
                        ]}
                        onPress={
                            () => {
                                return this.handlePickerPress();
                            }
                        }
                    >
                        <Text
                            style={[
                                styles.placeholder,
                                placeholderStyle
                            ]}
                        >
                            {this.getPlaceholder()}
                        </Text>
                        {
                            this.props.icon !== null &&

                            <View style={styles.icon_holder}>
                                <Icon {...iconProps} />
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                {this.renderPicker()}
            </View >
        );
    }
}

PickerCustom.defaultProps = {
    /* Default picker props */
    mode: "dialog", /* Android picker mode */
    onValueChange: () => { },
    pickerItemColor: '#D54B44',

    data: [], /* Data for picker */
    placeholder: '', /* Placeholder for default value */
    selectedValue: -1, /* Pickered item value */

    cancelButtonText: 'CANCEL', /* IOS modal cancel button text */
    confirmButtonText: 'OK', /* IOS modal confirm button text */

    icon: null,
    iconSize: 12,
    iconColor: 'rgba(0,0,0,0.5)'
};

PickerCustom.propTypes = {
    mode: PropTypes.oneOf([
        'dialog',
        'dropdown'
    ]),
    onValueChange: PropTypes.func,
    pickerItemColor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),

    data: PropTypes.array,
    placeholder: PropTypes.string,
    selectedValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,

    icon: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),

    containerStyle: ViewPropTypes.style,
    pickerContainerStyle: ViewPropTypes.style,
    iconStyle: Image.propTypes.style,
};

export default PickerCustom;