

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';


const KEYS_TO_FILTERS = ['name'];
const emails = [{name:'Zaid'}, {name:"Huraira"}]; 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  render() {
    const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    console.log(filteredEmails)
    return (
      <View style={[styles.container, {marginTop:100}]}>
        <SearchInput
          onChangeText={(term) => { this.searchUpdated(term) }}
          style={styles.searchInput}
          placeholder="Type a message to search"
        />
        <ScrollView style = {{marginTop:10}}>
          {filteredEmails.map((email,index) => {
            return (
              <TouchableOpacity onPress={() => alert(email)} key={index} style={styles.emailItem}>
                <View>
                  <Text>{email.name}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});