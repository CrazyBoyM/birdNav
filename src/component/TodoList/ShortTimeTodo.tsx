import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { defaultShortTodoList } from '@/store/todo'
import { Add, Check, CheckOne, Close, CloseOne, CloseSmall, Correct, Plus, ReduceOne } from '@icon-park/react'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import './index.css'

interface TodoItem {
  id: string,
  title: string
}

interface DoneItem {
  id: string,
  title: string
}

const ShortTimeTodo = () => {
  const [todoList, setTodoList] = useLocalStorageState('short-todolist', defaultShortTodoList)
  const [doneList, setDoneList] = useLocalStorageState('short-donelist', [])
  const [type, setType] = useState('todo')

  const addTodoItem = (content : string) => {
    if (!content) return
    const newTodoItem = { id: nanoid(), title: content }
    const newTodoList = [newTodoItem, ...todoList]
    setTodoList(newTodoList)
  }

  const deleteTodoItem = (item : TodoItem) => {
    const newTodoList = todoList.filter((todo : TodoItem) => todo.id !== item.id)
    setTodoList(newTodoList)
  }

  const competeTodoItem = (item : TodoItem) => {
    const newTodoList = todoList.filter((todo : TodoItem) => todo.id !== item.id)
    const newDoneList = [item, ...doneList]
    setTodoList(newTodoList)
    setDoneList(newDoneList)
  }

  const deleteDoneItem = (item : TodoItem) => {
    const newDoneList = doneList.filter((done : DoneItem) => done.id !== item.id)
    setDoneList(newDoneList)
  }

  const redoDoneItem = (item : TodoItem) => {
    const newDoneList = doneList.filter((done : DoneItem) => done.id !== item.id)
    const newTodoList = [item, ...todoList]
    setDoneList(newDoneList)
    setTodoList(newTodoList)
  }

  return (
    <section className="todo">
      <TodoHeader type={type} setType={setType} onAdd={addTodoItem} />
      { type === 'todo' && <TodoContent list={todoList} onAdd={addTodoItem} onDelete={deleteTodoItem} onCompete={competeTodoItem} /> }
      { type === 'done' && <DoneContent list={doneList} onDelete={deleteDoneItem} onRedo={redoDoneItem} /> }
    </section>
  )
}

interface TodoHeaderProps {
  type: string,
  setType: (value: string) => void,
  onAdd: (content: string) => void
}

const TodoHeader : React.FC<TodoHeaderProps> = (props) => {
  const { type, setType, onAdd } = props

  return (
    <section className="todo-header">
      <span className="todo-header-title">近一周</span>
      <section className="todo-header-btns">
        <section 
          className="todo-header-btn center" 
          onClick={() => setType('todo')}
          style={{ backgroundColor: type === 'todo' ? 'rgba(255,255,255, .3)' : 'rgba(255,255,255, .36)'}}
        >todo</section>
        <section 
          className="todo-header-btn center" 
          onClick={() => setType('done')}
          style={{ backgroundColor: type === 'done' ? 'rgba(255,255,255, .3)' : 'rgba(255,255,255, .36)'}}
        >done</section>
      </section>
    </section>
  )
}

interface TodoContentProps {
  list: [
    {
      id: string,
      title: string
    }
  ],
  onAdd: (content: string) => void,
  onDelete: (item : TodoItem) => void,
  onCompete: (item : TodoItem) => void
}

const TodoContent : React.FC<TodoContentProps> = (props) => {
  const { list, onAdd, onDelete, onCompete } = props
  const [text, setText] = useState('')
  const onSubmit = (e : any) => {
    e.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <div className="TodoContent">
      <ul className="TodoContent-list">
        {
          list.map((item : TodoItem, index : number) => 
          <li className="TodoContent-item" key={index}>
            <section className="TodoContent-item-title">{ index + 1 }、{ item.title }</section>
            <section className="TodoContent-item-btns">
              <div className="TodoContent-item-btn" onClick={() => onDelete(item)}>
                <CloseOne theme="outline" size="23" fill="rgb(196,196,196)"/>
              </div>
              <div className="TodoContent-item-btn" onClick={() => onCompete(item)}>
                <CheckOne theme="outline" size="23" fill="rgb(196,196,196)"/>
              </div>
            </section>
          </li>)
        }
      </ul>
      <form className="TodoContent-add" onSubmit={onSubmit}>
        <input type="text" placeholder="something..." value={text} onChange={e => setText(e.target.value)} />
        <Plus onClick= {onSubmit} theme="outline" size="23" fill="rgb(196,196,196)"/>
      </form>
    </div>
  )
}

interface DoneContentProps {
  list: [
    {
      id: string,
      title: string
    }
  ],
  onDelete: (item : TodoItem) => void,
  onRedo: (item : TodoItem) => void
}

const DoneContent : React.FC<DoneContentProps> = (props) => {
  const { list, onDelete, onRedo } = props

  return (
    <div className="DoneContent">
      <ul className="DoneContent-list">
        {
          list.map((item : DoneItem, index : number) => 
          <li className="DoneContent-item" key={index}>
            <section className="DoneContent-item-title">{ index + 1 }、{ item.title }</section>
            <section className="DoneContent-item-btns">
              <div className="DoneContent-item-btn" onClick={() => onRedo(item)}>
                <ReduceOne theme="outline" size="23" fill="rgb(196,196,196)"/>
              </div>
              <div className="DoneContent-item-btn" onClick={() => onDelete(item)}>
                <CloseOne theme="outline" size="23" fill="rgb(196,196,196)"/>
              </div>
            </section>
          </li>)
        }
      </ul>
    </div>
  )
}


export default ShortTimeTodo