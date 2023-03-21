// Imports
import React from 'react';
import Home from './Home';
import Inbox from './Inbox';
import Profile from './Profile';
import AddVideo from './AddVideo';
import {IconButton} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {Route, Link, Routes} from 'react-router-native';





// Main Function
const Navbar = ({theme}) => {
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Link to="/" style={styles.navItem}>
                    <View style={styles.tabContainer}>
                        <IconButton icon='home' iconColor='#fff' size={30}/>
                        <Text style={styles.text}>Home</Text>
                    </View>
                </Link>
                <Link to="/add" style={styles.navItem}>
                    <View style={styles.addVideoContainer}>
                        <Text style={styles.addVideoIcon}>+</Text>
                    </View>
                </Link>
                <Link to="/inbox" style={styles.navItem}>
                    <View style={styles.tabContainer}>
                        <IconButton icon='message-text' iconColor='#fff' size={30} />
                        <Text style={styles.text}>Inbox</Text>
                    </View>
                </Link>
                <Link to="/profile" style={styles.navItem}>
                    <View style={styles.tabContainer}>
                        <IconButton icon='account' iconColor='#fff' size={30} />
                        <Text style={styles.text}>Profile</Text>
                    </View>
                </Link>
            </View>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/add" element={<AddVideo theme={theme}/>} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </View>
    );
};





// Styles
const styles = StyleSheet.create({
    container:{
        height:'100%'
    },
    nav:{
        bottom:0,
        zIndex:10,
        height:50,
        width:'100%',
        display:'flex',
        paddingBottom:10,
        borderTopWidth:1,
        borderColor:'#ccc',
        position:'absolute',
        flexDirection:'row',
        backgroundColor:'#000'
    },
    navItem:{
        flex:1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        
    },
    tabContainer:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:'#fff',
        fontSize:10,
        marginTop:-20
    },
    addVideoContainer:{
        width:65,
        marginTop:5,
        display:'flex',
        borderRadius:10,
        textAlign:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    addVideoIcon:{
        fontSize:30,
        color:'#000',
        marginTop:-6
    }
});





// Export
export default Navbar;
// underlayColor="#f0f4f7"