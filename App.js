import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runBtn: { text: 'Run', running: false },
      passed: 0,
      failed: 0,
      running: 0,
      stop: false,
      tests: [
        { description: "2 + 2 = 4",                                    run: 'generateDummyTest', status: 'None' },
        { description: "Coffee is warm",                               run: 'generateDummyTest', status: 'None' },
        { description: "Haikus are 17 syllables",                      run: 'generateDummyTest', status: 'None' },
        { description: "English sentences read like Edgar Allen Poe",  run: 'generateDummyTest', status: 'None' },
        { description: "Indents are tabs not spaces always!",          run: 'generateDummyTest', status: 'None' },
        { description: "Overscores are now underscores",               run: 'generateDummyTest', status: 'None' }
      ]
    }
  }

  reset = () => {
    this.setState({
      tests: [
        { description: "2 + 2 = 4",                                    run: 'generateDummyTest', status: 'None' },
        { description: "Coffee is warm",                               run: 'generateDummyTest', status: 'None' },
        { description: "Haikus are 17 syllables",                      run: 'generateDummyTest', status: 'None' },
        { description: "English sentences read like Edgar Allen Poe",  run: 'generateDummyTest', status: 'None' },
        { description: "Indents are tabs not spaces always!",          run: 'generateDummyTest', status: 'None' },
        { description: "Overscores are now underscores",               run: 'generateDummyTest', status: 'None' }
      ],
      runBtn: { text: 'Run', running: false },
      passed: 0,
      failed: 0,
      running: 0,
      stop: false,
    });
  }

generateDummyTest = () => {
  console.log('running');
  var delay = 1000 + Math.random() * 1000;
  var testPassed = Math.random() > 0.5;

  return function(callback) {
    setTimeout(function() {
      callback(testPassed);
    }, delay);
  };
}

  organizeTests(index, testPassed) {
    const { tests, passed, running, failed } = this.state;
    const testsCopy = [ ...tests];
    const removedTest = testsCopy.splice(index, 1);
    let result;

    if (testPassed) {
      result = [{ ...removedTest[0], status: 'Passed' }, ...testsCopy]
      this.setState({ tests: result, passed: passed + 1, running: running - 1 });
      return;
    } 

    result = [ ...testsCopy, { ...removedTest[0], status: 'Failed' }]
    this.setState({ tests: result, failed: failed + 1, running: running - 1 });
  }

  stopTests = () => {
    this.setState({ stopTest: true });
  }

  runTests = () => {
    const { tests, running, stopTest } = this.state;
    
    this.setState({ runBtn: { text: 'Running', running: true } });
    this.setState({ running: tests.length });

    tests.forEach((test, index) => {
      let testStatus = this[test.run]();
      testStatus(result => {
        this.organizeTests(index, result);
      });
    });
  }

  row = (test, index) => {
    return (
        <View key={index} style={styles.row}>
            <Text style={{color: 'white', marginLeft: 5}}>{test.description}</Text>
            <View style={styles.statusContainer}>
              <Text style={{color: 'white'}}>{test.status}</Text>
            </View>
        </View> 
    );
  }
  render() {
    const { runBtn, tests, passed, failed, running } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={styles.countContainer}>
          <View style={styles.controlPanel}>
            <View style={[styles.run, { backgroundColor: 'transparent' }]}>
              <Text>Passed: {passed}</Text>
            </View>
            <View style={[styles.stop, { backgroundColor: 'transparent' }]}>
              <Text>Failed: {failed}</Text>
            </View>
            <View style={[styles.reset, { backgroundColor: 'transparent' }]}>
              <Text>Running: {running}</Text>
            </View>
          </View> 
        </View>

        <View style={styles.rowContainer}>
          {tests.map((test, index) => this.row(test, index))}
        </View>

         <View style={styles.controlPanel}>
          <TouchableOpacity onPress={this.runTests} disabled={runBtn.running} style={styles.run}>
            <Text>{runBtn.text}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.stopTests} style={styles.stop}>
            <Text>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.reset} style={styles.reset}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View> 

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  countContainer: {
    backgroundColor: 'orange',
    position: 'absolute',
    top: 20,
    right: 0,
    left: 0,
    height: Height * 0.07
  },
  rowContainer: {
    position: 'absolute',
    top: Height * 0.1,
    bottom: Height * 0.06,
    width: Width,
  },
  row: {
    backgroundColor: 'gray',
    width: Width,
    flexDirection: 'row',
    height: Height * 0.06,
    alignItems: 'center'
  },
  statusContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'black',
    width: Width * 0.3,
    alignItems: 'center',
    justifyContent: 'center'    
  },
  controlPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Height * 0.06,
    flexDirection: 'row'
  },
  run: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: Width * 0.333,
    height: Height * 0.06
  },
  stop: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: Width * 0.333,
    height: Height * 0.06
  },
  reset: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: Width * 0.333,
    height: Height * 0.06
  }
});
