const date = new Date();
const renderCalendar = () => {
    date.setDate(1);
    const months = [ "Enero", "Febrero" , "Marzo" , "Abril" ,"Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre" ,"Diciembre" ];
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    const monthDays = document.querySelector('.calendar__days');
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();
    const nextDays = 7 - lastDayIndex -1;
    document.querySelector('.calendar__date h1').innerHTML = months[date.getMonth()];
    document.querySelector('.calendar__date p').innerHTML = date.toLocaleDateString("es-ES", options)
    
    let days = "";
    
    for(let i = firstDayIndex; i>0; i--){
        days += `<div class="prev-date">${prevLastDay-i+1}</div>`;
        monthDays.innerHTML = days;
    }
    
    for(let i = 1; i<=lastDay;i++){
        if(i== new Date().getDate() && date.getMonth() == new Date().getMonth()){
            days += `<div class="today">${i}</div>`;
        }else{
            days += `<div>${i}</div>`;
        }
        
        monthDays.innerHTML = days;
    }
    
    for(let i = 1; i<=nextDays;i++){
        days += `<div class="next-date">${i}</div>`;
        monthDays.innerHTML = days;
    }
    
}

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });
  
  document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
  renderCalendar();

  