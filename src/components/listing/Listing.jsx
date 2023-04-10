import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
export default function Listing({ id, data }) {
  debugger;
  return (
    <div
      className="flex flex-col  rounded-lg shadow hover:shadow-2xl overflow-hidden transition-shadow duration-150  cursor-pointer  bg-white"
      key={id}
    >
      <div className="relative">
        <Link to={`/category/${data.type}/${id}`}>
          <img
            loading="lazy"
            className="rounded-t-lg h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
            src={data.images[0]}
          />
          <div className="absolute top-2 left-2 bg-blue-600 p-1 rounded-lg">
            <span className="uppercase text-white">
              <Moment fromNow>{data.timestamp.toDate()}</Moment>
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center gap-1">
          <HiOutlineLocationMarker className="text-green-400" />
          <span>{data.address}</span>
        </div>
        <div>
          <h3 className="text-2xl  text-slate-900">{data.name}</h3>
        </div>
        <div>
          <span className="text-1xl text-blue-400">
            $
            {data.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {data.type == "rent" && " / month"}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div>
              <span className="font-bold">
                {data.bedrooms > 1 ? " Beds" : `${data.bedrooms} Bed`}
              </span>
            </div>
            <div>
              <span className="font-bold">
                {data.bathrooms > 1 ? "Baths" : `${data.bathrooms} Bath`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <AiFillDelete className="text-red-600 cursor-pointer" />
            </div>
            <div>
              <AiFillEdit className="text-yellow-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
