let inputs = document.getElementById("inputs");
let container = document.getElementById("container");
let totalTimeDisplay = document.getElementById("totalTimer");
let currentTaskDisplay = document.getElementById("currentTask");
let currentTimeDisplay = document.getElementById("currentTimer");
let nextUpDisplay = document.getElementById("nextTaskName");
let upperBody = document.getElementById("upperBody");
let lowerBody = document.getElementById("lowerBody");
let timerDiv = document.getElementById("timer");
let taskList = document.getElementById('taskList')
let body = document.body;

// //Total time of all tasks
let totalTime = 0;
let currentTime = 0;
// //Holds all tasks
let tasks = [];
let index = 0;

class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
}

class Timer {
  constructor(duration, target) {
    this.duration = duration;
    this.target = target;
    this.end = false;
    this.deltaTimer = 0;
    this.deltaTimerInterval = 1000;
    this.minutes = 0;
    this.seconds = 0;
  }
  convertTime(duration){
    this.minutes = ~~(duration / 1000 / 60);
    this.seconds = duration / 1000 - this.minutes * 60;
  }
  addZeros(target,seconds){
    if (seconds < 10) {
      target.innerHTML = `<h1>${this.minutes}:0${seconds}</h1>`;
    } else {
      target.innerHTML = `<h1>${this.minutes}:${seconds}</h1>`;
    }
  }
  update(deltaTime) {
    if (this.deltaTimer > this.deltaTimerInterval) {
      this.convertTime(this.duration)
      this.duration -= 1000;
      this.deltaTimer = 0;
      this.addZeros(this.target,this.seconds)
    } else {
      this.deltaTimer += deltaTime;
    }

    if (this.duration <= 0) {
      setTimeout(()=> {
        this.target.innerHTML = "<h2>GOOD JOB!</h2>";
      },1000);
      
      this.end = true;
    }
  }
}
class TaskTimer extends Timer {
  constructor(duration, targetTime, targetName, array,body) {
    super(duration);
    this.targetTime = targetTime;
    this.targetName = targetName;
    this.array = array;
    this.last = false;
    this.body = body;
    
  }
  changeBackground(taskName){
    if(taskName === "Rest" || taskName ==="Get Ready!"){
      this.body.style.background = 'red';
    }else{
      this.body.style.background = 'green';
    }
  }
  checkLast() {
    if (this.array.length < 1) this.last = true;
  }

  update(deltaTime) {
    if (this.deltaTimer > this.deltaTimerInterval) {
      this.changeBackground(this.array[0].name)
      this.convertTime(this.duration)
      this.targetName.innerHTML = `<h1>${this.array[0].name}<h1>`;
      this.duration -= 1000;
      this.deltaTimer = 0;
      this.addZeros(this.targetTime,this.seconds)
    } else {
      this.deltaTimer += deltaTime;
    }
    if (this.duration / 1000 < 10 && this.array.length > 1) {
      nextUpDisplay.innerHTML = `<h2>Next Up: ${this.array[1].name}</h2>`;
    } else if (this.duration / 1000 < 10 && this.array.length < 1) {
      nextUpDisplay.innerHTML = `<h2>LAST ONE!</h2>`;
    } else {
      setTimeout(() => {
        nextUpDisplay.innerHTML = "";
      }, 800);
    }

    if (this.duration <= 0) {
      this.array.splice(0, 1);
      if (this.array.length > 0) {
        this.duration = this.array[0].duration * 1000;
      } else {
        this.targetName.innerHTML = "";
        this.targetTime.innerHTML = "";
      }
      
    }
    
  }
 
}

