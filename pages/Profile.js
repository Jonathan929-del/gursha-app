// Imports
import React from 'react'
import {Text} from 'react-native';
import {Link} from 'react-router-native';





// Main Function
const Profile = () => {
  return (
    <>
      <Text>Profile</Text>
      <Link to='/login'>
        <Text>Login</Text>
      </Link>
      <Link to='/register'>
        <Text>Register</Text>
      </Link>
    </>
  )
};





// Export
export default Profile;