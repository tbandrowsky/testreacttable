import React from 'react';
import './App.css';

export default class TableButton extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            rows: [ 
                { id:1, text:"one", clicked:0},
                { id:2, text:"two", clicked:0},
                { id:3, text:"three", clicked:0},
            ],
            id:4,
            lastClicked:"Nothing"
        }
    }

    onCountClicked=(evt, idx, val)=>
    {
        console.log( 'clicked row:' + idx);
        console.log(evt);
        this.state.rows[idx].clicked++;
        this.setState( { lastClicked : val, rows: this.state.rows } );
    }

    onDeleteClicked=(evt, idx, val)=>
    {
        console.log( 'delete row:' + idx);
        console.log(evt);
        this.state.rows.splice(idx,1);
        this.setState( { lastClicked : val, rows: this.state.rows } );
    }

    onEditRow=(evt, idx)=>
    {
        console.log( 'update row:' + idx);
        console.log(evt);
        this.state.rows[idx].text=evt.target.value;
        this.setState( { lastClicked : evt.target.value, rows: this.state.rows } );
    }

    onAddClicked=(evt)=>
    {
        console.log( 'add row:');
        console.log(evt);
        this.state.rows.push( { id:this.state.id, text:"edit", clicked:0});
        this.setState( { rows: this.state.rows } );
    }

    render() {
      return (        
        <div>
            <h2>Edit the table</h2>
          <table>
              <tr><th>Id</th><th>Text</th><th>Clicked</th><th>Button</th></tr>
              { 
              this.state.rows.map(
                  (val, idx)=> {
                  return (
                    <tr key={idx}>
                        <td>{val.id}</td>
                        <td><input type="text" value={val.text} onChange={ (evt)=>{this.onEditRow(evt,idx)} }/></td>
                        <td>{val.clicked}</td>
                        <td><input type="button" value={val.text} id={"button"+idx} onClick={(evt)=>{this.onCountClicked(evt, idx, val.text);}}/></td>
                        <td><input type="button" value={"delete"} id={"dbutton"+idx} onClick={(evt)=>{this.onDeleteClicked(evt, idx, val.text);}}/></td>
                    </tr> );
                })
            }
          </table>
          <h3>The last button clicked was {this.state.lastClicked}</h3>
          <h3>Add a row 
              <input type="button" value={"Add"} id={"addbutton"} onClick={(evt)=>{this.onAddClicked(evt);}}/></h3>
        </div>
      );
    }
}

