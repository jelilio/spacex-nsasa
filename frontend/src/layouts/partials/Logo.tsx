import { NavLink } from 'react-router-dom';
import logo from '../../assets/react.svg';

export default function Logo() {
  return (
    <NavLink to="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Your Company</span>
      <img className="w-aut h-8" src={logo} alt="" />
    </NavLink>
  );
}
