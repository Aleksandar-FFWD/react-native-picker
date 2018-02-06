import {
    Platform,
    StyleSheet
} from 'react-native';

var shadow = {
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
        height: 0,
        width: 0,
    },
    elevation: 4,
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor: '#D54B44',
    },
    inner_container: {
        paddingBottom: 10,
        paddingTop: 5,
    },
    placeholder: {
        color: '#D54B44',
        fontSize: 16,
        marginBottom: Platform.OS === 'ios' ? -12 : 0,
    },
    modal_outer_container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
    icon_holder: {
        position: 'absolute',
        top: "50%",
        right: 0,
    },
    modal_inner_container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        height: 0,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    modal_button_holder: {
        backgroundColor: '#F8F7F7',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 42,
        ...shadow
    },
    modal_button: {
        position: 'absolute',
        top: 0,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    modal_button_text: {
        color: '#D54B44',
        backgroundColor: 'transparent',
        fontSize: 16,
    },
    modal_button_text_cancel: {
        color: "#4A4A4A"
    }
});

export default styles;