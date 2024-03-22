import { MdOutlineSubject } from "react-icons/md";
import '../styles/card.css';
import { FaRegComment } from "react-icons/fa";

const Card = ({title, color}) => {
  return (
    <div className="card">
        <div style={{backgroundColor: color}}></div>
        <p>{title}</p>
        <div>

        <MdOutlineSubject />
        <FaRegComment />
        </div>
    </div>
  )
}

export default Card


