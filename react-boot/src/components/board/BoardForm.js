
import { useNavigate, useParams } from "react-router-dom";
import {useState} from "react";

export default function BoardForm(){
const navigate = useNavigate("");

const[gname,setGname] = useState(""); /*폼에 사용될 변수들 */
const[pass,setPass] = useState("");
const[subject,setSubject] = useState("");
const[content,setContent] = useState("");
const[file2,setFile2] = useState("");

const {boardid} = useParams(); //파라미터값
console.log(boardid)


const handleSubmit = (e)=>{
    e.preventDefault();
    let fileinput = document.querySelector("#file2");
    try{
        const form = new FormData();
        form.append("name",gname);
        form.append("pass",pass);
        form.append("subject",subject);
        form.append("content",content);
        form.append("boardid",boardid);
        if(file2){
            form.append("file2",fileinput.files[0]);
        }
        fetch("http://localhost:8080/board/boardPro",{
            method:"POST",
            body:form
        })
        navigate(`/board/boardList/${boardid}`)
    }
    catch(e){
        console.log(e)
    }
}
return (
        <div className="container">
            <h4 className="text-center">게시판 입력</h4>
            <form className="container" method="post" encType="multipart/form-data" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label for="name">작성자:</label>
                    <input type="text" className="form-control" placeholder="Enter name" id="name" onChange={(e) =>{setGname(e.target.value);}}
                        value={gname} name="name" />
                </div>

                <div className="form-group">
                    <label htmlFor="pwd">비밀번호:</label>
                    <input type="password" className="form-control" placeholder="Enter password" id="pwd" 
                    onChange={(e) => {setPass(e.target.value);}}  
                    value={pass} name="pass" />
                </div>

                <div className="form-group">
                    <label for="subject">제목:</label>
                    <input type="text" className="form-control" placeholder="Enter Title" id="subject" onChange={(e) => {setSubject(e.target.value);}} 
                    value={subject} name="subject"/>
                </div>

                <div className="form-group">
                    <label for="content">내용:</label>
                    <textarea className="form-control" rows="5" id="content" value={content} name="content" 
                    onChange={(e) => {
                        setContent(e.target.value);
                    }} 
                    ></textarea>
                </div>
                <div className="form-group">
                    <label for="file2">파일:</label>
                    <input type="file" className="form-control" id="file2" onChange={(e)=>{setFile2(e.target.value);}} value={file2} name="file2"/>
                </div>
                <button type="submit" className="btn btn-primary">SUBMIT</button>
            </form>
        </div>
    );
}