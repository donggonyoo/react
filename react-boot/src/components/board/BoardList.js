import {useState,useEffect} from "react";
import {useParams,useLocation} from "react-router-dom";//라우터에서 제공되는 parameter를 가져옴
import dayjs from 'dayjs'; //npm install dayjs
import { Navigate } from "react-router-dom";



const BoardList=()=>{
    const [bList,setBlist] = useState([]);
    const [boardCount,setBoardCount] = useState([]);
    const[start,setStart] = useState([]);
    const[end,setEnd] = useState([]);
    const[pageInt,setPageInt] = useState([]);
    const[bottomLine,setBottomLine] = useState([]);
    const[maxPage,setMaxPage] = useState([]);
    const[boardName,setBoardName] = useState([]);

    const{boardid} = useParams();
    const location = useLocation(); 
    /*
        useLocation : URL정보
        ex) http://localhost:3000/test?num=10
        --> uselocation.search : num=10 부분 조회
    */

    let queryString = location.search;
    /*
        useEffect : 특정값이 변경될때만 실행하도록 설정 가능
        빈배열인 경우 처음화면에 나타날때만 한번 실행
    */
    useEffect(()=>{
        getBoardList(); //getBoardList가 변경될때만 실행
    },[])

    //서버에 리스트+페이징 정보 요청
    const getBoardList = ()=>{
        if(queryString.length === 0){
            queryString = "?boardid="+boardid;
        }
        fetch("http://localhost:8080/board/boardList"+queryString) //서버로부터 데이터를 가져옴
        //cotroller에서 queryString을 Map으로 받을거임
        .then((resp)=>resp.json())
        .then((json)=>{
            setBlist(json.bList); //게시물목록
            setBoardCount(json.boardCount)//게시물등록건수
            setStart(json.start)
            setEnd(json.end)
            setPageInt(json.pageInt)//현재페이지
            setBoardName(json.boardName)    
            setBottomLine(json.bottomLine)//화면에보여질 페이지번호갯수
            setMaxPage(json.maxPage)
        })
    }
    //start~~end까지의값을 배열로 리턴(현재화면의 페이지번호 목록)
    function getPage(start,end){
        let arr=[];
        for(let i=start; i<=end; i++){
            arr.push(i)
        }
        return arr;
    }
    // 페이지 이동 핸들러
  const handlePageChange = (newPage) => {
    // 새로운 쿼리 파라미터 구성
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("boardid", boardid);
    newSearchParams.set("pageNum", newPage);
    Navigate(`/board/boardList?${newSearchParams.toString()}`);
  };
    return(
        <div>
            <div className="container">
                <h2 className="text-center">
                    {boardName}[{boardCount}]
                </h2>
                <p className="text-right">
                    <a className="btn btn-primary" href={`/board/boardForm/${boardid}`}>
                        게시판 입력
                    </a>
                </p>
                <table className="table table-bordered">
                    <thead>
                        <tr><th>번호</th><th>작성자</th><th>제목</th><th>날짜</th>
                        <th>조회수</th><th>파일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(bList) && bList.length >0 ? (
                            //b : board객체 , index:순서
                            bList.map((b , index)=>(        
                                //게시물 3개있다고치자(페이지는1개일거임)
                                // 3 - (1-1)*10 - 0 => 3
                                // 3 - (1-1)*10 -1 => 2    321순서로 게시물이나올거임                
                                <tr key={index}>                                                                    
                                    <td>{boardCount - (pageInt -1)*bottomLine - index}</td>
                                    <td>{b.name}</td>
                                    <td>
                                        <a href={"/board/boardInfo/"+b.num}>{b.subject}</a>
                                    </td>
                                    <td>{dayjs(b.regdate).format("YYYY-MM-DD")}</td>
                                    <td>{b.readcnt}</td>
                                    {b.file1 ?(
                                        <td><img src={"http://localhost:8080/img/board/"+b.file1} width="30px" alt="file"/>{b.file1}</td>
                                    ):(
                                        <td></td>
                                    )}
                                    
                                </tr>
                            ))) : ( //거짓인경우(글이없는경우)
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        게시물X
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>


                <ul className="pagination center" style={{justifyConent:"center"}}>
                    <li className={start <= bottomLine?"page-item disabled":"page-item"}>
                        <a className="page-link" href={"/board/boardList?pageNum="+(start-bottomLine)}>Previous</a>
                    </li>
                    {getPage(start,end).map((p)=>(
                        <li key={p} className={pageInt === p ? "page-item active":"page-item"}>
                            <a className="page-link" href={"/board/boardList/"+boardid+"&pageNum="+p}>{p}</a>
                        </li>
                    ))}
                    <li className={end>=maxPage ? "page-item disabled":"page-item"}>
                        <a className="page-link" href={"/board/boardList?pageNum="+(start+bottomLine)}>NEXT</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}


export default BoardList;