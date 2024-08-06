//Creando un Greeting segun el horario
const Greeting = () => {
  let greetingString = ''
  function greeting(hour) {
    if (hour >= 6 && hour < 12) {
      return '¡Buenos días!'
    } else if (hour >= 12 && hour < 18) {
      return '¡Buenas tardes!'
    } else {
      return '¡Buenas noches!'
    }
  }
  // Usando la función greeting

  const currentTime = new Date()
  const hour = currentTime.getHours()
  greetingString = greeting(hour)

  return <h1 className="text-4xl font-bold text-zinc-100">{greetingString}</h1>
}

export default Greeting
