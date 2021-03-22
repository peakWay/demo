import Footer from "./dumb/footer";
import React from "react"
import VisibleTodoList from "./smart/visibleTodoList";
import AddTodo from "./mix/addTodo";

const App = ()  => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)

export default App;