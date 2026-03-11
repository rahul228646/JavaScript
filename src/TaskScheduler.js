// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

function taskA(done) {
  console.log("Task A Completed");
  done();
}
function taskB(done) {
  setTimeout(function () {
    console.log("Task B Completed");
    done();
  }, 2000);
}
function taskC(done) {
  setTimeout(function () {
    console.log("Task C Completed");
    done();
  }, 200);
}
function taskD(done) {
  console.log("Task D Completed");
  done();
}
function taskE(done) {
  console.log("Task E Completed");
  done();
}

const asyncGraph = {
  a: {
    task: taskA,
  },
  b: {
    task: taskB,
  },
  c: {
    task: taskC,
  },
  d: {
    dependency: ["a", "b"],
    task: taskD,
  },
  e: {
    dependency: ["c", "d"],
    task: taskE,
  },
};

function runAsyncGraph(graph) {
  // implement
  const scheduler = new Scheduler(graph, ()=>{
    //   console.log("done");
  })
  scheduler.start()
}


class Scheduler {
  constructor(graph, cb) {
    this.graph = graph
    this.completedTasks = new Set()
    this.totalTasks = Object.keys(graph).length
    this.finished = 0
    this.cb = cb

    // Precompute dependencies
    this.dependencyCount = {}
    this.dependents = {} // who depends on me

    for (const key in graph) {
      const deps = graph[key].dependency || []
      this.dependencyCount[key] = deps.length

      deps.forEach(dep => {
        if (!this.dependents[dep]) this.dependents[dep] = []
        this.dependents[dep].push(key)
      })
    }
  }

  start() {
    // Start tasks with 0 dependencies
    for (const key in this.graph) {
      if (this.dependencyCount[key] === 0) {
        this.runTask(key)
      }
    }
  }

  runTask(key) {
    const task = this.graph[key].task
    task(() => this.onTaskDone(key))
  }

  onTaskDone(key) {
    this.completedTasks.add(key)
    this.finished++

    // Trigger dependents
    if (this.dependents[key]) {
      this.dependents[key].forEach(depKey => {
        this.dependencyCount[depKey]--
        if (this.dependencyCount[depKey] === 0) {
          this.runTask(depKey)
        }
      })
    }

    // Call final callback
    if (this.finished === this.totalTasks) {
      this.cb && this.cb()
    }
  }
}


runAsyncGraph(asyncGraph)


