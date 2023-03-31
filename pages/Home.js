// Imports
import {Text, View, StyleSheet} from 'react-native';
import {IconButton, Avatar} from 'react-native-paper';





// Main Function
const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>

      </View>
      <View style={styles.content}>
        <View style={styles.topbar}>
          <View style={styles.pages}>
            <Text style={styles.page}>Friends</Text>
            <Text style={styles.page}>Following</Text>
            <Text style={styles.page}>For You</Text>
            <IconButton style={styles.searchIcon} icon='magnify' size={30} iconColor='#fff'/>
          </View>
        </View>
        <View style={styles.textsContainer}>
          <View style={styles.texts}>
            <View style={styles.textsContent}>
              <Text style={styles.username}>User</Text>
              <Text style={styles.description}>User description</Text>
            </View>
          </View>
          <View style={styles.interactions}>
            <View style={styles.userProfile}>
              <View>
                <Avatar.Image source={require('../assets/favicon.png')}/>
                <Avatar.Icon icon='plus' size={25} style={styles.followIcon}/>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <IconButton icon='heart' size={40} iconColor='#fff'/>
              <Text style={styles.number}>921</Text>
            </View>
            <View style={styles.itemContainer}>
              <IconButton icon='clipboard-text' size={40} iconColor='#fff'/>
              <Text style={styles.number}>50</Text>
            </View>
            <View style={styles.itemContainer}>
              <IconButton icon='star' size={40} iconColor='#fff'/>
              <Text style={styles.number}>35</Text>
            </View>
            <View style={styles.itemContainer}>
              <IconButton icon='arrow-right-thick' size={40} iconColor='#fff'/>
              <Text style={styles.number}>13</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};






// Styles
const styles = StyleSheet.create({
  container:{
    height:'100%',
    paddingBottom:50,
    backgroundColor:'#000'
  },
  videoContainer:{

  },
  content:{
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  },
  topbar:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  pages:{
    width:'50%',
    display:'flex',
    paddingTop:'10%',
    flexDirection:'row',
    position:'relative',
    justifyContent:'space-between'
  },
  page:{
    color:'#fff'
  },
  searchIcon:{
    top:32,
    right:-100,
    position:'absolute'
  },
  textsContainer:{
    width:'100%',
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  texts:{
    width:'75%',
    height:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'flex-start'
  },
  textsContent:{
    paddingVertical:10,
    paddingHorizontal:20
  },
  username:{
    fontSize:15,
    color:'#fff',
    paddingBottom:5
  },
  description:{
    fontSize:12,
    color:'#fff',
    paddingBottom:10
  },
  interactions:{
    display:'flex',
    paddingBottom:20
  },
  userProfile:{
    display:'flex',
    marginBottom:5,
    paddingVertical:20,
    alignItems:'center',
    justifyContent:'center'
  },
  followIcon:{
    left:20,
    bottom:-15,
    position:'absolute'
  },
  itemContainer:{
    display:'flex',
    marginVertical:3,
    alignItems:'center',
    justifyContent:'center',
  },
  number:{
    color:'#fff',
    marginTop:-10,
    marginBottom:10
  }
});






// Export
export default Home;