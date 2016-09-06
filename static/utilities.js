
function random_val(obj) {
    var keys = Object.keys(obj)
    return obj[keys[Math.floor(Math.random() * keys.length)]]
}

function rand_range(min, max) {
    return Math.random() * (max - min) + min
}

function weighted_choice(choices) {
    if(Object.keys(choices).length == 0)
        return null
    var total = 0
    for(var key in choices)
        total += choices[key]
    var rand = Math.random() * total
    var upto = 0
    for(var key in choices) {
        var weight = choices[key]
        if(upto + weight > rand)
            return key
        upto += weight
    }
}

function RepeatingTask() {}
RepeatingTask.prototype.step_task = function(world) {
    if(Math.random() < this.daily_chance_of_success(world)) {
        this.num_successes_til_done -= 1
        this.on_success(world)
        if(this.num_successes_til_done <= 0)
            world.delete_task(this.task_name)
    }
}
