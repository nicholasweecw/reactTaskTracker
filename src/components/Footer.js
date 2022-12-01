// To prevent reloading when changing between about and main pages
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      <Link to='/about'>About</Link>
    </footer>
  )
}

export default Footer
