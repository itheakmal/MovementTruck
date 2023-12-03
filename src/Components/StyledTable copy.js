import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
// import styles from '../Utils/Styles';

const StyledTable = ({ headers, data }) => {
  const widthh = [40,'',65,'',65,'',84,80,76]
  return (
    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
      <Row data={headers} widthArr={[40,'',65,'',65,'',84,80,76]} style={styles.head} textStyle={styles.text} />
      {/* <Row data={headers} style={styles.head}  /> */}
      <Rows data={data} widthArr={[40,'',65,'',65,'',84,80,76]} textStyle={styles.text} />


      {/* {
                  data.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthh[index]}
                      textStyle={styles.text}
                    />
                  ))
                } */}

    </Table>
)};

export default StyledTable;
const styles = StyleSheet.create({
  // container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },

  container: { flex: 1, padding: 16, paddingTop: 0, backgroundColor: '#fff' },
  head: { height: 48, backgroundColor: '#c9c9c9' },
  // text: { margin: 4, color: '#000' },
});