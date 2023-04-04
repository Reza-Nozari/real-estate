import React, { useState } from "react";

export function Choose({ item1 = "yes", item2 = "no", OnChange }) {
  const [selectItem1, setselectItem1] = useState(false);
  const [selectItem2, setselectItem2] = useState(true);

  function onSelectItem1() {
    setselectItem1(true);
    setselectItem2(false);
    OnChange && OnChange(selectItem1 ? item1 : item2);
  }

  function onSelectItem2() {
    setselectItem1(false);
    setselectItem2(true);
    OnChange && OnChange(selectItem1 ? item1 : item2);
  }

  return (
    <div className="flex  mt-3 justify-between ">
      <button
        className={`${
          selectItem1 ? "bg-slate-600 text-white" : "bg-white text-black"
        } uppercase px-20 py-3  rounded hover:scale-105 shadow-md hover:shadow-lg`}
        onClick={onSelectItem1}
      >
        {item1 ?? "yes"}
      </button>
      <button
        className={`${
          selectItem2 ? "bg-slate-600 text-white" : "bg-white text-black"
        } uppercase px-20 py-3 rounded hover:scale-105 shadow-md hover:shadow-lg`}
        onClick={onSelectItem2}
      >
        {item2 ?? "no"}
      </button>
    </div>
  );
}

export default function CreateListing() {
  return (
    <div className="max-w-[500px] mx-auto mb-5">
      <div className="flex align-middle justify-center mt-10 mb-4">
        <h1 className="font-bold  text-4xl">Create a Listing</h1>
      </div>
      <div className="flex flex-col gap-5 px-3 align-middle justify-center">
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Sell/Rent</label>
          <Choose item1="Sell" item2="Rent" />
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Name</label>
          <div className="flex gap-5 mt-3 ">
            <input
              type="text"
              placeholder="Name"
              className="bg-white shadow-md rounded border-gray-300 w-full"
            />
          </div>
        </div>
        <div className="flex  justify-between">
          <div className="flex  flex-col">
            <label className="font-bold text-lg">Beds</label>
            <input
              type="number"
              className="bg-white shadow-md rounded border-gray-300 w-full"
            />
          </div>
          <div className="flex  flex-col">
            <label className="font-bold text-lg">Beds</label>
            <input
              type="number"
              className="bg-white shadow-md rounded border-gray-300 w-full"
            />
          </div>
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Parking spot</label>
          <Choose />
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Furnished</label>
          <Choose />
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Address</label>
          <div className="flex gap-5 mt-3 ">
            <textarea
              type="text"
              placeholder="Address"
              className="bg-white shadow-md rounded border-gray-300 w-full"
            />
          </div>
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Description</label>
          <div className="flex gap-5 mt-3 ">
            <textarea
              type="text"
              placeholder="Description"
              className="bg-white shadow-md rounded border-gray-300 w-full"
            />
          </div>
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Offer</label>
          <Choose />
        </div>
        <div className="flex  justify-between">
          <div className="flex  flex-col">
            <label className="font-bold text-lg">Regular Price</label>
            <input
              type="number"
              className="bg-white shadow-md rounded border-gray-300 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Name</label>
          <div className="flex gap-5 mt-3 ">
            <input
              type="file"
              placeholder="Name"
              className="bg-white shadow-md rounded border-gray-300 w-full p-2"
            />
          </div>
        </div>

        <div className="flex align-middle justify-center">
          <button className="relative  uppercase bg-blue-600 w-full p-3 rounded text-white font-bold">
            Create Listing
          </button>
        </div>
      </div>
    </div>
  );
}
