import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

constructor(props){
super(props)
  this.state={
    items:{},
    isLoaded:false,
    total_profit: {
      id:0,
      name:""
    }
  }

  
}


async componentDidMount() {
  try {
      const res = await fetch("https://flaskstockapi.herokuapp.com/api/profit");
      const till_yesterday_profit = await fetch("https://flaskstockapi.herokuapp.com/api/till_yesterdays_profit?filter[date]=${yesterday}")
      const data = await res.json();
      const profit = await till_yesterday_profit.json();
      this.setState({
        isLoaded:true,
        items:data,
        yesterday_profit: profit.data
      })
      console.log("data printingn",profit.data);
  } catch(e) {
      console.error(e);
  }
}


  render() {
    
    var {isLoaded } =  this.state;
    // const sort_yesterday_profit= (till_yesterday) =>{
    //   var d ={}
    //   console.log("datt",till_yesterday)
    //   till_yesterday.map(element => {
    //     var id = element.attributes.strategy_id
    //     d[id] = element.attributes.profit
    //   });
    //   return d
    //   console.log("hello")
    // }
    const data = this.state.items.data
    const meta = this.state.items.meta
    const p_f = this.state.yesterday_profit
    
    var y_profit={}
    if(p_f){
      p_f.map(element => {
        y_profit[element.attributes.strategy_id] = element.attributes.profit
      });
    }
    console.log("datt",y_profit[1])
    var ruppe_number = ""
    const numberFormat=(value) => {
      ruppe_number =  new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(value).split('.')[0];

      if(ruppe_number[0]=="-" ){
        return ruppe_number.slice(0,1) + ruppe_number.slice(2)
      }
      else{
        return ruppe_number.slice(1)
      }
    }

    if (!isLoaded){
      return <div class="loading">
      Data is Loading Please Wait .....
      <button onClick={() => window.location.reload(false)}>Click to reload again</button>
      </div>
    }
    else{
      
      const rowColor = (value) => {
      if (parseInt(value) >= 0 || value == "buy") {
         return 'green';
      } else {
         return 'red';
      }
   }

      const display = data.map((d, key) => {
        return (
            
            <tr  key={key} >
              <th >{d.id}</th>
              <th>{d.name}</th>
               <td className={rowColor(d.completed.profit)} >{numberFormat(d.completed.profit)} </td>
               <td className={rowColor(d.on_going.profit)} >{numberFormat(d.on_going.profit)} / {d.on_going.trades}</td>
               <td className={rowColor(d.on_going.action)}>{d.on_going.action.toUpperCase()}</td>
               
               <td className={rowColor(d.total.profit - y_profit[d.id])}> {numberFormat(d.total.profit - (y_profit[d.id]=y_profit[d.id] || 0))}</td>
               <td className={rowColor(d.total.profit)} >{numberFormat(d.total.profit)} / {d.total.trades}</td>
            </tr>

          );
        });
      
        return(
          <div>
            <div class="loading">
              <button onClick={() => window.location.reload(false)}>Click to reload!</button>
            </div>
            
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th >strategy_id</th>
                  <th >stock_name</th>
                  <th >completed_profit</th>
                  <th >on_going_profit</th>
                  <th >action</th>
                  
                  <th >todays_profit</th>
                  <th >total_profit</th>

                </tr>
              </thead>
              <tbody class ="table">{display}</tbody>
              <thead >
                <tr>
                  <th ></th>
                  <th >Total Profit: </th>
                  <th className={rowColor(meta.total_completed_profits)} >{numberFormat(meta.total_completed_profits)}</th>
                  <th className={rowColor(meta.total_ongoing_profits)} >{numberFormat(meta.total_ongoing_profits)}</th>
                  <th ></th>
                  <th ></th>
                  <th className={rowColor(meta.total_profits)} >{numberFormat(meta.total_profits)}</th>

                </tr>
              </thead>
            </table>
            
          </div>
        );
    }
     
      
     
    
  }
}

export default Home;
