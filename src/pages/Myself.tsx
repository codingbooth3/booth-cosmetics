import '../../src/css/Myself.css'


export default function Myself() {
  return (
    <div id='myselfContainer'>
      Email Me Below
      <form action="https://formsubmit.co/codingboth3@proton.me" method="POST" id='myselfForm'>
        <input type="text" name="name" required id='myselfFormName' className='myselfFormInput' />
        <input type="email" name="email" required id='myselfFormEmail' className='myselfFormInput' />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
