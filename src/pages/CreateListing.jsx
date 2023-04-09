import React, { useState } from "react";
import Spinner from "../components/tools/Spinner";
import { toast, ToastContainer } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export function Choose({ item1 = "yes", item2 = "no", change = null, name }) {
  const [selectItem1, setselectItem1] = useState(false);
  const [selectItem2, setselectItem2] = useState(true);

  function onSelectItem1(e) {
    setselectItem1(true);
    setselectItem2(false);
    change && change(e, item1);
  }

  function onSelectItem2(e) {
    setselectItem1(false);
    setselectItem2(true);
    change && change(e, item2);
  }

  return (
    <div className="flex  mt-3 justify-between ">
      <button
        className={`${
          selectItem1 ? "bg-slate-600 text-white" : "bg-white text-black"
        } uppercase px-20 py-3  rounded hover:scale-105 shadow-md hover:shadow-lg`}
        onClick={onSelectItem1}
        name={name}
      >
        {item1 ?? "yes"}
      </button>
      <button
        className={`${
          selectItem2 ? "bg-slate-600 text-white" : "bg-white text-black"
        } uppercase px-20 py-3 rounded hover:scale-105 shadow-md hover:shadow-lg`}
        onClick={onSelectItem2}
        name={name}
      >
        {item2 ?? "no"}
      </button>
    </div>
  );
}

export default function CreateListing() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState({
    type: "rent",
    name: "",
    description: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: null,
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    description,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  function onChange(e) {
    if (e.target.files) {
      setformData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    } else {
      setformData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  }

  function onChangeChoose(e, v) {
    let value;
    if (e.target.name === "type") value = v;
    else value = v === "yes" ? true : false;

    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  }

  async function onSubmit() {
    if (discountedPrice > regularPrice) {
      toast.error("Discounted price needs to be less thatn regular price");
      return;
    }
    if (images?.length > 6) {
      toast.error("maximum 6 images are allowed");
      return;
    }

    setloading(true);

    const imageUrls = await Promise.all(
      [...images].map((image) => {
        return storeImage(image);
      })
    ).catch((error) => {
      setloading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataTemp = {
      ...formData,
      images: imageUrls,
      timestamp: serverTimestamp(),
      userid: auth.currentUser.uid,
    };

    const docRef = await addDoc(collection(db, "listings"), formDataTemp);
    setloading(false);
    toast.success("Listing created");
    navigate("/category");
  }

  function storeImage(image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject();
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center h-[50%]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-[500px] mx-auto mb-5">
      <ToastContainer />
      <div className="flex align-middle justify-center mt-10 mb-4">
        <h1 className="font-bold  text-4xl">Create a Listing</h1>
      </div>
      <div className="flex flex-col gap-5 px-3 align-middle justify-center">
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Sell/Rent</label>
          <Choose
            name="type"
            item1="sell"
            item2="rent"
            change={onChangeChoose}
          />
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Name</label>
          <div className="flex gap-5 mt-3 ">
            <input
              value={name}
              name="name"
              type="text"
              placeholder="Name"
              className="bg-white shadow-md rounded border-gray-300 w-full"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex  justify-between">
          <div className="flex  flex-col">
            <label className="font-bold text-lg">Beds</label>
            <input
              value={bedrooms}
              name="bedrooms"
              type="number"
              className="bg-white shadow-md rounded border-gray-300 w-full"
              onChange={onChange}
            />
          </div>
          <div className="flex  flex-col">
            <label className="font-bold text-lg">Bath Rooms</label>
            <input
              value={bathrooms}
              name="bathrooms"
              type="number"
              className="bg-white shadow-md rounded border-gray-300 w-full"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Parking spot</label>
          <Choose name="parking" change={onChangeChoose} />
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Furnished</label>
          <Choose name="furnished" change={onChangeChoose} />
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Address</label>
          <div className="flex gap-5 mt-3 ">
            <textarea
              value={address}
              name="address"
              type="text"
              placeholder="Address"
              className="bg-white shadow-md rounded border-gray-300 w-full"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Description</label>
          <div className="flex gap-5 mt-3 ">
            <textarea
              value={description}
              name="description"
              type="text"
              placeholder="Description"
              className="bg-white shadow-md rounded border-gray-300 w-full"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Offer</label>
          <Choose name="offer" change={onChangeChoose} />
        </div>
        <div className="flex  justify-between">
          <div className="flex  flex-col">
            <label className="font-bold text-lg">latitude</label>
            <input
              value={latitude}
              name="latitude"
              type="number"
              className="bg-white shadow-md rounded border-gray-300 w-full"
              onChange={onChange}
            />
          </div>
          <div className="flex  flex-col">
            <label className="font-bold text-lg">longitude</label>
            <input
              value={longitude}
              name="longitude"
              type="number"
              className="bg-white shadow-md rounded border-gray-300 w-full"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="flex  justify-between">
          <div className="flex  flex-col">
            <label className="font-bold text-lg">Regular Price</label>
            <input
              value={regularPrice}
              name="regularPrice"
              type="number"
              className="bg-white shadow-md rounded border-gray-300 w-full"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="flex  justify-between">
          <div className="flex  flex-col">
            <label className="font-bold text-lg">Discounted Price</label>
            <input
              value={discountedPrice}
              name="discountedPrice"
              type="number"
              className="bg-white shadow-md rounded border-gray-300 w-full"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="flex flex-col align-middle justify-center">
          <label className="font-bold text-lg">Images</label>
          <span>The first image will be the covert (max 6)</span>
          <div className="flex gap-5 mt-3 ">
            <input
              accept="image/png, image/gif, image/jpeg"
              type="file"
              placeholder="Name"
              name="files"
              multiple
              className="bg-white shadow-md rounded border-gray-300  p-2"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="flex align-middle justify-center">
          <button
            onClick={onSubmit}
            className="relative  uppercase bg-blue-600 w-full p-3 rounded text-white font-bold"
          >
            Create Listing
          </button>
        </div>
      </div>
    </div>
  );
}
