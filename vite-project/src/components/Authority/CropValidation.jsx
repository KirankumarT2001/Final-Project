import React, { useEffect, useState } from "react";
import useCrop from "../../Customhooks/crops.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "./SideBar.jsx";
import { Footer, Header } from "../index.js"

const CropValidation = () => {
  const [crops, setCrops] = useState([]);
  const { getCrops } = useCrop();
  const [state, setState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const crops = await getCrops();
      setCrops(crops);
    }

    fetchData();
  }, []);

  const productContract = useSelector(state => state.addContract.productContract);

  const handleApproveCrop = async (cropId) => {
    const date = new Date();
    const time = date.toLocaleString();
    await productContract.approveCrop(cropId, time);
    productContract.once("approveCropEvent", () => {
      toast.success("Crop approved successfully");
      const updatedCrops = crops.map((crop) => {
        if (crop.id === cropId) {
          return { ...crop, isApproved: true };
        }
        return crop;
      });
      setCrops(updatedCrops);
    });
  };

  return (
    <>
      <Header />
      <main className="h-auto grid grid-cols-8">
        <SideBar className="col-span-2 z-10" />
        <div className="col-span-6">
          <img
            src="/images/Bg.jpg"
            className="w-screen h-screen blur-lg opacity-60 fixed z-0"
            alt=""
          ></img>
          <div className="flex flex-col place-items-center min-h-screen gap-4 p-8 z-10 relative ">
            <div className="font-bold text-6xl">Crop Validation</div>
            <table className=" w-full mx-2  h-auto rounded-lg overflow-hidden">
              <thead className=" text-white text-xl bg-black border-green-800 border-2">
                <tr>
                  <th>PID</th>
                  <th>Crop Name</th>
                  <th>Wallet</th>
                  <th>Cultivation Area</th>
                  <th>Time Till Harvest</th>
                  <th>Expected Yield</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center font-semibold bg-white">
                {crops.map((crop) => (
                  <tr key={crop.id} className="border-2 border-green-800">
                    <td>{crop.id}</td>
                    <td>{crop.cropName}</td>
                    <td>{`${crop.ETHAddress.substring(0, 7)}...${crop.ETHAddress.substring(37, 42)}`}</td>
                    <td>{(crop.acre).toString()} acre</td>
                    <td>{crop.months}</td>
                    <td>{(crop.yieldperacre).toString()} /acre</td>
                    <td>
                      {crop.isApproved ? (
                        <button className="bg-green-500 rounded-lg my-2 p-2" disabled>Approved</button>
                      ) : (
                        <button onClick={() => handleApproveCrop(crop.id)} className="bg-red-500 rounded-lg my-2 p-2">
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CropValidation;