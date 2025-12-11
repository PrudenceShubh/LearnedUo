import React, { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { IoLinkOutline } from "react-icons/io5";
import { BsSend } from "react-icons/bs";


const Learncatagory = () => {
    const [open, setOpen] = useState(false);
  return (
    <div>
      <div className=" flex items-center justify-center pt-10 flex-col">
        <div className="text-xl  font-semibold">
          <p>What do you wnat to learn.....</p>
        </div>
        <div className=" flex gap-20 pt-5">
          <div className="flex flex-col  cursor-pointer w-50 h-27 border  rounded-xl gap-2">
            <div className="flex w-full text-2xl pt-3 border-b-2  items-center ">
              <div className="pl-2">
                <LuUpload />
              </div>
            </div>
            <div className="pl-1">
              <p className=" text-xl font-bold ">Upload</p>
              <p className="text-m ">Uplaod Any Pdf File</p>
            </div>
          </div>
          <div className="flex flex-col  cursor-pointer w-50 h-27 border  rounded-xl gap-2">
            <div className="flex w-full text-2xl pt-3 border-b-2  items-center ">
              <div className="pl-2">
                <LuUpload />
              </div>
            </div>
            <div className="pl-1">
              <p className=" text-xl font-bold ">Paste</p>
              <p className="text-m  ">Youtue video links</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  items-center justify-center pt-10 ">
        <div>
          <div>
            <div>
              <input type="text" placeholder="Leran anythingt" />
              <button>
                <BsSend/>
              </button>
            </div>
            <div>
              <div className="relative inline-block">
                <button
                  onClick={() => setOpen(!open)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Dropdown ▼
                </button>

                {open && (
                  <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Gemini 2.5 Flash

                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                     GPT-5 Mini
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learncatagory;
