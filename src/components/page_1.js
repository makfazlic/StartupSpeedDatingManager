import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import addData from "@/firebase/addData";
import getList from "@/firebase/getData";
import Swal from "sweetalert2";



const startups = [{"id": "S200803", "name": "Spacetek Technology AG"}, {"id": "S211885", "name": "Adaire"}, {"id": "S450791", "name": "QIO - Quantitative Investment Office AG"}, {"id": "S631198", "name": "Beyond Gallery"}, {"id": "S858718", "name": "Zurichberg"}, {"id": "S867171", "name": "PurposeAI"}, {"id": "S315835", "name": "sophia"}, {"id": "S331236", "name": "mimicry"}, {"id": "S102036", "name": "MindHeal"}, {"id": "S817775", "name": "excelso"}, {"id": "S906065", "name": "Swisens AG"}, {"id": "S614518", "name": "Agnostic Intelligence AG"}, {"id": "S775216", "name": "visidox"}, {"id": "S994941", "name": "SUNCAR AG"}, {"id": "S575643", "name": "Sphere-Energy"}, {"id": "S813851", "name": "Manukai"}, {"id": "S346639", "name": "House Of Charts"}, {"id": "S679182", "name": "Bollwerk AI"}, {"id": "S421823", "name": "Giftit"}, {"id": "S236558", "name": "AirScale"}, {"id": "S948754", "name": "grape insurance AG"}, {"id": "S755675", "name": "AESTICO"}, {"id": "S273998", "name": "Contextual"}, {"id": "S573072", "name": "mygrid AG"}, {"id": "S578949", "name": "Rivia"}, {"id": "S323383", "name": "sefit"}, {"id": "S689839", "name": "Artifact"}]

let valid_ids = ["133145", "269694", "765215", "969398", "954192", "870345", "717935", "464050", "368559", "867158", "872165", "218869", "522836", "156246", "589583", "889759", "625000", "883517", "540659", "648793", "716924", "333299", "640261", "450382", "965456", "565526", "583268", "653539", "647127", "422601", "114560", "243865", "315034", "511448", "860438", "491676", "190665", "496652", "297414", "129959", "133044", "846506", "786593", "525653", "355075", "999275", "769921", "456337", "478939", "789179", "258105", "626838", "364766", "229132", "956681", "663074", "973432", "985438", "634737", "288595", "559189", "503197", "736432", "999088", "338019", "527241", "652590", "656419", "728303", "989246", "523265", "146390", "265376", "994023", "809595", "351948", "853287", "281507", "359364", "918695", "640874", "745451", "409626", "254240", "506164", "442523", "704510", "353644", "704496", "798168", "216325", "795771", "378659", "763256", "132650", "322383", "859517", "326449", "252837", "431747", "319197", "882324", "331787", "193270", "932371", "812876", "787223", "254604", "354109", "876429", "811745", "210712", "729208", "918307", "516613", "768981", "233796", "370043", "799291", "320112", "410924", "847715", "S211885", "S450791", "S631198", "S858718", "S867171", "S315835", "S331236", "S102036", "S817775", "S906065", "S614518", "S775216", "S994941", "S575643", "S813851", "S346639", "S679182", "S421823", "S236558", "S948754", "S755675", "S200803", "S273998", "S573072", "S578949", "S323383", "S689839"]


export default function Page1({ changeState }) {
  const [id, setId] = useState("");
  const [miniPage, setMiniPage] = useState(1);
  const [preferences, setPreferences] = useState([]);

  const handleSubmit = async () => {
    // if id starts with S
    // if id is in list
    if (!valid_ids.includes(id)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter a valid ID!",
            }); 
        return
    }

    if (id[0] === "S") {
        Swal.fire({
            icon: "Success",
            title: "Success!",
            text: "You have successfully logged in! and have to wait for the results!",
            });
        changeState(2);
    }
    let list = await getList();
    let values = Object.values(list);
    let ids = values.map((value) => value.id);
    if (ids.includes(id)) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You have already submitted your form! Please wait for the results!",
      }).then(() => {
        changeState(2);
      });
    } else {
      setMiniPage(2);
    }
  };

  const handleSubmit2 = async () => {
    
    changeState(2);
    await addData({
      id: id,
      preferences: preferences,
    });
    Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your form has been submitted!",
        });
    

  };

  return miniPage === 1 ? (
    <div className="flex flex-col items-center justify-center h-full py-2">
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        Welcome to SSD!{" "}
      </h1>
      <input
        type="text"
        placeholder="Enter your ID"
        className="
        px-6 py-3 mt-6 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-gradient-to-r from-gray-500 to-gray-600 hover:from-grey-600 hover:to-grey-700"
        onChange={(e) => setId(e.target.value.toUpperCase().trim())}
      />
      <button
        className="px-6 py-3 mt-6 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full py-2">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        Chose your Startups!{" "}
      </h1>
      <div className="px-10 md:px-0 w-full md:w-5/6">
        <fieldset>
          <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200 w-full ">
            {startups.map((person, personIdx) => (
              <div
                key={personIdx}
                className="relative flex items-start justify-center py-4"
              >
                <div className={person.id == "S200803" ? "min-w-0 flex-1 text-sm leading-6 flex items-center justify-start space-x-2" : "min-w-0 flex-1 text-sm leading-6 "}>
                {person.id === "S200803" ? 
                    <Image src="/premium.png" alt="Premium" width={20} height={20} /> 
                    : null}
                  <label
                    htmlFor={`person-${person.id}`}
                    className={person.id === "S200803" ? "select-none font-medium text-gray-900 text-xl" : "select-none font-medium text-gray-900 text-xl"}

                  >
                    {person.name}
                  </label>
                  

                </div>

                <div className="ml-3 flex h-6 items-center">
                  <input
                    id={`person-${person.id}`}
                    name={`person-${person.id}`}
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPreferences([...preferences, person.id]);
                      } else {
                        setPreferences(
                          preferences.filter(
                            (preference) => preference !== person.id
                          )
                        );
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
      <button
        className="px-6 py-3 mt-6 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        onClick={handleSubmit2}
      >
        Submit
      </button>
    </div>
  );
}
