import { useState } from 'react'
import OpenAI from "openai";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './app.css'
const openai = new OpenAI({apiKey:'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',dangerouslyAllowBrowser: true});


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
      messages: [{"role": "system", "content": "You are a helpful assistant."},{'role':'user','content':query}],
      model: "gpt-4o-mini",
    });
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
