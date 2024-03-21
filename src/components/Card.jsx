import { MdOutlineSubject } from "react-icons/md";
import '../styles/card.css';

const Card = ({title, color}) => {
  return (
    <div className="card">
        <div style={{backgroundColor: color}}></div>
        <p>{title}</p>
        <MdOutlineSubject />
    </div>
  )
}

export default Card