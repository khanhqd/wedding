import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import Button2 from './Button2';
const Item = Picker.Item;
const SearchBar = ({ value, onChangeText, selectedValue, onValueChange, onPress}) => {
  return(
    <View style={styles.searchbar}>
        <TextInput
          placeholder="...."
          style={styles.input}
          value={value}
          onChangeText={onChangeText}/>
        <Picker
            style={{ width: 200 }}
            selectedValue={selectedValue}
            onValueChange={onValueChange}>
            <Item label="Số điện thoại" value="employ_phone" />
            <Item label="Tên" value="employ_name" />
            <Item label="Trạng thái" value="employ_status" />
            <Item label="Tất cả" value="employ" />
        </Picker>
        <Button2
          textColor="white"
          backgroundColor = "rgb(203, 51, 10)"
          text="Tìm"
          onPress={onPress}/>
    </View>
  )
}
const styles = {
  input: {
    color: 'rgb(1, 94, 170)',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize:15,
    lineHeight:25,
    flex:3
  },
  box:{
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 5,
    marginVertical: 1,
    overflow: 'hidden',
    elevation:2
  },
  titleContainer:{
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    borderBottomColor: '#d6d7da',
    backgroundColor: '#f6f7f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation:1
  },

  textTitle:{
    color:'black',
    paddingLeft:20,
    fontSize:15,
    fontWeight:'bold'
  },
  textBox:{
    fontSize:15,
    padding:10,
    paddingLeft:30,
    color:'black'
  },
  contentBox:{
    paddingLeft:20,
    height:80
  },
  searchbar: {
  backgroundColor: 'white',
  borderRadius: 10,
  height: 45,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: 'grey',
  elevation: 2
  }
};
export { SearchBar };
