import PropTypes from "prop-types";
// To look at the route we are currently on
import { useLocation } from 'react-router-dom'
import Button from "./Button";

// Takes in objects with titles
const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()
  
  // location.pathname...: To remove add button in about page
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

// Props: Properties
Header.defaultProps = {
  title: "Task Tracker",
};

// propTypes: To ensure properties are correct type
// (Ensures title is a string, not anything else)
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

export default Header;
