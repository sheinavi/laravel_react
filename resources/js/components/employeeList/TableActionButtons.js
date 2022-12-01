import axios from 'axios';
import React, {Component} from 'react';
import ViewModal from '../Modals/ViewModal';
import UpdateModal from '../Modals/UpdateModal';
import DeleteModal from '../Modals/DeleteModal';


class TableActionButtons extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentName : null,
            currentSalary : null
        };
    }


    getEmployeeDetails = (id) => {
        let self = this;
        axios.get('/api/employees/'+id).then( (response) => {
            //console.log(response.data.name);
            self.setState({
                currentName: response.data.name,
                currentSalary: response.data.salary
            });
        });
    }
    
   

    render(){
        return (
            <div>

                <button className="btn btn-outline-info mx-1"
                        data-bs-toggle="modal"
                        data-bs-target={"#viewModal"+this.props.eachRowId}
                        onClick={ () => { this.getEmployeeDetails( this.props.eachRowId ) } }
                    >View</button>
                
                 
                <button className="btn btn-outline-secondary mx-1"
                    data-bs-toggle="modal"
                    data-bs-target={"#updateModal"+this.props.eachRowId}
                    onClick={ () => { this.getEmployeeDetails( this.props.eachRowId ) } }
                >Edit</button>

                
                <button className="btn btn-outline-danger mx-1"
                    data-bs-toggle="modal"
                    data-bs-target={"#deleteModal"+this.props.eachRowId}
                    onClick={ () => { this.getEmployeeDetails( this.props.eachRowId ) } }
                >Delete</button>

                <UpdateModal modalId={this.props.eachRowId} employeeData = {this.state} closeModal={ () => this.props.contentChanged() } />
                <ViewModal modalId={this.props.eachRowId} employeeData = {this.state} />
                <DeleteModal modalId={this.props.eachRowId} employeeData = {this.state} />
               
            </div>
        );
    };

}

export default TableActionButtons;