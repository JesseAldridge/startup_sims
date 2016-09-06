
function World(config) {
    if(!config)
        config = {starting_cash:0, starting_workers:1}
    this.money = {
        'spent':0, 'raised':config.starting_cash, 'earned':0}
    this.num_workers = config.starting_workers
    this.prev_task = null
    this.verbose = false
    this.indiv_productivity = 1.
    this.projects_completed = 0
    this.work_done = 0
    this.tasks = {}
}

World.prototype.total_money = function() {
    var total = 0
    for(var key in this.money)
        total += this.money[key]
    return total
}

World.prototype.create_tasks = function() {
    for(var i in task_names)
        this.tasks[task_names[i]] = eval('new ' + task_names[i] + '(this)')
}

World.prototype.delete_task = function(task_name) {
    delete this.tasks[task_name]
}

World.prototype.productivity = function() {
    return this.indiv_productivity * this.num_workers
}