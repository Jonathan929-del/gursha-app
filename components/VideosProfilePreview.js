// Imports
import React from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {StyleSheet, View, Text, Dimensions} from 'react-native';





// Main function
const VideosProfilePreview = ({items}) => {
  return (
    <View>
        <FlatGrid
            data={items}
            style={styles.gridView}
            staticDimension={Dimensions.get('screen').width}
            spacing={0}
            renderItem={({item}) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                </View>
            )}
        />
    </View>
  )
};






// Styles
const styles = StyleSheet.create({
    gridView: {
        flex:1,
        paddingBottom:55
    },
    itemContainer: {
        padding:10,
        height:220,
        borderWidth:0.2,
        borderColor:'#ccc',
        justifyContent:'flex-end'
    },
    itemName: {
        fontSize:14,
        color:'#fff'
    }
});





// Export
export default VideosProfilePreview;