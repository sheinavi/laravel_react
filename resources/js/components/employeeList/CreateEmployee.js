import axios from 'axios';
import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateEmployee extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: null,
            salary: null
        };
    }

    updateName = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    updateSalary = (event) => {
        this.setState({
            salary: event.target.value
        });
    }

    saveEmployee = () => { 

        let self = this;
        
        console.log([this.state.name,this.state.salary]);

        axios.post('/api/employees',{
            name: this.state.name,
            salary: this.state.salary
        }).then( (response) => {
            if(response.data.success){
                toast('Saved!');
                self.props.createdEmployee();
            }else{
                toast.error('OH NO!');
            }
        });

        this.setState({
            salary: null,
            name: null
        });

    }

    render(){
        return (
            <div className='row g-3'>
                <ToastContainer />
                <div className='col'>
                    <input type="text" value={this.state.name ?? ''} className="form-control g-3"
                                onChange={this.updateName}
                                placeholder="Employee Name" />
                </div>

                <div className='col'>
                    <input type="number" value={this.state.salary ?? ''} 
                        onChange={this.updateSalary}
                        placeholder="Salary" className="form-control g-3" />
                </div>

                <div className='col d-grid'>
                    <button className='btn btn-primary' onClick={this.saveEmployee} >Save</button>
                </div>
            </div>
        )
    };
}

export default CreateEmployee;