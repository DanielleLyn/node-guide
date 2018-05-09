import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      array: '',
      new: '',
      old: '',
      add: '',
      deleteVal: ''
    }
}

componentDidMount(){

  // axios get request for getting info from server
  axios.get('/api/get_endpoint').then(array => {
      console.log(array.data);
      this.setState({
        array: array.data
      })
  })
}

// event handler for update add input
addHandler = (add) => {
  this.setState({
    add: add
  })
}

// event handler for update old input
oldHandler = (old) => {
  this.setState({
    old: old
  })
}

// event handler for update new input
newHandler = (newVal) => {
  this.setState({
    new: newVal
  })
}

// event handler for delete input
deleteHandler = (deleteVal) => {
  this.setState({
    deleteVal: deleteVal
  })
}

 post = () => {
   //axios post request for setting a new value
   axios.post('/api/post_endpoint', {val: this.state.add}).then(updatedArray => {

    console.log(updatedArray);

     this.setState({
       array: updatedArray.data,
       add: ''
     })
   })
 }

 put = () => {
   // put request for updating values
    axios.put('/api/put_endpoint', {new: this.state.new, old: this.state.old}).then(updatePutArray => {
      this.setState({
        array: updatePutArray.data,
        new: '',
        old: ''
      })
    })
 }

 delete = () => {
    axios.delete(`/api/delete_endpoint?delete_value=${this.state.deleteVal}`).then(updatedDeletedArray => {
      this.setState({
        array: updatedDeletedArray.data,
        deleteVal: ''
      })
    })
 }

  render() {
    
    return (
      <div className="App">
        <div>
            
            <div className='array-container'>
              <h1>
                Get
              </h1>
              <h2>
                (In Component Did Mount)
              </h2>
              <span>{this.state.array ? JSON.stringify(this.state.array) : 'Loading...'}</span>
            </div>

            <div className='options-container'>

              <div className='add'>
                <h1>
                  Add
                </h1>
                  <input placeholder='add value' onChange={(e) => this.addHandler(e.target.value)} value={this.state.add}/>

                <div className='button-container'>
                  <button onClick={this.post}>Add To Me</button>
                </div>

              </div>

              <div className='update'>
                <h1>
                  update
                </h1>
                  <div>
                      <input placeholder='old value' onChange={(e) => this.oldHandler(e.target.value)} value={this.state.old}/>
                      <input placeholder='new value' onChange={(e) => this.newHandler(e.target.value)} value={this.state.new}/>
                  </div>

                  <div className='button-container'>
                      <button onClick={this.put}>Update Me</button>
                  </div> 

              </div>
            
              <div className='delete'>
                <h1>
                  delete
                </h1>
                <input placeholder='delete value' onChange={(e) => this.deleteHandler(e.target.value)} value={this.state.deleteVal}/>

                <div className='button-container'>
                    <button onClick={this.delete}>Delete Me</button>
                </div>

              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
