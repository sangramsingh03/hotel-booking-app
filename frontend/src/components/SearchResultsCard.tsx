import React, {useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types"
import { Link } from "react-router-dom";

type Props = {
    hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) =>{
    const [showFullFacilities, setShowFullFacilities] = useState<boolean>(false);
    const facilitiesArray = showFullFacilities ? hotel.facilities : hotel.facilities.slice(0,3);
    return (
        <div className="flex justify-center rounded-[1rem] p-[1rem] sm:p-[1.5rem] gap-[1.5rem] sm:gap-[2rem] border border-slate-300">
            <div className="w-[50%] h-[310px] sm:w-[40%] sm:h-[auto]">
                <img 
                    src={hotel.imageUrls[0]}
                    className="w-full h-full object-cover rounded-[1rem]"
                />
            </div>
            <div className="flex flex-col gap-[0.5rem] sm:gap-[1rem] w-[60%]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({length : hotel.starRating}).map((val, index) => (
                                <AiFillStar key={index} className="fill-yellow-400"/>
                            ))}
                        </span>
                        <span className="ml-1 text-sm">{hotel.type}</span>
                    </div>
                    <Link 
                        to = {`/detail/${hotel._id}`}
                        className="text-2xl font-bold cursor-pointer"
                    >
                        {hotel.name}
                    </Link>
                </div>

                <div>
                    <div className="line-clamp-4">{hotel.description}</div>
                </div>

                <div className="flex flex-col items-end gap-[2rem] items-start whitespace-nowrap">
                    <div className="flex flex-wrap gap-1 items-center self-start">
                        {facilitiesArray.map((facility, index) => (
                            <span 
                                key={index}
                                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
                            >
                                {facility}
                            </span>
                        ))}
                        {!showFullFacilities && (<span className="text-sm hover:cursor-pointer" onClick={() => {
                            setShowFullFacilities(true);
                        }}>
                            {hotel.facilities.length > 3 && `Click to see more`}
                        </span>)}
                    </div>
                    <div className="flex flex-col items-center gap-1 self-end">
                        <span className="font-bold">₹ {hotel.pricePerNight} per night</span>
                        <Link 
                            className="bg-blue-600 text-white h-full font-bold text-xl max-w-fit hover:bg-blue-500 rounded-[1rem] py-[0.5rem] px-[1rem]"
                            to = {`/detail/${hotel._id}`}
                        >
                            View more
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsCard;
