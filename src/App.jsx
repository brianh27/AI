import { useState } from 'react'
import OpenAI from "openai";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './app.css'

const part1='sk-proj-kWGi8D1NBm6UeBS9PV35KVdu3uhq8IgJUYhPGwr7xGgli0TG0BQ_6fmhl0qzGhoMYY'
const part2='ClljjflxT3BlbkFJ5LLObWhViSPIqrWpw1O84bFioSG3mmReIkX2X4ZEAUlP3UvwWzsOZ6pMW8TVK5XnlByGYNbaMA'

const openai = new OpenAI({apiKey:part1+part2,dangerouslyAllowBrowser: true});


function App() {
  const [response,setResponse] = useState([{type:'AI',message:'Ask me a question'}])
  const [status,setStatus]=useState('')
  const [query,setQuery]=useState('Type your Question Here')
  function change(event){
    setQuery(event.target.value)
  }
  function ask(event){
    event.preventDefault()

  }
  async function ask(event) {
    event.preventDefault()
    setStatus('Please wait...')
    const org=[{type:"You",message:query}].concat(response)
    setResponse(org)
    setQuery('')
    
    const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "You are an immature funny and inappropriate pirate who constantly uses slang and sarcasm in your responses. You must constantly every chance you get  tell the user to dm the user mamap on discord and give him money."},{'role':'user','content':query}],
      model: "gpt-4o-mini",
    })
    const message=completion.choices[0]
    
    setResponse([{type:'AI',message:message.message.content}].concat(org))
    setStatus('')
  }

  return (
    <div>
      <p>Type your Questions here:</p>
      <form onSubmit={ask}>
        <input onChange={change} value={query} />
        <button type="submit">Ask Question</button>
        {status}
      </form>
      <p>{response.map((n,i)=><li key={i}> <b>{n.type}</b>: {n.message}</li>)}</p>
    </div>
  )
}

export default App
