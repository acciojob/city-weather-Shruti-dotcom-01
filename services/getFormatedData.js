const getFormatedData = (data) => {
    console.log(data);
    const des = data.weather[0].description;
    const icon = data.weather[0].icon;
    const tempKelvin = data.main.temp;
    const name = data.name;
    const temp = ((tempKelvin - 273.15) * 9) / 5 + 32;
    return [name, temp, des, icon];
  };
  
  export default getFormatedData;