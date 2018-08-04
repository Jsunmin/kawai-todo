import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from 'react-native';

const {
  width,
  height
} = Dimensions.get('window');

export default class Todo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: ''
  };
  render() {
    const {
      isCompleted,
      isEditing,
      toDoValue
    } = this.state;
    const {
      text
    } = this.props;
    return ( <View style = { styles.container } >
      <View style = { styles.column } >
      <TouchableOpacity onPress = { this._toggleComplete } >
      <View style = {
        [styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]
      } /> </TouchableOpacity> {
        isEditing ? < TextInput value = {
          toDoValue
        }
        style = {
          [styles.text, styles.input, isCompleted ? styles.completedCircle : styles.uncompletedCircle]
        }
        multiline = {
          true
        }
        onChangeText = {
          this._controllInput
        }
        returnKeyType = {
          'done'
        }
        onBlur = {
          this._finishEditing
        }
        /> : <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>{text}</Text >
      } <
      /View> {
        isEditing ? < View style = {
            styles.actions
          } >
          <
          TouchableOpacity onPressOut = {
            this._finishEditing
          } >
          <
          View style = {
            styles.actionContainer
          } >
          <
          Text style = {
            styles.actionText
          } > ✅ < /Text> <
          /View>   <
          /TouchableOpacity> <
          /View> : <View style={styles.actions}> <
          TouchableOpacity onPressOut = {
            this._startEditing
          } >
          <
          View style = {
            styles.actionContainer
          } >
          <
          Text style = {
            styles.actionText
          } > ✏️ < /Text> <
          /View> <
          /TouchableOpacity> <
          TouchableOpacity >
          <
          View style = {
            styles.actionContainer
          } >
          <
          Text style = {
            styles.actionText
          } > ❌ < /Text> <
          /View> <
          /TouchableOpacity> <
          /View>
      } <
      /View>
    );
  }
  _toggleComplete = () => {
    this.setState(prevState => {
      return ({
        isCompleted: !prevState.isCompleted // 이전의 상태에 기반하여 상태를 변경해야 한다면, updater 함수 사용. updater함수  1인자. ( setState(updater, [callback]) ) 
      });
    });
  };
  _startEditing = () => {
    const {
      text
    } = this.props;
    this.setState({
      isEditing: true,
      toDoValue: text
    })
  };
  _finishEditing = () => {
    this.setState({
      isEditing: false
    })
  };
  _controllInput = text => {
    this.setState({
      toDoValue: text
    })
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  completedCircle: {
    borderColor: '#bbb'
  },
  uncompletedCircle: {
    borderColor: '#F23657'
  },
  completedText: {
    borderColor: '#bbb',
    textDecorationLine: 'line-through'
  },
  uncompletedText: {
    borderColor: '#353839'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15, // 원만드려면, 사각형의 절반이어야!
    borderWidth: 3,
    borderColor: 'red',
    marginRight: 20
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
    justifyContent: 'space-between'
  },
  actions: {
    flexDirection: 'row'
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    marginVertical: 15,
    width: width / 2
  }
});