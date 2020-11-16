import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';
import moment from "moment";

class CalculatingScreen2 extends Component{
  state={
    JoinYear:0, JoinMonth:0, JoinDay:0, //입사 년,월,일
    LeaveYear:0, LeaveMonth:0, LeaveDay:0, //퇴사 년,월,일
    NumberOfWorkingDays:0, //재직일수
    EnteringDate:0, //입사일자
    DateOfResignation:0, //퇴사일자
    term1BasePay:null, term2BasePay:null, term3BasePay:null, term4BasePay:null,
    term1OtherAllowance:null, term2OtherAllowance:null, term3OtherAllowance:null, term4OtherAllowance:null,
    diff3Month:0,
    AnnualBonus:null, // 연간상여금
    AnnualAllowance:null, //연차수당
    SeverancePay:null //퇴직금
  }
  
  updateState(){
    const Join = new Date(this.state.JoinYear, this.state.JoinMonth-1, this.state.JoinDay)
    const Leave = new Date(this.state.LeaveYear, this.state.LeaveMonth-1, this.state.LeaveDay)
    //const diff = ((Leave-Join)/(1000 * 3600 * 24))+1
    const diff = moment(Leave).diff(moment(Join), 'days')+1
    console.log('입사날짜 : ' + this.state.JoinYear+'년'+this.state.JoinMonth+'월'+this.state.JoinDay+'일')
    console.log('퇴사날짜 : ' + this.state.LeaveYear+'년'+this.state.LeaveMonth+'월'+this.state.LeaveDay+'일')
    //console.log(Join + '///' +Leave)
    console.log(diff)
    //console.log(moment(Join).format('YYYY년 MM월 DD일'))
    //console.log(moment(Leave).add(1,'days').format('YYYY년 MM월 DD일'))
    const LastDay = moment(Leave).add(1,'days').format('DD')

    if (LastDay == '01'){
      const Term1 = moment(Leave)
      const Term1_1 = moment(Term1).startOf('month')
      const Term2 = moment(Leave).subtract(1,'months').endOf('month')
      const Term2_1 = moment(Term2).startOf('month')
      const Term3 = moment(Leave).subtract(2,'months').endOf('month')
      const Term3_1 = moment(Term3).startOf('month')

      const diff1 = moment(Term1).diff(moment(Term1_1), 'days')+1
      const diff2 = moment(Term2).diff(moment(Term2_1), 'days')+1
      const diff3 = moment(Term3).diff(moment(Term3_1), 'days')+1
      const diff4 = 0

      this.setState({
        tableTitle: [
          Term3_1.format('YYYY.MM.DD')+'\n~'+Term3.format('YYYY.MM.DD'),
          Term2_1.format('YYYY.MM.DD')+'\n~'+Term2.format('YYYY.MM.DD'), 
          Term1_1.format('YYYY.MM.DD')+'\n~'+Term1.format('YYYY.MM.DD'), '-', '합계'],
        tableData: [
          [diff3, <TextInput value={this.state.term3BasePay} onChangeText={(term3BasePay) => this.setState({term3BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput11 = input; }} onSubmitEditing={() => { this.TextInput12.focus(); }} blurOnSubmit={false} style={styles.input} />, 
            <TextInput value={this.state.term3OtherAllowance} onChangeText={(term3OtherAllowance) => this.setState({term3OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput12 = input; }} onSubmitEditing={() => { this.TextInput13.focus(); }} blurOnSubmit={false} style={styles.input} />],
          [diff2, <TextInput value={this.state.term2BasePay} onChangeText={(term2BasePay) => this.setState({term2BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput13 = input; }} onSubmitEditing={() => { this.TextInput14.focus(); }} blurOnSubmit={false} style={styles.input} /> , 
            <TextInput value={this.state.term2OtherAllowance} onChangeText={(term2OtherAllowance) => this.setState({term2OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput14 = input; }} onSubmitEditing={() => { this.TextInput15.focus(); }} blurOnSubmit={false} style={styles.input} />],
          [diff1, <TextInput value={this.state.term1BasePay} onChangeText={(term1BasePay) => this.setState({term1BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput15 = input; }} onSubmitEditing={() => { this.TextInput16.focus(); }} blurOnSubmit={false} style={styles.input} />,
            <TextInput value={this.state.term1OtherAllowance} onChangeText={(term1OtherAllowance) => this.setState({term1OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput16 = input; }} style={styles.input} />],
          ['-', '-', '-'],
          [diff1+diff2+diff3, 
            parseInt(this.state.term3BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term1BasePay), 
            parseInt(this.state.term3OtherAllowance)+parseInt(this.state.term2OtherAllowance)+parseInt(this.state.term1OtherAllowance)]
        ],
        term4BasePay:0, term4OtherAllowance:0, diff4:0,        
        diff3Month:diff1+diff2+diff3+diff4
      })

    } else{
      const Term1 = moment(Leave)
      const Term1_1 = moment(Leave).startOf('month')
      const Term2 = moment(Leave).subtract(1,'months').endOf('month')
      const Term2_1 = moment(Term2).startOf('month')
      const Term3 = moment(Leave).subtract(2,'months').endOf('month')
      const Term3_1 = moment(Term3).startOf('month')
      const Term4= moment(Leave).subtract(3,'months').endOf('month')
      const Term4_1= moment(Leave).subtract(3,'month').add(1,'days')

      const diff1 = moment(Term1).diff(moment(Term1_1), 'days')+1
      const diff2 = moment(Term2).diff(moment(Term2_1), 'days')+1
      const diff3 = moment(Term3).diff(moment(Term3_1), 'days')+1
      const diff4 = moment(Term4).diff(moment(Term4_1), 'days')+1

      this.setState({
        tableTitle: [
          Term4_1.format('YYYY.MM.DD')+'\n~'+Term4.format('YYYY.MM.DD'), 
          Term3_1.format('YYYY.MM.DD')+'\n~'+Term3.format('YYYY.MM.DD'), 
          Term2_1.format('YYYY.MM.DD')+'\n~'+Term2.format('YYYY.MM.DD'), 
          Term1_1.format('YYYY.MM.DD')+'\n~'+Term1.format('YYYY.MM.DD'), '합계'],
        tableData: [
          [diff4, <TextInput value={this.state.term4BasePay} onChangeText={(term4BasePay) => this.setState({term4BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput11 = input; }} onSubmitEditing={() => { this.TextInput12.focus(); }} blurOnSubmit={false} style={styles.input} />, 
            <TextInput value={this.state.term4OtherAllowance} onChangeText={(term4OtherAllowance) => this.setState({term4OtherAllowance})} placeholder={'200000'} ref={(input) => { this.TextInput12 = input; }} onSubmitEditing={() => { this.TextInput13.focus(); }} blurOnSubmit={false} style={styles.input} />],
          [diff3, <TextInput value={this.state.term3BasePay} onChangeText={(term3BasePay) => this.setState({term3BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput13 = input; }} onSubmitEditing={() => { this.TextInput14.focus(); }} blurOnSubmit={false} style={styles.input} />, 
            <TextInput value={this.state.term3OtherAllowance} onChangeText={(term3OtherAllowance) => this.setState({term3OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput14 = input; }} onSubmitEditing={() => { this.TextInput15.focus(); }} blurOnSubmit={false} style={styles.input} />],
          [diff2, <TextInput value={this.state.term2BasePay} onChangeText={(term2BasePay) => this.setState({term2BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput15 = input; }} onSubmitEditing={() => { this.TextInput16.focus(); }} blurOnSubmit={false} style={styles.input} /> , 
            <TextInput value={this.state.term2OtherAllowance} onChangeText={(term2OtherAllowance) => this.setState({term2OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput16 = input; }} onSubmitEditing={() => { this.TextInput17.focus(); }} blurOnSubmit={false} style={styles.input} />],
          [diff1, <TextInput value={this.state.term1BasePay} onChangeText={(term1BasePay) => this.setState({term1BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput17 = input; }} onSubmitEditing={() => { this.TextInput18.focus(); }} blurOnSubmit={false} style={styles.input} />,
            <TextInput value={this.state.term1OtherAllowance} onChangeText={(term1OtherAllowance) => this.setState({term1OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput18 = input; }} style={styles.input} />],
          [diff1+diff2+diff3+diff4,
            parseInt(this.state.term4BasePay)+parseInt(this.state.term3BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term1BasePay), 
            parseInt(this.state.term4OtherAllowance)+parseInt(this.state.term3OtherAllowance)+parseInt(this.state.term2OtherAllowance)+parseInt(this.state.term1OtherAllowance)]
        ],        
        diff3Month:diff1+diff2+diff3+diff4})
    }

    this.setState({
      NumberOfWorkingDays:diff,
      EnteringDate:moment(Join).format('YYYY년 MM월 DD일'),//Join,
      DateOfResignation:moment(Leave).format('YYYY년 MM월 DD일'), //Leave
    });
  }

  resetData(){
    this.setState({
      tableTitle: ['기간1', '기간2', '기간3', '기간4','합계'],
      tableData: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ],
      AverageDailyWage:0, SeverancePay:0,
      JoinYear:0, JoinMonth:0, JoinDay:0, 
      LeaveYear:0, LeaveMonth:0, LeaveDay:0, 
      NumberOfWorkingDays:0, 
      AnnualBonus:0, // 연간상여금
      AnnualAllowance:0, //연차수당
      term4OtherAllowance:0,term3OtherAllowance:0,term2OtherAllowance:0,term1OtherAllowance:0,
      term4BasePay:0,term3BasePay:0,term2BasePay:0,term1BasePay:0,
    })
  }

  SeverancePayCalculation(){
    const sumTermBasePay = parseInt(this.state.term1BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term3BasePay)+parseInt(this.state.term4BasePay)
    const sumTermOtherAllowance = parseInt(this.state.term1OtherAllowance)+parseInt(this.state.term2OtherAllowance)+parseInt(this.state.term3OtherAllowance)+parseInt(this.state.term4OtherAllowance)
    const TotalWage3Month = sumTermBasePay + sumTermOtherAllowance //A:3개월 간 임금총액=기본급 + 기타수당

    const AnnualBonus1 = this.state.AnnualBonus*3/12 //B:상여금가산액=연간상여금*(3개월/12개월)
    const AnnualAllowance1 = (this.state.AnnualAllowance)*3/12 //C:연차수당가산액=(연차수당(연차수당지급액*5일))*(3개월/12개월)
    
    const AverageDailyWage1= ((TotalWage3Month+AnnualBonus1+AnnualAllowance1)/this.state.diff3Month).toFixed(2)//1일평균임금=3개월지급총액(A+B+C)/3개월 총 일수
    const SeverancePay1 = (AverageDailyWage1*30*(this.state.NumberOfWorkingDays/365)).toFixed(2) //퇴직금=1일평균임금*30일*(재직일수/365)
    
    this.setState({
      AverageDailyWage:parseInt(AverageDailyWage1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      SeverancePay:parseInt(SeverancePay1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['기간', '기간별일수', '기본급', '기타수당'],
      tableTitle: ['기간1', '기간2', '기간3', '기간4','합계'],
      tableData: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    }
  }

  render(){
    const state = this.state;
    const{JoinYear, JoinMonth, JoinDay, LeaveYear, LeaveMonth, LeaveDay, AnnualBonus, AnnualAllowance, SeverancePay, AverageDailyWage} = this.state
    
    return(
      <View style={styles.container}>
        <ScrollView>
          <Text>퇴직금 계산하기</Text>
          <View style={styles.rowView}>
            <Text style={styles.textMargin}>입사일자 :   </Text>
            <TextInput
              value={this.state.JoinYear}
              onChangeText={(JoinYear) => this.setState({JoinYear})}
              autoFocus={true}
              onSubmitEditing={() => { this.TextInput1.focus(); }}
              blurOnSubmit={false}
              placeholder={'2015'}
              style={styles.input}
            />
            <Text style={styles.textMargin}>년 </Text>
            <TextInput
              value={this.state.JoinMonth}
              onChangeText={(JoinMonth) => this.setState({JoinMonth})}
              ref={(input) => { this.TextInput1 = input; }}
              onSubmitEditing={() => { this.TextInput2.focus(); }}
              blurOnSubmit={false}
              placeholder={'5'}
              style={styles.input}
            />
            <Text style={styles.textMargin}>월 </Text>
            <TextInput
              value={this.state.JoinDay}
              onChangeText={(JoinDay) => this.setState({JoinDay})}
              ref={(input) => { this.TextInput2= input; }}
              onSubmitEditing={() => { this.TextInput3.focus(); }}
              blurOnSubmit={false}
              placeholder={'25'}
              style={styles.input}
            />
            <Text style={styles.textMargin}>일 </Text>
          </View>

          <View style={styles.rowView}>
            <Text style={styles.textMargin}>퇴직일자 :    </Text>
            <TextInput
              value={this.state.LeaveYear}
              onChangeText={(LeaveYear) => this.setState({LeaveYear})}
              ref={(input) => { this.TextInput3 = input; }}
              onSubmitEditing={() => { this.TextInput4.focus(); }}
              blurOnSubmit={false}
              placeholder={'2020'}
              style={styles.input}
            />
            <Text style={styles.textMargin}>년 </Text>
            <TextInput
              value={this.state.LeaveMonth}
              onChangeText={(LeaveMonth) => this.setState({LeaveMonth})}
              ref={(input) => { this.TextInput4 = input; }}
              onSubmitEditing={() => { this.TextInput5.focus(); }}
              blurOnSubmit={false}
              placeholder={'10'}
              style={styles.input}
            />
            <Text style={styles.textMargin}>월 </Text>
            <TextInput
              value={this.state.LeaveDay}
              onChangeText={(LeaveDay) => this.setState({LeaveDay})}
              ref={(input) => { this.TextInput5 = input; }}
              placeholder={'10'}
              style={styles.input}
            />
            <Text style={styles.textMargin}>일 </Text>
          </View>
          
          <Button
            title="평균임금계산 기간보기"
            onPress={()=>{this.updateState()}}/>

          <View style={styles.marginTop}>
            {/* <Text>입사일자 : {this.state.EnteringDate}</Text>
            <Text>퇴사일자 : {this.state.DateOfResignation}</Text>  */}
            <Text style={styles.textMargin}>재직일수 : {this.state.NumberOfWorkingDays}일</Text>
            <View style={styles.rowView}>
              <Text style={styles.textMargin}>연간상여금 총액 : </Text>
              <TextInput
                value={this.state.AnnualBonus}
                onChangeText={(AnnualBonus) => this.setState({AnnualBonus})}
                onSubmitEditing={() => { this.TextInput10.focus(); }}
                blurOnSubmit={false}
                placeholder={'연간상여금 총액'}
                style={styles.input}
              />
              <Text style={styles.textMargin}> 원</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.textMargin}>연차수당 : </Text>
              <TextInput
                value={this.state.AnnualAllowance}
                onChangeText={(AnnualAllowance) => this.setState({AnnualAllowance})}
                ref={(input) => { this.TextInput10 = input; }}
                onSubmitEditing={() => { this.TextInput11.focus(); }}
                blurOnSubmit={false}
                placeholder={'연차수당'}
                style={styles.input}
              />
              <Text style={styles.textMargin}> 원</Text>
            </View>
          </View>

          <Table borderStyle={{borderWidth: 1}}>
            <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
            <TableWrapper style={styles.wrapper}>
              <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
              <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
          </Table>
          
          <View style={styles.marginTop}>
            <Button
              title="기본급/기타수당 입력하기"
              onPress={()=>{this.updateState()}}/>
            <Button
                title="초기화"
                color="#FF3232"
                onPress={()=>{this.resetData()}}/> 
          </View>

          <View style={styles.marginTop}>
            <Button
                title="퇴직금 계산하기"
                onPress={()=>{this.SeverancePayCalculation()}}/> 
            
            <Text style={styles.textMargin}>1일평균임금 : {AverageDailyWage} 원</Text>    
            <Text style={styles.textMargin}>퇴직금 : {SeverancePay} 원</Text>
            <Text style={styles.textMargin}>* 회사 내규 등에따라 실제 지급액과가 차이가 있을 수 있습니다.</Text>
          </View>
        </ScrollView>    
      </View>
    )
  }
  
}
  
  export default CalculatingScreen2;
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    rowView: { flexDirection: 'row' },
    marginTop : {marginTop:10},
    wrapper: { flexDirection: 'row' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28 },
    text: { textAlign: 'center' },
    textMargin:{marginTop:5, marginLeft:5, marginRight:5}
  });
  