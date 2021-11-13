import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

class Index extends React.Component {

    constructor(props){
        super(props);
        this.state={
            id:0,
            name:'',
            email:'',
            posts:[]
        }
    }
    componentDidMount(){
        this.getAll();
    }
    getAll(){
        Axios.get(`http://127.0.0.1:8000/api`)
        .then((res)=>{
            this.setState({
                posts:res.data,
                id:0,
                name:'',
                email:'',
            })
        })
    }
    getOne(post){
        this.setState({
            id:post.id,
            name:post.name,
            email:post.email
        })
    }
    delete(id){
        Axios.delete(`http://127.0.0.1:8000/api/${id}`)
        .then((res)=>{
           this.getAll();
        })
    }
    submit(event,id){
        event.preventDefault();
        if(this.state.id == 0){
            Axios.post(`http://127.0.0.1:8000/api`,{name:this.state.name,email:this.state.email})
            .then((res)=>{
               this.getAll();
            })
        }else{
        Axios.put(`http://127.0.0.1:8000/api/${id}`,{name:this.state.name,email:this.state.email})
        .then((res)=>{
           this.getAll();
        })
    }

    }
    namechange(event)
    {
        this.setState({
            name:event.target.value
        })
    }
    emailchange(event)
    {
        this.setState({
            email:event.target.value
        })
    }
    render(){
    return (
        <div className="container">
            <br />
            <div className="row">
                <form onSubmit={(e)=>this.submit(e,this.state.id)}>
                    <div className="input-field col s4">
                        <i className="material-icons prefix">input</i>
                        <input onChange={(e)=>this.namechange(e)} value={this.state.name}/>
                    </div>
                    <div className="input-field col s4">
                        <i className="material-icons prefix">content_paste</i>
                        <input onChange={(e)=>this.emailchange(e)} value={this.state.email}/>
                    </div>
                    <div className="col s4">
                        <button type="submit" className="waves-effect waves-light btn">Save</button>
                    </div>
                </form>
                <br />
                <table>
                    <tbody>
                    <tr>

                        <td>Name</td>
                        <td>Email</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                    {this.state.posts.map(post=>
                        <tr key={post.id}>
                        <td>{post.name}</td>
                        <td>{post.email}</td>
                        <td>
                            <button onClick={(e)=>this.getOne(post)} className="waves-effect waves-light btn">
                            <i className="material-icons prefix">create</i>
                            </button>
                        </td>
                        <td>
                        <button onClick={(e)=>this.delete(post.id)} className="waves-effect waves-light btn">
                        <i className="material-icons prefix">delete</i>
                        </button>
                        </td>
                    </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
}
export default Index;

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}