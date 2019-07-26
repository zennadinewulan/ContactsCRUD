import React, { Component } from 'react';
import { Container, List, Left,Body,Right, Thumbnail,ListItem,Content, Form, Item, Input, Button, Text, Label } from 'native-base';
import {FlatList} from 'react-native';
import Headers from './Headers.js';
import axios from 'axios';
import styles from './Editscreen.style';

export default class Editscreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      data : [],
      firstName : '', 
      lastName : '', 
      age : 0, 
      photo : '',
    }
  }

  componentDidMount(){
    const url = 'https://simple-contact-crud.herokuapp.com/contact/' + this.props.navigation.state.params.id;    
    axios.get(url)
    .then(res => {
      const newData = res.data.data;
      this.setState({
        data : newData,
        firstName : newData.firstName,
        lastName : newData.lastName,
        age : newData.age,
        photo : newData.photo
      })
    })
    .catch(err => {
      throw err;
    });
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

  handleEdit = (id) => {
    const {firstName, lastName, age, photo} = this.state;
    this.props.navigation.state.params.handleEdit(firstName, lastName, age, photo, id)
    this.setState({
      firstName : '',
      lastName : '',
      age : 0,
      photo : '',
    })
  }

  render() {
    const {id} = this.props.navigation.state.params
    return (
      <Container>
        <Headers navigation={this.props.navigation} handleEdit={this.handleEdit} id={id}/>
        <Content>
          <List style={styles.list}>
          <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <ListItem 
                  style={styles.listItem} avatar>
                  <Left>
                    <Thumbnail style={styles.thumbnail} source={{ uri: item.photo }} />
                  </Left>
                  <Body>
                    <Text>{item.firstName}</Text>
                    <Text>{item.lastName}</Text>
                    <Text>{item.age}</Text>
                  </Body>
                </ListItem>
              )}
            />
          </List>
          
          <Text style={styles.title}>Fill the form to edit</Text>

          <Form style={styles.form}>
            <Item stackedLabel>
              <Label>First Name</Label>
              <Input value={this.state.firstName} onChangeText={this.handleFirstName}/>
            </Item>
            <Item stackedLabel>
              <Label>Last Name</Label>
              <Input value={this.state.lastName} onChangeText={this.handleLastName}/>
            </Item>
            <Item stackedLabel>
              <Label>Age</Label>
              <Input value={this.state.age} onChangeText={this.handleAge}/>
            </Item>
            <Item stackedLabel>
              <Label>Photo</Label>
              <Input value={this.state.photo} onChangeText={this.handlePhoto}/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}