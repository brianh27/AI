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
