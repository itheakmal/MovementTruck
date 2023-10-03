import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
// import styles from '../Utils/Styles';

const StyledTable = ({ headers, data }) => (
  // <View style={styles.table}>
  //   <View style={styles.tableRow}>
  //     {headers.map(header => (
  //       <Text key={header} style={[styles.tableCell, styles.tableHeader]}>{header}</Text>
  //     ))}
  //   </View>
  //   {data.map((row, index) => (
  //     <View key={index} style={styles.tableRow}>
  //       {Object.values(row).map((cell, index) => (
  //         <Text key={index} style={styles.tableCell}>{cell}</Text>
  //       ))}
  //     </View>
  //   ))}
  // </View>
  <View style={styles.container}>
    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
      <Row data={headers} style={styles.head} textStyle={styles.text} />
      {/* <Row data={headers} style={styles.head}  /> */}
      <Rows data={data}  textStyle={styles.text} />
    </Table>
  </View>
);

export default StyledTable;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 0, backgroundColor: '#fff' },
  head: { height: 60, backgroundColor: '#e9e9e9' },
  text: { margin: 6, color: '#000' },
});