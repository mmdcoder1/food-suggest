import { useState, useEffect } from "react";

interface storageFoodType {
    id: number;
    image: string;
}

const History = () => {
  const [foods, setFoods] = useState<null | storageFoodType[]>(null);

  useEffect(() => {
     const storage = localStorage.getItem("foods");
     if(storage) setFoods(JSON.parse(storage))
  }, [])

  return (
    <div className="flex items-center flex-col gap-[40px] mt-[60px] mx-auto w-fit">
        <h2 className="font-[circularStd] text-[30px] sm:text-[40px] md:text-[50x] text-center font-bold">Recent Foods</h2>
        <div className="flex flex-col-reverse sm:flex-row-reverse flex-wrap items-center justify-center gap-[0px] sm:gap-[40px] mx-[0px] mb-[60px]">
        {
            (foods) ? foods.map((food: storageFoodType, i: number) => 
                <div key={i} className="flex items-center justify-center w-[280px] h-[280px] rounded-[20px]">
                    <img width={280} height={280} loading="lazy" className="w-[280px] h-[280px] rounded-[20px] object-cover" src={food.image} alt="food" />
                </div>
            )  : <div className="mb-[60px]">No Foods Available!</div>        
          }
        </div>
        
    </div>
  )
}

export default History