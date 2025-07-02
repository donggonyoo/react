import data from "../db/data.json"
export default function Day(){
    const day = "3";
    //(word.day(json객체의 키 값)===day(변수값)
    const wordlist = data.words.filter(word=>(word.day===day))
    return(
<>
<h2>Day{day}</h2>
<table>
<tbody>
    {/*"words": [
    {
      "id": 1,
      "day": 1,
      "eng": "book",
      "kor": "책",
      "isDone": false
    },{....}] */}

    {/*data.words(배열)를 순회해 각 요소에 id,eng,kor만 뽑아서 하나의행으로*/}
    {wordlist.map(word=>(
        <tr>
            <td>{word.eng}</td>
            <td>{word.kor}</td>
        </tr>
    ))}
</tbody>
</table>
</>
    );
    
}