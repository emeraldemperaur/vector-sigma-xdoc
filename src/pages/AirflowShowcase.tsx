import { useEffect } from "react";

const AirflowDAGShowcase = ({darkMode}: {darkMode: boolean}) => {
    useEffect(()=>{
        document.body.style.backgroundColor = darkMode ? "#1b1c1d" : "#ffffff";
        }, [darkMode]);
 
    return(<>
    Airflow DAG Showcase
    </>)
}

export default AirflowDAGShowcase;