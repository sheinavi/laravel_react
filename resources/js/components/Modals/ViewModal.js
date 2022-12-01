import axios from 'axios';
import React, {Component} from 'react';


class ViewModal extends Component {

    constructor(props){
        super(props);
    }


    render(){
        return (
            <div className="modal fade" id={"viewModal"+this.props.modalId} tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="viewModalLabel">Employee Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    <p>NAME  : {this.props.employeeData.currentName}</p>
                    <p>Salary  : {this.props.employeeData.currentSalary}</p>

                </div>
                
                </div>
            </div>
            </div>
        );
    };

}

export default ViewModal;