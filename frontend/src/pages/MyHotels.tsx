import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";


const MyHotels = () => {
    const { data: hotelData } = useQuery(
        "fetchMyHotels", 
        apiClient.fetchMyHotels, 
        {
            onError: ()=>{},
        }
    );

    if(!hotelData){
        return <span>No Hotels found</span>;
    }

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link 
                    to="/add-hotel" 
                    className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                    style={{borderRadius: "1rem"}}

                >
                    Add Hotel
                </Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {hotelData.map((hotel, index) => (
                    <div key={index} className="flex flex-col justify-between border border-slate-300 rounded-[1rem] p-8 gap-5">
                        <h2 className="text-2xl font-bold">{hotel.name}</h2> 
                        <div className="whitespace-pre-line">{hotel.description}</div>
                        <div className="flex overflow-x-auto gap-4">
                            <div className="border border-slate-300 rounded-[1rem] py-3 px-4 flex items-center gap-2 min-w-[196px] sm:min-w-0">
                                <div className="w-[10%]">
                                    <BsMap />
                                </div>
                                <p className="flex-1 whitespace-nowrap">{hotel.city}, {hotel.country}</p>
                            </div>
                            <div className="border border-slate-300 rounded-[1rem] py-3 px-4 flex items-center gap-2  min-w-[196px] sm:min-w-0">
                                <div className="w-[10%]">
                                    <BsBuilding />
                                </div>
                                <p className="flex-1 whitespace-nowrap">{hotel.type}</p>
                            </div>
                            <div className="border border-slate-300 rounded-[1rem] py-3 px-4 flex items-center gap-2  min-w-[196px] sm:min-w-0">
                                <div className="w-[10%]">
                                    <BiMoney />
                                </div>
                                <p className="flex-1 whitespace-nowrap">₹ {hotel.pricePerNight} per night</p>
                            </div>
                            <div className="border border-slate-300 rounded-[1rem] py-3 px-4 flex items-center gap-2  min-w-[196px] sm:min-w-0">
                                <div className="w-[10%]">
                                    <BiHotel />
                                </div>
                                <p className="flex-1 whitespace-nowrap">{hotel.adultCount} adults, {hotel.childCount} children</p>
                            </div>
                            <div className="border border-slate-300 rounded-[1rem] py-3 px-4 flex items-center gap-2  min-w-[196px] sm:min-w-0">
                                <div className="w-[10%]">
                                    <BiStar />
                                </div>
                                <p className="flex-1 whitespace-nowrap">{hotel.starRating} Star Rating</p>
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link 
                                to={`/edit-hotel/${hotel._id}`}
                                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                                style={{ borderRadius: "1rem" }}
                            >
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHotels;
