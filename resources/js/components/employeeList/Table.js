import axios from 'axios';
import React, {Component} from 'react';
import TableRow from './TableRow';
import Pagination from './Pagination';
import CreateEmployee from './CreateEmployee';
import * as bootstrap from 'bootstrap';
window.Modal = bootstrap.Modal;

class Table extends Component {

    constructor(props){
        super(props);

        this.state = {
            employees: [],
            currentPage: 1,
            lastPage: 10
        }

        
    }

    //Life cycle method
    componentDidMount(){
        this.getEmployeeList();
    }

    getEmployeeList = () => {
        let self = this;
        axios.get('/api/employees?page='+this.state.currentPage).then(function(response){
            //console.log(response.data.data);
            self.setState({
                employees: response.data.data,
                currentPage: response.data.current_page,
                lastPage: response.data.last_page
            });
        });
    }

    reloadContent = (page) => {
        this.setState({
            currentPage: page
        },() => {
            
            this.getEmployeeList();
        });
        
    }

    render()  { 
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                
                                <CreateEmployee createdEmployee={this.getEmployeeList} />

                                <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Salary</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.employees.map(function (x,i){
                                                return <TableRow key={i} data={x} reloadContent={this.getEmployeeList} />
                                            },this)}
                                            
                                        </tbody>
                                </table>

                                <Pagination currentPage={ this.state.currentPage } lastPage={this.state.lastPage} onChange={this.reloadContent} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Table;