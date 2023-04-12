// Imports
import {Link} from 'react-router-native';
import {Button} from 'react-native-paper';
import {useContext, useState} from 'react';
import {AuthContext} from '../context/Auth';
import VideosProfilePreview from '../components/VideosProfilePreview';
import {StyleSheet, Text, View, ScrollView, Dimensions, Pressable} from 'react-native';





// Main Function
const Profile = ({theme}) => {



  const {logout, user}  = useContext(AuthContext);
  const [items, setItems] = useState([
    { name: '1', code: '#1abc9c' },
    { name: '2', code: '#2ecc71' },
    { name: '4', code: '#3498db' },
    { name: '3', code: '#9b59b6' },
    { name: '5', code: '#34495e' },
    { name: '6', code: '#16a085' },
    { name: '7', code: '#27ae60' },
    { name: '8', code: '#2980b9' },
    { name: '9', code: '#8e44ad' },
    { name: '10', code: '#2c3e50' },
  ]);




  return (
    <ScrollView style={styles.container}>
      {user ? (
        <>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>{user.bio}</Text>
          </View>
          <View style={styles.actionsContainer}>
            <Pressable onPress={logout}>
              <Text style={{color:theme.colors.primary}}>Logout</Text>
            </Pressable>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              
            </View>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.username}</Text>
          </View>
          <View style={styles.bar}>
            <View style={styles.item}>
              <Text style={styles.number}>{user.followingCount || 0}</Text>
              <Text style={styles.category}>Following</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.number}>{user.followersCount || 0}</Text>
              <Text style={styles.category}>Followers</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.number}>{user.likesCount || 0}</Text>
              <Text style={styles.category}>Likes</Text>
            </View>
          </View>
          <Button style={styles.buttonContainer}>
            <Text style={[styles.button, {color:theme.colors.primary}]}>
              Edit profile
            </Text>
          </Button>
          <Text style={styles.hr}>-</Text>
          <VideosProfilePreview items={items}/>
        </>
      ) : (
        <View style={styles.authenticatedContainer}>
          <Link to='/register'>
            <Text style={{marginBottom:15, marginTop:30, color:theme.colors.primary}}>Register</Text>
          </Link>
          <Link to='/login'>
            <Text style={{color:theme.colors.primary}}>Login</Text>
          </Link>
        </View>
      )}
    </ScrollView>
  )
};





// Styles
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#000',
    height:Dimensions.get('screen').height
  },
  bioContainer:{
    width:'100%',
  },
  bio:{
    color:'#fff',
    paddingTop:20,
    textAlign:'center',
  },
  actionsContainer:{
    top:20,
    right:30,
    position:'absolute'
  },
  authenticatedContainer:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:Dimensions.get('screen').height
  },
  imageContainer:{
    width:'100%',
    marginTop:30,
    display:'flex',
    alignItems:'center'
  },
  imageWrapper:{
    width:100,
    height:100,
    borderRadius:200,
    backgroundColor:'#fff'
  },
  nameContainer:{
    width :'100%'
  },
  name:{
    marginTop:10,
    color:'#fff',
    textAlign:'center',
  },
  bar:{
    width:'100%',
    marginTop:30,
    display:'flex',
    flexDirection:'row',
    paddingHorizontal:50,
    justifyContent:'space-between'
  },
  item:{
    display:'flex',
    alignItems:'center'
  },
  number:{
    color:'#fff'
  },
  category:{
    fontSize:12,
    color:'#ccc'
  },
  buttonContainer:{
    paddingTop:20
  },
  button:{
    fontSize:18,
    paddingTop:40,
    fontWeight:300
  },
  hr:{
    fontSize:1,
    width:'100%',
    marginTop:20,
    borderColor:'#ccc',
    borderBottomWidth:1
  },
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
export default Profile;