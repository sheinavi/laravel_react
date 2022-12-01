import axios from 'axios';
import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DeleteModal extends Component {

    constructor(props){
        super(props);
    }

    deleteEmployee = () => {
        let self = this;

        axios.delete('/api/employees/'+this.props.modalId).then( (response) => {
            console.log(response.data.success);
            if(response.data.success){
                toast.error(self.props.employeeData.currentName+' has been deleted.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }else{
                toast.error('SOMETHING WENT WRONG', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        });
    }

    render(){
        return (
            <div className="modal fade" id={"deleteModal"+this.props.modalId} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Delete Employee</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                
                                <h1>Are you sure you want to delete {this.props.employeeData.currentName} ? </h1>

                            </div>
                            <div className='modal-footer'>
                                
                                <button className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                                <button className='btn btn-danger' onClick={ () => this.deleteEmployee() }>DELETE</button>

                            </div>
                        </div>
                    </div>

                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
            </div>
        );
    };

}

export default DeleteModal;