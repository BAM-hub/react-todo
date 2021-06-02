import {FaTimes} from 'react-icons/fa';
const Task = ({task, onDelete, onToggle}) => {
    return(
        <div className={`task ${task.reminder ? 
           'reminder' : ' ' }`} onDoubleClick={()=>
        onToggle(task.id)} >
            <div className="text">
                <h3>{task.text} <FaTimes style={{
                    color: 'red', cursor: 'pointer'
                    }} onClick={()=>onDelete(task.id)} />
                </h3>
            </div>
            <div className="day">
                <p>{task.day}</p> 
            </div>
            
        </div>
    );
}

export default Task;