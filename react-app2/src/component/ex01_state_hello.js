import {useState} from "react";

export default function Hello(){
    const [name,setName]= useState('MIKE');
    return(
        <div style={{color:"purple"}}>
            <h2>{name}</h2>
            <button onClick={()=>{
                setName(name==="MIKE"?"TOM":"MIKE")
            }}>이름 바꾸기</button>
        </div>
    );
}