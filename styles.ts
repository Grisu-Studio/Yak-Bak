import { StyleSheet, Dimensions } from 'react-native';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5eded',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000000',
        marginTop: 50,
    },
    iconContainer: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderContainer: {
        width: '100%',
        alignItems: 'stretch',
        marginTop: 20,
    },
    sliderLabel: {
        textAlign: 'center',
        margin: 10,
    },
    typeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        margin: 10,
        width: screenWidth * 0.75,
        backgroundColor: '#f5eded',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    carousel: {
        marginTop: 20,
    }
});