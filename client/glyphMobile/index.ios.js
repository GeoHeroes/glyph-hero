/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  MapView,
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;

var glyphMobile = React.createClass({
  render: function() {
    return (
      <MapView style={styles.map}>
      </MapView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    height: 500,
    top: 40,
  },
});

AppRegistry.registerComponent('glyphMobile', () => glyphMobile);
