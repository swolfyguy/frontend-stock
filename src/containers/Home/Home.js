import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

constructor(props){
super(props)
  this.state={
    items:{},
    isLoaded:false
  }

  
}

async componentDidMount() {
  try {
      const res = await fetch("https://flaskstockapi.herokuapp.com/api/profit");
      const data = await res.json();
      this.setState({
        isLoaded:true,
        items:data
      })
      console.log("data printingn",data);
  } catch(e) {
      console.error(e);
  }
}


  render() {
    var {isLoaded } =  this.state;
    const data = this.state.items
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
      const display = data.map((d, key) => {
        return (
            
            <tr key={key}>
              <th scope="row">{d.id}</th>
              <th scope="row">{d.name}</th>
               
               <td  >{d.completed.trades}</td>
               <td  >{numberFormat(d.completed.profit)}</td>

               <td  >{d.on_going.trades}</td>
               <td  >{numberFormat(d.on_going.profit)}</td>

               <td  >{d.total.trades}</td>
               <td >{numberFormat(d.total.profit)}</td>
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
                  <th >stock_id</th>
                  <th >stock_name</th>

                  <th >completed_trades</th>
                  <th >completed_profits</th>
                 
                  <th >on_going_trades</th>
                  <th >on_going_profit</th>
                  
                  <th >total_trades</th>
                  <th >total_profits</th>

                </tr>
              </thead>
              <tbody class ="table table-dark">{display}</tbody>
            </table>
            
          </div>
        );
    }
     
      
     
    
  }
}

export default Home;
