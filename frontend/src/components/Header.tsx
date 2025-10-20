import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex flex-col gap-2 sm:flex-row items-center sm:justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Holidays.com</Link>
                </span>
                <span className="flex gap-3">
                    {isLoggedIn ? (
                        <>
                            <Link className="flex items-center text-white m-0 p-2 font-bold hover:bg-blue-600 rounded-[1rem]"
                              to="/my-bookings"
                            >
                                My Bookings
                            </Link>
                            <Link className="flex items-center text-white m-0 p-2 font-bold hover:bg-blue-600 rounded-[1rem]"
                              to="/my-hotels"
                            >
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link to="/sign-in" className="flex bg-white items-center text-blue-600 p-2 m-0 font-bold hover:bg-gray-100 rounded-[1rem]"
                        >
                        Sign in
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
