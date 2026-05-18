import { View, Text } from 'react-native'
import { Link } from "expo-router"; 
import React from 'react'

const SignUp = () => {
  return (
    <View>
      <Text>sign-up</Text>
      <Link href="/(auth)/sign-up">Sign In</Link>
    </View>
  )
}

export default SignUp