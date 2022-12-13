import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      <Link to="/about">Go to about</Link>
    </footer>
  )
}

export default Footer