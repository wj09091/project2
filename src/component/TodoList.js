import "./TodoList.css"
import TodoItem from "./TodoItem";
import { useState } from "react";

const TodoList = ({todo, onUpdate, onDelete}) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const [done, setDone] = useState(false);
    const onChangeDone = (e) => {
        console.log(e.target.value);
        setDone(!done);
    }
    const getSearchResult = () => {
        return search == ""
            ? todo
            : todo.filter((it)=>it.content.toLowerCase().includes(search.toLowerCase()));
    }
    const getNotDoneResult = (result) => {
        return done === false
            ? result
            : result.filter((it)=>!it.isDone)
    }
    const analyzeTodo = () => {
        const totalCount = todo.length;
        const doneCount = todo.filter((it)=>it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }
    return(
        <div className="TodoList">
            <h4>Todo List ☘</h4>
            <input value={search} 
                onChange={onChangeSearch}
                className="searchbar" 
                placeholder="검색어를 입력하세요" />
            <input className="done" 
                type="checkbox" 
                onChange={onChangeDone}
                value={done}
                />완료된 할일 숨기기
            <div className="list_wrapper">
                {getNotDoneResult(getSearchResult()).map((it)=>(
                    <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
            ))}

            </div>
        </div>
    )
};
export default TodoList;