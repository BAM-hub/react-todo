import propTypes from 'prop-types';
import Button from './Button';

const Header = ({title, onAdd, showAdd}) =>{
    return(
        <div className="header">
            <h1>{title}</h1>
            <Button  onClick={onAdd} color={showAdd?'white': 'skyblue'}
             text={showAdd ?'Close' : 'Add'}/>
        </div>
    );
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: propTypes.string,
}

export default Header;