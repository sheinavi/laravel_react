import React, {Component} from 'react';

class Pagination extends Component{
    constructor(props){
        super(props);

        this.state = {
            currentPage : props.currentPage
        };
    }

    resetContent = (page) => {

        this.setState({
            currentPage : page
        }, () => {
            this.props.onChange(this.state.currentPage);
        });
    }

    render(){
        
        return (
            <div className="d-flex justify-content-end"> 
                 {Array(this.props.lastPage).fill(null).map((value, index) => (
                        
                        <button className={this.state.currentPage == index+1 ? 'btn btn-primary mx-1' : 'btn btn-outline-primary mx-1'} onClick={() => this.resetContent(index+1)} key={index+1}> {index+1} </button>
                    ))}
            </div>
        );
    }
}

export default Pagination;