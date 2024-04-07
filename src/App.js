import { Background } from "./Background";
import { Table } from "./Table";
import { Modal } from "./Modal";
import { initJuno } from "@junobuild/core";
import { Auth } from "./Auth";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ViewTender from "./components/ViewTender";
import MakeTender from "./components/MakeTender";
function App() {
  // TODO: STEP_1_INITIALIZATION
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "te2pl-pqaaa-aaaal-ai5wq-cai",
      }))();
  }, []);

  return (
    <>
      <div className="isolate bg-white">
        <main>
          {/* <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl pt-16">
              <div className="text-center">
                <Auth>
                <Modal />
                  <Table />
                </Auth>
              </div>
            </div>
            <Background />
          </div> */}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainPage/>}>
                </Route>
                <Route path="/makeTender" element={<MakeTenderPage/>}/>
                <Route path="/buyTender" element={<ViewTenderPage/>}/>
              </Routes>
            </BrowserRouter>
          </main>
      </div>
    </>
  );
}

function MainPage(){
  return(<>
  <Navbar/>
  <Hero/>
  </>)
}

function MakeTenderPage(){
  return(
    <>
    <Navbar/>
    <MakeTender/>
    </>
  )
}


function ViewTenderPage(){
  return(
    <>
    <Navbar/>
    <ViewTender/>
    </>
  )
}

export default App;
