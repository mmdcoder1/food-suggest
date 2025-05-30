import { useState, useEffect } from "react";
import axios from "axios";

interface FoodType {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookTimeMinutes: number;
}

const Main = () => {
  const [food, setFood] = useState<FoodType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 30) + 1;
    const storage: null | string = localStorage.getItem("foods");

    axios
      .get(`https://dummyjson.com/recipes/${randomId}`)
      .then((res) => {
           setFood({
                id: res.data.id,
                name: res.data.name,
                image: res.data.image,
                ingredients: res.data.ingredients,
                instructions: res.data.instructions,
                cookTimeMinutes: res.data.cookTimeMinutes
           })
           
           let newData = {id: res.data.id, image: res.data.image};
           if(storage){
                let parsedStorage = JSON.parse(storage);
                if(parsedStorage.length === 3){
                      parsedStorage.shift();
                      parsedStorage.push(newData);
                      localStorage.setItem("foods", JSON.stringify(parsedStorage))
                } else {
                      parsedStorage.push(newData);
                      localStorage.setItem("foods", JSON.stringify(parsedStorage));
                }
           } else localStorage.setItem("foods", JSON.stringify([newData]))   
      })
      .catch((err) => console.error("Error fetching food:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-[40px]">Loading...</div>;

  return (
    <>
      {food && (
        <div className="flex items-center flex-col gap-[30px] mt-[40px] mx-auto w-fit">
          
          {/* title start */}
          <h2 className="font-[circularStd] text-[35px] sm:text-[45px] md:text-[55px] text-center font-bold">
            Today Food
          </h2>
          {/* title end */}
          

          <div className="flex flex-col items-center lg:items-start lg:flex-row gap-[30px]">

              
              {/* cover start */}
              <div className="min:w-[300px] min:h-[300px] sm:min-w-[400px] sm:min-h-[400px] md:min-w-[500px] md:min-h-[500px] rounded-[20px] overflow-hidden mx-[30px]">
                <img
                    className="min:w-[300px] min:h-[300px] sm:min-w-[400px] sm:min-h-[400px] md:min-w-[500px] md:min-h-[500px] object-cover"
                    src={food.image}
                    alt="food"
                    width={500}
                    height={500}
                    loading="lazy"
                />
              </div>
              {/* cover end */}

         


         {/* details start */}
           <div className="flex flex-col items-center lg:items-start gap-[30px]">
               
                  {/* name start */}
                  <p className="text-[20px] font-medium">{food.name}</p>
                  {/* name end */}


                  {/* cook time start */}
                  { 
                    (food.cookTimeMinutes !== 0) &&
                          <div className="flex flex-col items-center lg:items-start justify-center gap-[7px]">
                                <p>Cook time</p>
                                <p className="flex items-center justify-center bg-blue-100 text-gray-600  rounded-[10px] text-[20px] py-[8px] px-[14px]">{food.cookTimeMinutes} Min</p>
                          </div>
                  }
                  {/* cook time end */}


                  {/* ingradients start */}
                  <div className="flex items-center lg:items-start flex-col gap-[10px] mx-[30px] lg:mx-0">
                      <p className="text-[14px]">Ingredients</p>
                      <div className="flex items-start justify-center lg:justify-start gap-[10px] flex-wrap w-5/6">
                        {food.ingredients.map((ingredient: string) => (
                          <div
                            key={ingredient}
                            className="bg-gray-100 text-gray-500 px-[12px] py-[3px] rounded-[10px] text-[14px]"
                          >
                            {ingredient}
                          </div>
                        ))}
                      </div>
                  </div>
                  {/* ingradients end */}
                  



                  {/* instructions start */}
                    <div className="flex items-center lg:items-start flex-col gap-[10px] mx-[30px] lg:mx-0">
                      <p className="text-[14px]">Instructions</p>
                      <div className="flex flex-col items-start justify-center gap-[10px]">
                        {food.instructions.map((instruction: string, i: number) => (
                          <div
                            key={instruction}
                            className="flex items-start gap-[9px]"
                          >
                            <span className="flex items-center justify-center bg-orange-400 min-w-[20px] min-h-[20px] text-white rounded-[5px] text-[12px]">{i+1}</span>
                            <p className="text-gray-600 rounded-[10px] text-[14px]">{instruction}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* instructions end */}


           </div>
           {/* details */}

          </div>
        </div>
      )}
    </>
  );
};

export default Main;