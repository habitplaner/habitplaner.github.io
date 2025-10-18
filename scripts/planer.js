import { stringToColor } from "../helpers/colorHelper.js";
import { firstDateOfMonth, getWeekDay, lastDateOfMonth } from "../helpers/dateHelper.js";

function drawNextMonth(date) {
  return drawPlaner(new Date(lastDateOfMonth(date).getTime() + 86400000));
}

function drawPrevMonth(date) {
  return drawPlaner(new Date(firstDateOfMonth(date).getTime() - 86400000));
}

const getCalendar = (date = new Date()) => {
  const calendarDiv = document.createElement('div');
  calendarDiv.classList.add('calendar');
  
  const firstDay = firstDateOfMonth(date);
  const lastDay = lastDateOfMonth(date);

   //дни недели
   const nearestMonday = new Date(new Date().getTime() - 86400000 * (new Date().getDay() - 1));

   Array(7).fill('E').map((s, i) => {
    const div = document.createElement('div');
    div.classList.add('dayOfWeek')

    div.textContent =  new Date(nearestMonday.getTime() + (86400000 * i)).toLocaleDateString('default', { weekday: 'short' });;
    calendarDiv.append(div);
  })

  //пустые дни в начале месяца
  Array(getWeekDay(firstDay)).fill('E').map((s) => {
    const div = document.createElement('div');
    div.textContent = '';
    div.classList.add('emptyDay')
    calendarDiv.append(div);
  })

  Array(lastDay.getDate()).fill('D').map((s, i) => {
    const div = document.createElement('div');
    const d = new Date(date.getFullYear(), date.getMonth(), i+1, date.getHours());
    div.innerText = d.getDate();
    if (d.toLocaleDateString() === new Date().toLocaleDateString()) {
      div.classList.add('today')
    }
    div.classList.add('day')
    div.dataset.date = d.toISOString().substring(0,10);

    // Что-то тащат над элементом
    div.addEventListener('dragover', (event) => {
      event.preventDefault(); // Essential to allow dropping
      event.target.classList.add('droppable')
    });

    // Что-то больше не тащат над элементом
    div.addEventListener('dragleave', (event) => {
      event.preventDefault(); // Essential to allow dropping
      event.target.classList.remove('droppable')
    });

    // Что-то бросили на элемент
    div.addEventListener('drop', (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text/plain');
      event.target.classList.remove('droppable');

      alert(`Добавляем ${data} в дату ${event.currentTarget.dataset.date}`)
      console.log(data, event.currentTarget.dataset.date)
    });

    calendarDiv.append(div);
  })


  let startX = 0;
  let endX = 0;
  const threshold = 50; // Minimum horizontal distance for a swipe


  calendarDiv.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
  });

  calendarDiv.addEventListener('touchend', (event) => {
      endX = event.changedTouches[0].clientX;
      const diffX = endX - startX;

      if (Math.abs(diffX) > threshold) {
          if (diffX > 0) {
              // Perform actions for right swipe
              drawPrevMonth(date)
          } else {
              
              // Perform actions for left swipe
              drawNextMonth(date)
          }
      }
  });
  calendarDiv.draggable = 'true'
  return calendarDiv;
}

const getItem = (s) => {
  const item = document.createElement('div');
  item.classList.add('item')
  item.textContent = s;
  item.setAttribute('id', s)
  item.style.backgroundColor = stringToColor(s);

  item.draggable = true;


  item.addEventListener('dragstart', (event) => {
      // данные в таскаемый элемент
      event.dataTransfer.setData('text/plain', s);
      
      event.target.classList.add('dragging');
  });

  item.addEventListener('dragend', (event) => {
      event.target.classList.remove('dragging');
  });

  return item;
}

const drawFooter = () => {
  footer.innerHTML = '';
  const itemsContainer = document.createElement('div');
  itemsContainer.classList.add('itemsContainer');

  const itemsList = document.createElement('div');
  itemsList.classList.add('itemsList');


  Array(10).fill('item').map((s,i) => {
    itemsList.append(getItem(`${s}-${i}`));
  })

  itemsContainer.append(itemsList)

  footer.append(itemsContainer)

}

export const drawPlaner = (date = new Date()) => {
  main.innerHTML = '';

  const section = document.createElement('section');

  const calendarHeader = document.createElement('header');
  calendarHeader.classList.add('calendarHeader')

  const btn1 = document.createElement('button');
  btn1.textContent = '<'
  btn1.onclick = () => drawPrevMonth(date)
  calendarHeader.append(btn1)

  const h4 = document.createElement('h4');
  h4.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric'});

  calendarHeader.append(h4)

  const btn2 = document.createElement('button');
  btn2.textContent = '>'
  btn2.onclick = () => drawNextMonth(date)
  calendarHeader.append(btn2)


  section.append(calendarHeader)

  section.append(getCalendar(date))
 
  main.append(section)

  drawFooter()
} 

