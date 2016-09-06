
function MakeSomething(world) {
    this.start_project(world)
    this.task_name = 'MakeSomething'
}

MakeSomething.prototype.step_task = function(world) {
    var productivity = world.productivity()
    this.work_done += productivity
    world.work_done += productivity
    // (1 unit of work = output of 1 day of work at my
    //  2013 productivity level)
    if(this.work_done > this.work_needed) {
        world.money['earned'] += this.potential_money
        world.projects_completed += 1
        this.start_project(world)
    }
}

MakeSomething.prototype.start_project = function(world) {
    this.work_done = 0
    this.work_needed = rand_range(Math.pow(10, 2), Math.pow(10, 4))
    this.potential_money = rand_range(Math.pow(10, 0), Math.pow(10, 10))
}

function BuildPrototype(world) {
    this.start_project(world)
    this.task_name = 'BuildPrototype'
}

BuildPrototype.prototype.step_task = function(world) {
    var productivity = world.productivity()
    this.work_done += productivity
    world.work_done += productivity
    // (1 unit of work = output of 1 day of work at my
    //  2013 productivity level)
    if(this.work_done > this.work_needed) {
        world.money['earned'] += this.potential_money
        world.projects_completed += 1
        this.start_project(world)
    }
}

BuildPrototype.prototype.start_project = function(world) {
    this.work_done = 0
    this.work_needed = rand_range(Math.pow(10, 1), Math.pow(10, 2))
    this.potential_money = rand_range(Math.pow(10, 0), Math.pow(10, 6))
}

function FindCofounder() {
    RepeatingTask.call(this)
    this.num_successes_til_done = 1
    this.task_name = 'FindCofounder'
}
FindCofounder.prototype = Object.create(RepeatingTask.prototype)


FindCofounder.prototype.on_success = function(world) {
    var amount = rand_range(5000, 100000)
    world.num_workers += 1
    world.money['raised'] += amount
}

FindCofounder.prototype.daily_chance_of_success = function(world) {
    return .01
}


function RaiseMoney() {
    RepeatingTask.call(this)
    this.num_successes_til_done = 5
    this.task_name = 'RaiseMoney'
}
RaiseMoney.prototype = Object.create(RepeatingTask.prototype);

RaiseMoney.prototype.daily_chance_of_success = function(world) {
    var chance = .001
    if(world.num_workers > 1)
        chance *= 10
    return chance
}

RaiseMoney.prototype.on_success = function(world) {
    var amount = rand_range(Math.pow(10, 4), Math.pow(10, 6))
    world.money['raised'] += amount
}


function ImproveProductivity() {
    this.task_name = 'ImproveProductivity'
}

ImproveProductivity.prototype.step_task = function (world) {
    if(Math.random() < .5)
        world.indiv_productivity *= 1.01
}

var task_names = [
    'MakeSomething', 'FindCofounder', 'RaiseMoney', 'ImproveProductivity']
