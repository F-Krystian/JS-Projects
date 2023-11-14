const apiKey = '<API key>';


const getWeatherData = async (cityName) => {
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';  
  const query = `${apiUrl}${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(query);

    if(response.status !== 200) {
      throw new Error('Network connection error');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error (`Error: ${error.message}`);
  }
}

export {getWeatherData};