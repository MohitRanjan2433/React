import React, { useEffect, useState } from "react";
import Navbar from './components/Navbar'
import Filter from "./components/Filter";
import { filterData } from "./data";
import Spinner from "./components/Spinner";
import {toast} from "react-toastify";
import Cards from "./components/Cards";

const App = () => {

  const [courses,setCourses] = useState(null);
  const [category,setCategory] = useState(filterData[0].title);
  const [loading,setLoading] = useState(true);


  const apiUrl = "https://codehelp-apis.vercel.app/api/get-top-courses";

  async function fetchData(){
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      setCourses(output.data);
    }
    catch(error){
      toast.error('problem in feching data from api');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar />
      </div>
      <div className="bg-bgDark2">
        <Filter category={category} filterData={filterData} setCategory={setCategory} />
      </div>

      <div>
        {
          loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
        }
      </div>
    </div>
  )
};

export default App;
