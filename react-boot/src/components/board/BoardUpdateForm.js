import {useState,useCallback,useEffect} from "react";
import { useNavigate , useLocation,useParams } from "react-router-dom";

export default function BoardUpdateForm(){
    const navigate = useNavigate();
    const [num,setNum] =useState("");
    const [gname,setGname] =useState("");
    const [pass,setPass] =useState("");
    const [subject,setSubject] =useState("");
    const [content, setContent] =useState("");
    const [file1, setFile1] =useState("");
    const [boardid, setBoardid] =useState("");

    const {bnum} = useParams();
    const location = useLocation();
    let queryString = location.search;

    const getBoardInfo = ()=>{
        if(queryString.length===0){
            queryString = "?num="+bnum;
        }
        fetch("http://localhost:8080/board/boardUpdateForm"+queryString)
        .then((resp)=>resp.json())
        .then((json)=>{
            setNum(json.board.num)
            setGname(json.board.name)
            setSubject(json.board.subject)
            setContent(json.board.content)
            setFile1(json.board.file1)
            console.log(json.board.boardid)
            setBoardid(json.board.boardid)
        });
        
    };

    //서버에 수정 요청
    //useCallback : 리렌더링 방지
    //useCallback(func,[params,...]) : param가 같은경우 현재객체 그대로사용
    useEffect(()=>{
        getBoardInfo();
    },[]);

    const handleSubmit = useCallback(async (e) =>{
        e.preventDefault();
        alert("submit")
        let fileinput = document.querySelector("#file");
        try{
            const form = new FormData();
            form.append('num',bnum)
            form.append("name",gname);
        form.append("pass",pass);
        form.append("subject",subject);
        form.append("content",content);
        form.append("boardid",boardid);
        form.append('file1',file1);
        form.append("file2",fileinput.files[0])

        fetch("http://localhost:8080/board/boardUpdatePro",{
            method :'POST',
            body : form,
        })
        .then((resp)=>resp.json())
        .then((json)=>{
            console.log(json)
            console.log(json.msg)
            console.log(json.code)
            alert(json.msg);
            
            if(json.code===0){
                navigate("/board/boardInfo/"+bnum);
            }

        });

        }
        catch(e){
            console.error("업뎃 실패",e)
        }
    }, [gname,pass,subject,content,boardid,navigate]);

    return(
        <div className="container">
        <h4 className="text-center">게시판수정</h4>
        <form className="container" method="post" encType="multipart/form-date" onSubmit={handleSubmit}>
        <input type="hidden" name="num" value={bnum}/>
        <input type="hidden" name="file1" value={file1}/>
        <div className="form-group">
            <label htmlFor="name">작성자 : </label>
            <input type="text" className="form-control" placeholder="ENTER NAME" 
            id="name" onChange={(e)=>{setGname(e.target.value)}} value={gname} name="name"/>
        </div>

        <div className="form-group">
            <label htmlFor="pwd">비밀번호 : </label>
            <input type="password" className="form-control" placeholder="ENTER PASS" 
            id="pwd" onChange={(e)=>{setPass(e.target.value)}} value={pass} name="pass"/>
        </div>

         <div className="form-group">
            <label htmlFor="subject">제목 : </label>
            <input type="text" className="form-control" placeholder="제목 입력" 
            id="subject" onChange={(e)=>{setSubject(e.target.value)}} value={subject} name="subject"/>
        </div>

        <div className="form-group">
            <label htmlFor="content">내용 : </label>
            <textarea  className="form-control" rows="5" cols="20" placeholder="내용입력"
            id="content" onChange={(e)=>{setContent(e.target.value)}} value={content} name="content"></textarea>
        </div>

         <div className="form-group">
            <label htmlFor="file">파일 : &nbsp;{file1} </label>
            <input type="file" className="form-control" placeholder="제목 입력" 
            id="file" onChange={(e)=>{setFile1(e.target.value)}}  name="file1"/>
        </div>
        <button className="btn btn-primary">SUBMIT</button>
        </form>
        </div>
    );




}