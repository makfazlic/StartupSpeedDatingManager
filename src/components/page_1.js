import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import addData from "@/firebase/addData";
import getList from "@/firebase/getData";
import Swal from "sweetalert2";



const startups = [{"id": "S985738", "name": "Spacetek Technology AG"}, {"id": "S488859", "name": "Adaire"}, {"id": "S400784", "name": "QIO - Quantitative Investment Office AG"}, {"id": "S966818", "name": "Beyond Gallery"}, {"id": "S114020", "name": "Zurichberg"}, {"id": "S586993", "name": "PurposeAI"}, {"id": "S500922", "name": "sophia"}, {"id": "S656331", "name": "mimicry"}, {"id": "S969843", "name": "MindHeal"}, {"id": "S117561", "name": "excelso"}, {"id": "S358280", "name": "Swisens AG"}, {"id": "S124130", "name": "Agnostic Intelligence AG"}, {"id": "S978874", "name": "visidox"}, {"id": "S785571", "name": "SUNCAR AG"}, {"id": "S483968", "name": "Sphere-Energy"}, {"id": "S737074", "name": "Manukai"}, {"id": "S647512", "name": "House Of Charts"}, {"id": "S971777", "name": "Bollwerk AI"}, {"id": "S731867", "name": "Giftit"}, {"id": "S202530", "name": "AirScale"}, {"id": "S446157", "name": "grape insurance AG"}, {"id": "S456855", "name": "AESTICO"}, {"id": "S392801", "name": "Contextual"}, {"id": "S868747", "name": "mygrid AG"}, {"id": "S668397", "name": "Rivia"}, {"id": "S646157", "name": "sefit"}, {"id": "S732915", "name": "Artifact"}]

let valid_ids = ["300919", "581235", "363172", "386399", "905982", "810945", "747087", "119670", "849763", "744505", "550888", "852425", "610396", "409645", "200547", "403722", "176787", "537345", "858750", "463068", "325456", "692575", "379387", "336711", "464375", "802134", "472771", "934893", "511232", "743909", "857693", "539689", "351368", "827231", "217720", "827685", "504805", "360447", "316821", "603613", "164539", "634243", "753082", "218050", "387211", "894799", "213009", "639450", "826692", "478604", "634108", "485780", "403336", "170252", "473564", "774736", "842442", "740767", "618164", "238058", "677187", "450279", "319609", "239616", "658293", "829090", "740016", "567755", "529513", "411364", "261101", "504759", "395146", "772050", "830373", "253796", "653894", "411054", "535864", "348808", "637894", "811005", "543527", "629058", "623786", "744318", "321345", "467512", "707371", "242177", "982757", "459048", "218383", "874225", "368114", "229684", "509538", "917967", "536107", "480870", "516846", "928566", "457313", "464732", "936491", "362463", "922068", "350639", "684108", "173285", "472655", "836786", "192837", "647078", "844620", "403712", "914452", "113838", "650617", "449026", "375994", "S488859", "S400784", "S966818", "S114020", "S586993", "S500922", "S656331", "S969843", "S117561", "S358280", "S124130", "S978874", "S785571", "S483968", "S737074", "S647512", "S971777", "S731867", "S202530", "S446157", "S456855", "S985738", "S392801", "S868747", "S668397", "S646157", "S732915"]


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
                <div className={person.id == "S985738" ? "min-w-0 flex-1 text-sm leading-6 flex items-center justify-start space-x-2" : "min-w-0 flex-1 text-sm leading-6 "}>
                {person.id === "S985738" ? 
                    <Image src="/premium.png" alt="Premium" width={20} height={20} /> 
                    : null}
                  <label
                    htmlFor={`person-${person.id}`}
                    className={person.id === "S985738" ? "select-none font-medium text-gray-900 text-xl" : "select-none font-medium text-gray-900 text-xl"}

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
