
function StandardPlan() { this.plan_name = 'StandardPlan' }
StandardPlan.prototype.reset = function() {
    /* 
    1. Find a cofounder
    2. Build a prototype
    3. Raise money
    4. Make something people want
    */

    this.task_names = [
        'FindCofounder', 'BuildPrototype', 'RaiseMoney', 'MakeSomething']
}
StandardPlan.prototype.select_task = function(world) {
    var task_names = this.task_names
    while(task_names.length > 0) {
        var task_name = task_names[0]
        // (When a task is completed, it is removed from world.tasks)
        if(world.tasks[task_name])
            return task_name
        task_names.shift()
    }
}

function StandardImprove() { this.plan_name = 'StandardImprove' }
StandardImprove.prototype.reset = function() {
    this.task_names = ['FindCofounder', 'BuildPrototype', 'RaiseMoney']
}
StandardImprove.prototype.select_task = function(world) {

    /* 
    1. Find a cofounder
    2. Build a prototype
    3. Raise money
    4. Spend half your time making something people want and half improving 
       your productivity.
    */

    var task_names = this.task_names
    while(task_names.length > 0) {
        var task_name = task_names[0]
        // (When a task is completed, it is removed from world.tasks)
        if(world.tasks[task_name])
            return task_name
        task_names.shift()
    }
    if(Math.random() > .5)
        return 'MakeSomething'
    return 'ImproveProductivity'
}

function HistoricalPlan() { this.plan_name = 'HistoricalPlan' }
HistoricalPlan.prototype.reset = function(world) {
    // Historically, I've tended to focus on building stuff, while making
    // sporadic, half-assed efforts at finding a cofounder or talking to 
    // investors.
    this.weights = {
        'BuildPrototype':1, 'FindCofounder':.1, 'RaiseMoney':.01,
        'ImproveProductivity':1, 'MakeSomething':1}
}
HistoricalPlan.prototype.select_task = function(world) {

    // Weighted random selection based on the above mapping.

    while(Object.keys(world.tasks).length > 0) {
        var choice = weighted_choice(this.weights)
        if(world.tasks[choice])
            return choice
        delete this.weights[choice]
    }
}

var plan_names = ['HistoricalPlan', 'StandardPlan', 'StandardImprove']