const totalTimer = new Timer(totalTime, totalTimeDisplay);
const currentTimer = new TaskTimer(
  currentTime,
  currentTimeDisplay,
  currentTaskDisplay,
  tasks,body
);
//Keep time consistent
let lastTime = 0;
function time(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  totalTimer.update(deltaTime);
  currentTimer.update(deltaTime);
  
  if (!totalTimer.end) requestAnimationFrame(time);
}
//Add custom tasks to current list
inputs.addEventListener("submit", (e) => {
  e.preventDefault();
  let newTask = new Task(taskName.value,taskDuration.value)
  displayCustom(newTask);
  tasks.push(newTask);
  
  totalTimer.duration += Number(taskDuration.value) * 1000;
  console.log(tasks);
  taskName.value = "";
  taskDuration.value = "";
  
  totalTimer.convertTime(totalTimer.duration);
  totalTimer.addZeros(totalTimeDisplay,totalTimer.seconds)
  timerDiv.style.opacity = '0';
  
 
});
//Start Timer
start.addEventListener("click", function () {
  currentTimer.duration += tasks[0].duration * 1000;

  container.style.animationName = "disapear";
  container.style.animationDuration = "1s";
  taskList.style.animationName='disapear';
  taskList.style.animationDuration = '1s'
  setTimeout(() => {
    container.style.display = "none";
  }, 800);
  timerDiv.style.animationName = "appear";
  timerDiv.style.animationDuration = "2s";
  timerDiv.style.top = "50%";
  timerDiv.style.fontSize = "3vw";
  timerDiv.style.paddingBottom = "5%";
  timerDiv.style.opacity = '100'
  taskList.style.display = 'none';
  time(0);
});
//Workout Presets
const presetUpper = [
  {
    n: "Get Ready!",
    t: 5,
  },
  {
    n: "Arm Circles",
    t:30
  },
  {
    n:"Rest",
    t:10
  },
  {
    n: "Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Wide Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Wide Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Close Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Close Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n:"Bicep Curls Right",
    t:45
  },
  {
    n:"Bicep Curls Left",
    t:45
  },
  {
    n:"Bicep Curls Right",
    t:45
  },
  {
    n:"Bicep Curls Left",
    t:45
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n:"Rows",
    t:45
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n:"Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Front Raise Right",
    t:45
  },
  {
    n:"Front Raise Left",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Front Raise Right",
    t:45
  },
  {
    n:"Front Raise Left",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Shoulder Press",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Shoulder Press",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Upright Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Upright Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Tricep Extensions",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Tricep Extensions",
    t:45
  },
  {
    n:"Rest",
    t:15
  },
  {
    n:"Chest Press",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Chest Press",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n: "Plank",
    t: 90,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n:"Ab Hold",
    t:60
  },
  {
    n:"Rest",
    t:10
  },
  {
    n: "Dead Bugs",
    t: 60,
  },
  {
    n:"Rest",
    t:10
  },
  {
    n: "Side Plank (Right Side)",
    t: 45,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Side Plank (Left Side)",
    t: 45,
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Leg Raises",
    t:45
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n:"Bicep Curls Right",
    t:45
  },
  {
    n:"Bicep Curls Left",
    t:45
  },
  {
    n:"Bicep Curls Right",
    t:45
  },
  {
    n:"Bicep Curls Left",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Front Raise Right",
    t:45
  },
  {
    n:"Front Raise Left",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Front Raise Right",
    t:45
  },
  {
    n:"Front Raise Left",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Shoulder Press",
    t:45
  },
  {
    n:'Rest',
    t:10
  },
  {
    n:"Shoulder Press",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Upright Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Upright Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Tricep Extensions",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Tricep Extensions",
    t:45
  },
  {
    n:"Rest",
    t:15
  },
  {
    n:"Chest Press",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Chest Press",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n: "Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Wide Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Wide Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Close Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Close Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 30,
  },
  {
    n: "Plank",
    t: 90,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Ab hold",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Dead Bugs",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Side Plank (Right Side)",
    t: 45,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Side Plank (Left Side)",
    t: 45,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n:"Leg Raises",
    t:45
  },
  {
    n:"Rest",
    t:15
  },
  {
    n:"Arm Circles",
    t:30
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Bicep Curls Right",
    t:45
  },
  {
    n:"Bicep Curls Left",
    t:45
  },
  {
    n:"Bicep Curls Right",
    t:45
  },
  {
    n:"Bicep Curls Left",
    t:45
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n:"Rows",
    t:45
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n:"Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Front Raise Right",
    t:45
  },
  {
    n:"Front Raise Left",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Front Raise Right",
    t:45
  },
  {
    n:"Front Raise Left",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Shoulder Press",
    t:45
  },
  {
    n:'Rest',
    t:10
  },
  {
    n:"Shoulder Press",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Upright Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Upright Rows",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Tricep Extensions",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Tricep Extensions",
    t:45
  },
  {
    n:'Rest',
    t:15
  },
  {
    n:"Chest Press",
    t:45
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Chest Press",
    t:45
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Wide Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Wide Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Close Push Ups",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Close Push Ups",
    t: 30,
  },
  {
    n:"Rest",
    t:10
  },
  {
    n:"Plank",
    t:90
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n:"Ab Hold",
    t:60
  },
  {
    n:"Rest",
    t:15
  },
  {
    n: "Dead Bugs",
    t: 60,
  },
  {
    n:"Rest",
    t:10
  },
  {
    n: "Side Plank (Right Side)",
    t: 45,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Side Plank (Left Side)",
    t: 45,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n:"Leg Raises",
    t:45
  },
  
];
const presetLower = [
  {
    n: "Get Ready!",
    t: 10,
  },
  {
    n: "Squat & Pulse",
    t: 30,
  },
  {
    n: "Squat & Hamstring Stretch",
    t: 30,
  },
  {
    n: "Reverse Lunge & Reach",
    t: 30,
  },
  {
    n: "Split Squat Pulses (Right)",
    t: 30,
  },
  {
    n: "Split Squat Pulses (Left)",
    t: 30,
  },
  {
    n: "Good Morning & Squat",
    t: 30,
  },
  {
    n: "Squat and Reach",
    t: 30,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Sumo Squats",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Heel Up Sumo Pulses (Right)",
    t: 50,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Heel Up Sumo Pulses (Left)",
    t: 50,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Sumo Pulses",
    t: 50,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Squats",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Squat and Hold",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Split Squats (Right)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Split Squats (Left)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Sumo Squats",
    t: 60
  },
  {
    n:"Rest",
    t: 10,
  },
  {
    n: "Sumo Squat and Hold",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Side Squats (Right)",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Side Squats (Left)",
    t: 60,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Leg Raises (Right)",
    t: 40,
  },
  {
    n: "Leg Raise Pulses (Right)",
    t: 40,
  },
  {
    n: "Leg Raise Circles (Right)",
    t: 40,
  },
  {
    n: "Donkey Pulses (Right)",
    t: 40,
  },
  {
    n: "Fire Hydrant Pulses (Right)",
    t: 40,
  },
  {
    n: "Leg Raises (Left)",
    t: 40,
  },
  {
    n: "Leg Raise Pulses (Left)",
    t: 40,
  },
  {
    n: "Leg Raise Circles (Left)",
    t: 40,
  },
  {
    n: "Donkey Pulses (Left)",
    t: 40,
  },
  {
    n: "Fire Hydrant Pulses (Left)",
    t: 40,
  },
  {
    n: "Rest",
    t: 15,
  }, {
    n: "One Leg Glute Bridge (Left)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge Pulses (Left)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge (Right)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge Pulses (Right)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Glute Bridge Walks",
    t: 40,
  },
  {
    n: "Rest",
    t: 15,
  },{
    n: "Heel Up Sumo Pulses (Right)",
    t: 50,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Heel Up Sumo Pulses (Left)",
    t: 50,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Sumo Pulses",
    t: 50,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Squats",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Side Squats (Right)",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Side Squats (Left)",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Squat and Hold",
    t: 60,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Split Squats (Right)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Split Squats (Left)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Sumo Squats",
    t: 60
  },
  {
    n:"Rest",
    t: 10,
  },
  {
    n: "Sumo Squat and Hold",
    t: 60,
  },
  {
    n:"Rest",
    t:15
  },
  {
    n: "Leg Raises (Right)",
    t: 40,
  },
  {
    n: "Leg Raise Pulses (Right)",
    t: 40,
  },
  {
    n: "Leg Raise Circles (Right)",
    t: 40,
  },
  {
    n: "Donkey Pulses (Right)",
    t: 40,
  },
  {
    n: "Fire Hydrant Pulses (Right)",
    t: 40,
  },
  {
    n: "Leg Raises (Left)",
    t: 40,
  },
  {
    n: "Leg Raise Pulses (Left)",
    t: 40,
  },
  {
    n: "Leg Raise Circles (Left)",
    t: 40,
  },
  {
    n: "Donkey Pulses (Left)",
    t: 40,
  },
  {
    n: "Fire Hydrant Pulses (Left)",
    t: 40,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "One Leg Glute Bridge (Left)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge Pulses (Left)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge (Right)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge Pulses (Right)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Glute Bridge Walks",
    t: 40,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Side Leg Raises (Right)",
    t: 40,
  },
  {
    n: "Side Leg Raise Pulses (Right)",
    t: 40,
  },
  {
    n: "Knee Tap & Kick (Right)",
    t: 40,
  },
  {
    n: "Side Clamshell (Right)",
    t: 40,
  },
  {
    n: "Side Plank Clamshell Pulses (Right)",
    t: 40,
  },
  {
    n:"Side Plank Leg Curls (Right)",
    t:40
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Side Leg Raises (Left)",
    t: 40,
  },
  {
    n: "Side Leg Raise Pulses (Left)",
    t: 40,
  },
  {
    n: "Knee Tap & Kick (Left)",
    t: 40,
  },
  {
    n: "Side Clamshell (Left)",
    t: 40,
  },
  {
    n: "Side Plank Clamshell Pulses (Left)",
    t: 40,
  },
  {
    n:"Side Plank Leg Curls (Left)",
    t:40
  }
];
//Displays preset info when clicked
upperBody.addEventListener("click", (e) => {
  for (let task of presetUpper) {
    tasks.push(new Task(task.n, task.t));
    totalTimer.duration += task.t * 1000;
  }
  totalTimer.convertTime(totalTimer.duration)
  currentTaskDisplay.innerHTML = `<h1>Upper Body Preset</h1>`;
  totalTimeDisplay.innerHTML = `<h1>Total Time: ${totalTimer.minutes}:${totalTimer.seconds}</h1>`;
  timerDiv.style.opacity = '0';
  displayPresets(presetUpper,'Upper Body Preset')
});
lowerBody.addEventListener("click", (e) => {
  for (let task of presetLower) {
    tasks.push(new Task(task.n, task.t));
    totalTimer.duration += task.t * 1000;
  }
  totalTimer.convertTime(totalTimer.duration)
  timerDiv.style.opacity = '0';
  displayPresets(presetLower,'Lower Body Preset');
});
function displayCustom(task){
  let listItem = document.createElement('div')
  listItem.innerHTML =
   `<h4>${task.name}</h4>
   <h4>00:${task.duration}</h4>
   <br />`;
  taskList.appendChild(listItem)
   
}
function displayPresets(array,title){
  let listTitle = document.createElement('h3');
  listTitle.innerText = `${title}`;
  listTitle.style.fontWeight='bolder'
  taskList.appendChild(listTitle);
  for(let task of array){
    let listItem = document.createElement('div')
    listItem.innerHTML =
     `<h4>${task.n}</h4>
     <h4>00:${task.t}</h4>
     <br />`;
    taskList.appendChild(listItem)
  }
}