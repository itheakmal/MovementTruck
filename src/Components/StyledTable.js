import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, StyleSheet, Text, SafeAreaView, TouchableOpacity, RefreshControl, View } from 'react-native';

import { Table, Row, Rows } from 'react-native-reanimated-table';

// import styles from '../Utils/Styles';

const StyledTable = ({ headers, data, color }) => {
  // const [tableHead, setTableHead] = useState(['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'])
  const [widthArr, setWidthArr] = useState([40, '', 65, '', 65, '', 84, 80, 76])
  const [tableRows, setTableRows] = useState([])

  useEffect(() => {
    console.log('table data', data.length)
  }, [])



  // const widthh = 
  return (
    <View>
      <ScrollView>
        {data?.length > 0 ? (
          <View>
            <Table borderStyle={{ borderWidth: 0, borderColor: '#d9d9d9' }}>
              <Row data={headers} widthArr={widthArr} style={styles.header} textStyle={styles.headText} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                {
                  data.length && data.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.row, { backgroundColor: color[index] }]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        ) : <Text style={styles.screenText}>No more jobs for today</Text>}

      </ScrollView>
    </View>
  )
};

export default StyledTable;
const styles = StyleSheet.create({
  // container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#d9d9d9' },
  // text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { backgroundColor: '#E7E6E1' },

  container: { flex: 1, padding: 16, paddingTop: 0, backgroundColor: '#fff' },
  head: { height: 48, backgroundColor: '#c9c9c9' },
  text: { margin: 4, color: '#000' },
  headText: { margin: 4, color: '#000', fontWeight: '700' },
});