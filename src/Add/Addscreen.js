import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, Thumbnail } from 'native-base';
import styles from './Addscreen.style';
import Headers from './Headers.js';

export default class Addscreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstName : '', 
      lastName : '', 
      age : 0, 
      photo : '',
    }
  }

  handleFirstName = (val) => {
    this.setState({
      firstName : val
    })
  }

  handleLastName = (val) => {
    this.setState({
      lastName : val
    })
  }

  handleAge = (val) => {
    this.setState({
      age : val
    })
  }

  handlePhoto = (val) => {
    this.setState({
      photo : val
    })
  }

  handlePostClick = () => {
    const {firstName,lastName,age,photo} = this.state;
    this.props.navigation.state.params.handlePostClick(firstName,lastName,age,photo)
    this.setState({
      firstName : '',
      lastName : '',
      age : 0,
      photo : ''
    })
  }

  render() {
    return (
      <Container>
        <Headers navigation={this.props.navigation} handlePostClick={this.handlePostClick}/>
        <Content>
          <Thumbnail style={styles.thumbnail} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png'}} />
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input value={this.state.firstName} onChangeText={this.handleFirstName} required/>
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input value={this.state.lastName} onChangeText={this.handleLastName} required/>
            </Item>
            <Item floatingLabel>
              <Label>Age</Label>
              <Input value={this.state.age} onChangeText={this.handleAge} required/>
            </Item>
            <Item floatingLabel>
              <Label>Photo</Label>
              <Input value={this.state.photo} onChangeText={this.handlePhoto} required/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}