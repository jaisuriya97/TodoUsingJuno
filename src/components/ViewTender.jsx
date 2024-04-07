import React, { useEffect, useState } from 'react';
import { listDocs } from "@junobuild/core";
import { useNavigate } from 'react-router-dom';
function ViewTender() {
    const nav = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { items } = await listDocs({
                    collection: "Tenders",
                });
                console.log(items);
                setItems(items);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    const handleApprove = (data)=>{
        if(!data){
            nav('/');
        }
    }
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => (
                <div className="py-20 px-5 ">
                    <div key={index} className={`max-w-sm rounded overflow-hidden shadow-lg ${item.data.Approve ? 'bg-gray-300' : ''}`}>
                        <div className={`px-6 py-4 ${item.data.Approve ? '':'hover:bg-gray-200'} cursor-pointer `} onClick={()=>{handleApprove(item.data.Approve)}}>
                            <div className="font-bold text-xl mb-2">{item.data.text[1]}</div>
                            <p className="text-gray-700 text-base">
                                <strong>Tender Amount: </strong>{item.data.text[3]}
                            </p>
                            <p className="text-gray-700 text-base">
                                <strong>Publisher Email: </strong>{item.data.text[2]}
                            </p>
                            <p className="text-gray-700 text-base">
                                <strong>Description: </strong>{item.data.text[4]}
                            </p>
                            <p className="text-gray-700 text-base">
                                <strong>Closing Date: </strong>{item.data.text[5]}
                            </p>
                            <p className="text-gray-700 text-base">
                                <strong>Opening Date: </strong>{item.data.text[6]}
                            </p>
                            <p className='text-gray-900 text-base'><strong>Tender By: </strong>{item.data.text[0]}</p>
                            <div className="flex justify-center mt-5"> {/* Flex container to center the button */}
                            <button className={item.data.Approve ? 
                                'bg-gray-800 p-5 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center' : 
                                'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'}> 
                                { item.data.Approve ? (<>Already Approved</>):(<>Approve</>)}
                            </button>
                        </div>
                        </div>
                      
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ViewTender;
