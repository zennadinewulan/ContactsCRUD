import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import {TouchableOpacity} from 'react-native';
import styles from './Editscreen.style'

const Headers = ({navigation, handleEdit,id}) => (
  <Header style={styles.header} androidStatusBarColor='#f22213'>
    <Left>
      <Button transparent onPress={() => navigation.pop()}>
        <Icon name='arrow-back' />
      </Button>
    </Left>
    <Body style={styles.body}>
      <Title>Edit Contact</Title>
    </Body>
    <Right>
      <TouchableOpacity onPress={() => handleEdit(id)}>
        <Text style={styles.headerText}>Done</Text>
      </TouchableOpacity>
    </Right>
  </Header>
);

export default Headers