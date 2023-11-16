import {useState, useEffect} from "react";
import Todo from "./components/Todo";



const App = () =>{

  const [ip, setIp] = useState();
  const [userName, setUserName] = useState();
  const [todos, setTodos] = useState();

  const fetchTodos = async(event) =>{
    event.preventDefault();

    const res = await fetch("http://localhost:8080/getTodos?"+ new URLSearchParams({
      username:userName
    }))
    const data = await res.json();
    console.log(data)
    setTodos(data.todos);
  }

  const deleteTodo = async(todo) =>{
    const res = await fetch("http://localhost:8080/deleteTodo",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username:userName,
        todo:todo,
      }),
    });
    const data = res.json();
    console.log(data)
    setTodos(data.todos);

  }

  const addTodo = async(event) =>{
    const todo = prompt("Enter Todo");
    event.preventDefault();
    const res = await fetch("http://localhost:8080/addTodo",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username:userName,
        todo:todo,
      }),
    })

    const data = res.json();
    setTodos(data.todos);
  }

  useEffect(() =>{
    const fetchData = async() =>{
      const res = await fetch("http://localhost:8080");
      const data = await res.json();
      setIp(data);
    }
    
    fetchData();
    
  },[])

  


  return(
    <div className="">
      {/* Navbar */}
        <div className="px-4 py-6 flex items-center justify-between shadow-lg">
          <div className="">
            <h1 className="uppercase w-fit text-xl border-2 border-black  py-1">daily<span className="bg-black text-white py-1.5 px-1">tasks.com</span></h1>
          </div>
          <div className="">
            
            <div className="">
              {
                (ip?
                  <h1 className="uppercase text-xl">{`server private ip : ${ip.address}`}</h1>
                  :
                  <></>
                )
              }
              
            </div>
          </div>
        </div>
      {/* Navbar */}
      {/* Context */}
      {
        todos?
        <div className="w-full flex flex-col items-center mt-4">
          {
            todos.map((todo,key) =>(
              <Todo key={key} username={todo.username} todo={todo} deleteTodo={deleteTodo}/>
            ))
          }
          <button onClick={addTodo} className="uppercase bg-black text-white w-[calc(35rem)] mt-4 py-3 rounded-lg">add todo</button>
      
        </div>
        :
        <div className="w-full h-[calc(85vh)] flex justify-center items-center">
          <div className=" px-4 py-6 shadow-2xl h-[calc(40vh)] flex flex-col justify-center">
            <form onChange={(event) => setUserName(event.target.value)} className="w-full">
              <h1 className="uppercase text-2xl text-center">username</h1><br></br>
              <input className="shadow-lg w-80 px-4 py-2 rounded-lg" type="text" placeholder="Enter UserName" /><br></br>
              <button onClick={fetchTodos} className="w-80 text-white bg-black rounded-lg uppercase py-2 mt-4">login</button>
            </form>
          </div>
      </div>
      }
        
      {/* Context */}

    </div>
  )
};


export default App;