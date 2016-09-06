
importScripts('utilities.js', 'world.js', 'graphs.js', 'tasks.js', 'plans.js')

function monthly_loss(world) {
    return 3000 * Math.pow(world.num_workers, .8)
}

function step_world(day, world, plan) {

    // Subtract expenses once a month.  

    world.day = day
    if(day % (5 * 4) == 0)
        world.money['spent'] -= monthly_loss(world)

    new_graph_value('money', world.total_money())
    if(world.total_money() < 0)
        return true

    // Select a task and do it for this day.

    var new_task = world.tasks[plan.select_task(world)]
    if(!new_task) {
        console.log('no task')
        return true
    }
    new_task.step_task(world)
    world.prev_task = new_task
}

function single_simulation(config) {

    // Run the plan for a few years and see how it goes.

    if(config.plan.reset)
        config.plan.reset()
    new_graph_line()
    var world = new World(config)
    world.create_tasks()
    var years_to_sim = config.years_to_sim
    // (1 year * 50 weeks * 5 days )
    for(var day = 0; day < years_to_sim * 50 * 5; day++)
        if(step_world(day, world, config.plan))
            break
    return world
}

function monte_carlo(config) {

    // Run many simulations of the plan.

    for(var key in config.user_code)
        eval.apply(this, [config.user_code[key]])
    var plan_name = config.plan_name
    new_graph_set(plan_name)
    var worlds = []
    for(var i = 0; i < config.num_simulations; i++) {
        config.plan = eval('new ' + plan_name + '()')
        world = single_simulation(config)
        worlds.push(world)
    }
    return worlds
}

self.addEventListener('message', function(e) {
    try {
        var worlds = monte_carlo(e.data)
        postMessage({
            name:'render_curr_graph_set', worlds:worlds, 
            all_graph_data:all_graph_data})
    }
    catch(e) {
        debug(e.stack)
    }
}, false)


function debug(msg) {                                                           
  postMessage({type:'debug', msg:msg})
}
