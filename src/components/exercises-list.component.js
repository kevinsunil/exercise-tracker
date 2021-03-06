import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Exercise = props =>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="/" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component{
    constructor(props){
        super(props);

        this.deleteExercise= this.deleteExercise.bind(this);

        this.state= {exercises:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
        .then(res => {
            this.setState({exercises: res.data})
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res => console.log(res));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciselist(){
        return this.state.exercises.map(currentexercise =>  {
            return <Exercise exercise= {currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render(){
        return(
            <div>
                <h3>Workout Log</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciselist()}
                    </tbody>
                </table>
            </div>
        )
    }
}