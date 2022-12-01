import axios from 'axios';
import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class UpdateModal extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentName: null,
            currentSalary: null
        }
    }

    static getDerivedStateFromProps(props,current_state) {
       let employeeUpdate = {
        currentName: null,
        currentSalary: null
       }

       //updating state from input
       if(current_state.currentName && (current_state.currentName !== props.employeeData.currentName)){
        return null;
       }

       //updating state from props
       if(current_state.currentName !== props.employeeData.currentName ||
         current_state.currentName === props.employeeData.currentName
        ){
          employeeUpdate.currentName = props.employeeData.currentName;
       }
       
       if(current_state.currentSalary !== props.employeeData.currentSalary || 
        current_state.currentSalary === props.employeeData.currentSalary ){
          employeeUpdate.currentSalary = props.employeeData.currentSalary;
       }

       //console.log(props.employeeData);
       return employeeUpdate;

    }

    updateEmployeeName = (event) => {
        this.setState({
            currentName: event.target.value
        });
    }

    updateSalary = (event) => {
        this.setState({
            currentSalary: event.target.value
        });
    }

    saveUpdate(){
        let self = this;
        axios.put('/api/employees/'+this.props.modalId,
            { 
                id: this.props.modalId,
                name: this.state.currentName,
                salary: this.state.currentSalary
            }).then( (response) => {
                if(response.data.success){
                    
                    toast("Update successful");    
                    this.props.closeModal(self.props.modalId);
                }else{
                    alert("An error occurred.");
                }
                
            });
    }

    render(){
        return (
            <div> 
                <div className="modal" id={"updateModal"+this.props.modalId} tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateModalLabel">Update Employee Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                        <div className="form-group">
                            <label>Employee Name</label>
                            <input className="form-control" type="text" 
                                value={this.state.currentName ?? ""}
                                onChange = {this.updateEmployeeName}
                                id="currentName"
                            />

                        </div>

                        <div className="form-group">
                            <label>Salary</label>
                            <input className="form-control" type="text" 
                                value={this.state.currentSalary ?? ""}
                                id="currentSalary"
                                onChange = {this.updateSalary}
                            />
                        </div>
                        
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-primary"
                            onClick={ () => {this.saveUpdate()} }
                        >Update</button>
                        <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    
                    </div>
                </div>

                
                
                </div>

                <ToastContainer />
            </div>
        );
    };

}

export default UpdateModal;