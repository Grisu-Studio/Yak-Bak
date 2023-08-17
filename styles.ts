import { StyleSheet, Dimensions } from 'react-native';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fee9d7',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#34222e',
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
        fontSize: 15,
    },
    cardLabel: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,
        marginBottom: -10,
    },
    typeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        margin: 10,
        width: screenWidth * 0.83,
        backgroundColor: '#f9bf8f',
        borderRadius: 10,
        shadowColor: "#34222e",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    carousel: {
        flex: 1,
        marginTop: 20,
        width: '100%',
    },
    selectedTypeText: {
        color: '#e2434b',
    },
});