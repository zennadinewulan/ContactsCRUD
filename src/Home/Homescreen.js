import React, {Component} from 'react';
import {Alert,Platform, StyleSheet, View, StatusBar} from 'react-native';
import {
  Content, 
  Fab, 
  Button, 
  Icon, 
  Spinner, 
  ListItem, 
  Left, 
  Body, 
  Right, 
  Thumbnail, 
  Text } from 'native-base';
import axios from 'axios';
import styles from './Homescreen.style';
import ListItems from './component/ListItems';
import {TouchableOpacity} from 'react-native';

export default class Homescreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      data : [],
      page : 1,
      perpage : 7,
      sort:1,
      loading: false
    }
  }

  makeRemoteRequest = () => {
    const {page,perpage,sort} = this.state
    this.setState({loading:true})
    setTimeout(() => {
      axios.get('https://simple-contact-crud.herokuapp.com/contact')
      .then(res => {
        const newData = res.data.data;
        this.setState({
          loading:false,
          data : newData
        })
      })
      .catch(err => {
        throw err;
      });
    }, 1500)
  }

  componentDidMount(){
    this.makeRemoteRequest()
  } 


  handlePostClick = (firstName, lastName, age, photo) => {
    axios.post('https://simple-contact-crud.herokuapp.com/contact', {
      firstName, lastName, age, photo
    })
    .then((response) => {
      const newData = response.data.data;
      this.setState({
        data : newData
      })
      this.props.navigation.popToTop()
    })
    .catch((error) => {
      throw error
    });
  }

  handleDelete = (id, index) => {
    console.log('id', id);
    const url = 'https://simple-contact-crud.herokuapp.com/contact/' + id;
    console.log('url', url);    
    axios.delete(url)
    .then(res => {
      const newData = this.state.data.concat();
      newData.splice(index, 1);

      this.setState({
        data : newData
      })
    })
    .catch(err => {
      throw err;
    });
  }

  handleEdit = (firstName, lastName, age, photo, id) => {
    const url = 'https://simple-contact-crud.herokuapp.com/contact/' + id;    
    axios.put(url, {
      firstName, lastName, age, photo
    })
    .then((response) => {
      this.setState({
        data : response.data.data,
      })
      this.props.navigation.popToTop()
    })
    .catch((error) => {
      throw error
    });
  }

  handleLoadMore = () => {
    this.setState({
      page : this.state.page + 1
    }, () => {
      this.makeRemoteRequest()
    })
  }

  renderFooter = () => {
    if(this.state.loading === false) return null;

    return (
        <View>
          <Spinner color='#f22213' />
          <Text style={styles.footerLoad}>
            Load more
          </Text>
        </View>
    )
  }

  renderList = (item,index) => {
    return(
      <ListItem 
            style={styles.listItem}
            avatar 
            key={index}
            onPress = {
              () => this.props.navigation.navigate('Edit', {
                                                            id : item.id,
                                                            handleEdit : this.handleEdit
                                                           }
                                                  )
            } 
            onLongPress={() => Alert.alert(
              'Are you sure',
              'you want to delete this contact ?',
              [
                {text: 'Cancel', onPress: () => null},
                {text: 'OK', onPress: () => this.handleDelete(item.id, index)},
              ],
              { cancelable: false }
            )}>
            <Left>
              <Thumbnail style={styles.defaultBackgroundColor} source={{ uri: item.photo }} />
            </Left>
            <Body>
              <Text>{item.firstName}</Text>
              <Text>{item.lastName}</Text>
              <Text>{item.age}</Text>
            </Body>
          </ListItem>
    )
  }

  render() {
    const {firstName, lastName, age} = this.state
    return (
      <View style={styles.container}>
        <StatusBar 
          backgroundColor='#f22213'
          barStyle='light-content'
        />

        <View style={{flex: 1}}>
            <ListItems 
              {...this.props}
              data={this.state.data}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              handleLoadMore={this.handleLoadMore}
              renderFooter={this.renderFooter}
              renderList = {this.renderList}
            />
            {
              this.state.loading === false ? 
              <TouchableOpacity onPress={() => this.handleLoadMore()}>
                <View style={styles.loadMoreButton}>
                  <Text style={styles.loadMoreText}>Load More</Text>
                </View>
              </TouchableOpacity>
              :
              null
            }
            
        </View>


        <Fab
            style={styles.defaultBackgroundColor}
            position= 'bottomRight'
            onPress={() => this.props.navigation.navigate('Add', {
                                                                  handlePostClick:this.handlePostClick
                                                                })}>
            <Icon type='FontAwesome' name='pencil' />
        </Fab>
      </View>
    );
  }
}

