import React , { Component } from 'react';
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [
        { name: 'None', id: 1 },
      ]
    };
  }
  async componentDidMount() {
    try {
        const res = await fetch("https://flaskstockapi.herokuapp.com/api/nfo?fields[nfo]=id,strategy_name");
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
    const optionTemplate = this.state.values.map(v => (
      <option value={v.id}>{v.name}</option>
    ));

    return (
      <label>
        Pick your favorite Number:
        <select value={this.state.value} onChange={this.handleChange}>
          {optionTemplate}
        </select>
      </label>
    );
  }
}
export default Options