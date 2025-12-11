  import React from "react";
  import path from "../assets/images/workflow.png"

const WalkThroughit = () => {
  return (
    <div className="pl-10 pt-5">
      <div>
        <div>
          <div className="text-xl font-semibold">Lets Walk Through It</div>
          <p className="text-xl font-lite">
            You can find your notes , quizes , personalized tutor at one place
            and no need to go to multiple places to solve your doubts{" "}
          </p>
        </div>
        <div className="pt-10 ">
            <div className="border rounded-xl p-6 w-170 relative">
                <p className="text-2xl border bg-green-500 inline rounded-xl absolute top-[-15px] left-4 px-2">workflow of LearnedUp  </p>
                <img className="h-200 pt-5"  src={path} alt="" />
            </div>
            <div>
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default WalkThroughit;
