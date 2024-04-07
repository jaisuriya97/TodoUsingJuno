import React, { useState, useContext, useEffect } from 'react'
import { setDoc, uploadFile } from "@junobuild/core";
import { nanoid } from "nanoid";
import { useNavigate } from 'react-router-dom';
import { authSubscribe } from "@junobuild/core";
function MakeTender() {
    const navigate = useNavigate();


    const [TenderName, setTenderName] = useState("");
    const [PublisherEmail, setPublisherEmail] = useState("");
    const [TenderAmount, setTenderAmount] = useState("");
    const [TenderDescription, setTenderDescription] = useState("");
    const [TenderClosingDate, setTenderClosingDate] = useState("");
    const [TenderOpeningDate, setTenderOpeningDate] = useState("");
    const [OwnerID, setOwnerID] = useState("");

    useEffect(() => {
        
    authSubscribe((user) => {
        setOwnerID(user.owner);
    });
    },[])

    const add = async() => {
        const key = nanoid();
        
        await setDoc({
            collection: "Tenders",
            doc: {
              key,
              data: {
                text: [OwnerID,TenderName, PublisherEmail, TenderAmount, TenderDescription, TenderClosingDate, TenderOpeningDate],  
                Approve: true,
              },
            },
          });
          alert("Tender Added Successfully");
            navigate('/');
    };

    return (
        <div>
            <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div class="container max-w-screen-lg mx-auto">
                    <div>
                        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div class="text-gray-900">
                                    <p class="font-medium text-lg">Make a Tender</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div class="lg:col-span-2">
                                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 text-dark">
                                        <div class="md:col-span-5">
                                            <label for="full_name">Tender Name</label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                id="full_name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-dark"
                                                value={TenderName} // Bind value to TenderName state variable
                                                onChange={(e) => { setTenderName(e.target.value) }}
                                            />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="email">Email Address</label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="email@domain.com"
                                                value={PublisherEmail} // Bind value to PublisherEmail state variable
                                                onChange={(e) => { setPublisherEmail(e.target.value) }}
                                            />

                                        </div>


                                        <div class="md:col-span-5">
                                            <label for="email">Tender Amount</label>
                                            <input
                                                type="number"
                                                name="email"
                                                id="email"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={TenderAmount} // Bind value to TenderAmount state variable
                                                onChange={(e) => { setTenderAmount(e.target.value) }}
                                            />
                                        </div>


                                        <div class="md:col-span-5">
                                            <label for="email">Starting Date</label>
                                            <input type="date" name="" className='h-10 border mt-1 rounded px-4 w-full bg-gray-50' id="" onChange={(e) => { setTenderOpeningDate(e.target.value) }} />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="email">Ending Date</label>
                                            <input type="date" name="" className='h-10 border mt-1 rounded px-4 w-full bg-gray-50' id="" onChange={(e) => { setTenderClosingDate(e.target.value) }} />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="email">Description</label>

                                            <textarea
                                                name=""
                                                className="h-20 border mt-1 rounded w-full bg-gray-50"
                                                id=""
                                                cols="90"
                                                rows="10"
                                                value={TenderDescription} // Bind value to TenderDescription state variable
                                                onChange={(e) => { setTenderDescription(e.target.value) }}
                                            ></textarea>
                                        </div>

                                        <div class="md:col-span-5 text-right">
                                            <div class="inline-flex items-end">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={add}>Submit</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MakeTender