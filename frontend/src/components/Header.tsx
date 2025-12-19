import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-blue-800 py-6">
            <div className="px-4 py-0 sm:container mx-auto flex flex-col gap-2 sm:gap-0 sm:flex-row items-center sm:justify-between">
                <div className='flex justify-between items-center w-full'>
                    <Link to="/" className='text-2xl sm:text-3xl text-white font-bold'>Holidays.com</Link>
                    {!isLoggedIn && (
                        <Link to="/sign-in" className="sm:hidden bg-white text-blue-600 m-0 hover:bg-gray-100 rounded-[1rem] p-2 text-[1rem] font-bold"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
                <div className="flex gap-3 sm:justify-end w-full">
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
                        <Link to="/sign-in" className="hidden sm:flex bg-white items-center text-blue-600 p-2 m-0 font-bold hover:bg-gray-100 rounded-[1rem]"
                        >
                        Sign in
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Header;
