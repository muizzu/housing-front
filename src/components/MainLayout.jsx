
import React from "react";


const MainLayout = (props) => {
  return (
    <main className="bg-hero bg-no-repeat bg-cover">
       <div className="h-screen ">
      
        <div className="w-full max-w-lg px-2 py-5 sm:px-0 mx-auto bg-white overflow-hidden shadow-2xl rounded-3xl mt-10 border-1">
          {props.children}
        </div>
        </div>
      
    </main>
  );
}

export default MainLayout