import React from "react";
import { useState, useEffect } from "react";
import getFinal from "@/firebase/getFinal";

// for each startup and each person id map to an array of (id), name, time, containing all their dates

export default function Page3() {
  const [times, setTimes] = useState([]);
  const [miniPage, setMiniPage] = useState(1);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    (async () => {
      let list = await getFinal();
      let values = Object.values(list);
      setData(values);
    })();
  }, []);

  const handleSubmit = async () => {
    let times_local = [];
    // for each data
    data.forEach((element) => {
      let key = Object.keys(element)[0];
      if (key === id) {
        let values = Object.values(element);
        // connvert values to array
        values = values[0];
        console.log(values);
        for (let i = 0; i < values.length; i++) {
          let time = values[i].round;
          let name = values[i].name;
          let id = values[i].id;
          times_local.push({ time: time, name: name, id: id });
        }
        setTimes(times_local);
      }
    });

    setMiniPage(2);
  };

  return miniPage === 1 ? (
    <div className="flex flex-col items-center justify-center h-full py-2">
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        Get your Matches!{" "}
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
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-5">
        Your Time Table:{" "}
      </h1>
      {/* <div class="grid grid-cols-1 grid-flow-row gap-4 p-4 text-2xl">
        {times.map((timeData) => (
          <div key={timeData.id}>
            {timeData.name} at time slot {timeData.time}
          </div>
        ))}
      </div> 
      Make the upper part as a table
      */}
      <table class="table-auto pd-4 text-xl md:text-2xl">
        <thead className="border-b-2 border-gray-300">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Time Slot</th>
          </tr>
        </thead>
        
        <tbody>
          {times.map((timeData) => (
            <tr className="" key={timeData.id}>
              <td class="border px-4 py-2 text-left">{timeData.name.replaceAll("_", " ")}</td>
              <td class="border px-4 py-2 text-center">{timeData.time}</td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}
