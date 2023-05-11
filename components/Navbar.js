// Imports
import React from 'react';
import Home from '../pages/Home';
import Info from '../pages/Info';
import Edit from '../pages/Edit';
import Inbox from '../pages/Inbox';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import AddVideo from '../pages/AddVideo';
import Following from '../pages/Following';
import {IconButton} from 'react-native-paper';
import {Route, Link, Routes} from 'react-router-native';
import {View, StyleSheet, Text, Dimensions} from 'react-native';





// Main Function
const Navbar = ({theme}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Routes>
                    <Route exact path="/" element={<Home theme={theme} />} />
                    <Route exact path="/following" element={<Following theme={theme} />} />
                    <Route path="/inbox" element={<Inbox theme={theme}/>} />
                    <Route path="/add" element={<AddVideo theme={theme} />} />
                    <Route path="/profile" element={<Profile theme={theme} />} />
                    <Route path="/edit" element={<Edit theme={theme} />} />
                    <Route path="/login" element={<Login theme={theme} />} />
                    <Route path="/register" element={<Register theme={theme} />} />
                    <Route path="/info" element={<Info theme={theme} />} />
                </Routes>
            </View>
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
        </View>
    );
};





// Styles
const styles = StyleSheet.create({
    container:{
        height:Dimensions.get('screen').height
    },
    content:{
        backgroundColor:'#000',
        height:Dimensions.get('screen').height - 100,
    },
    nav:{
        height:50,
        width:'100%',
        display:'flex',
        paddingBottom:10,
        borderTopWidth:1,
        borderColor:'#ccc',
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