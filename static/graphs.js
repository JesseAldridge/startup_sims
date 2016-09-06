
function plot_data(data, graph_id) {

    // Plot data, time on x-axis, commas on y-axis.

    $.plot($('#' + graph_id), data.layers, {
        xaxis: {
            mode: "time",
            timeformat: "%Y",
        },
        yaxis: {
            tickFormatter: function numberWithCommas(x) {
                var regex = /\B(?=(?:\d{3})+(?!\d))/g
                return '$' + x.toString().replace(regex, ",")
            },
            min:0
        }
    })
}

var graph_names = ['money', 'work_done']
var curr_plan_name = null

function get_curr_graph_set() {
    return all_graph_data[curr_plan_name]
}

function new_graph_set(plan_name) {
    curr_plan_name = plan_name
    graph_set = {}
    all_graph_data[plan_name] = graph_set
    for(var i in graph_names)
        graph_set[graph_names[i]] = {markings:[], layers:[]}
}

function new_graph_line() {
    var curr_graph_set = get_curr_graph_set()
    for(var graph_name in curr_graph_set)
        curr_graph_set[graph_name].layers.push([])
}

var graph_start = new Date()
function new_graph_value(graph_name, val) {
    var curr_graph_set = get_curr_graph_set()
    var graph = curr_graph_set[graph_name]
    var last_layer = graph.layers[graph.layers.length - 1]
    var date = new Date()
    // (* 7./5 to go from work week to calendar week)
    date.setDate(graph_start.getDate() + (last_layer.length + 1) * 7./5)
    last_layer.push([date, val])
}

function new_graph_marking(graph_name, marking) {
    get_curr_graph_set()[graph_name].markings.push(marking)
}

function render_curr_graph_set(plan_name, worlds, graph_names, selector) {

    var survivals = 0
    for(var i = 0; i < worlds.length; i++)
        if(worlds[i].total_money() > 0)
            survivals += 1
    var survival_rate = Math.round(survivals / worlds.length * 100)

    // Create a div for the current graph set.

    var plan_div = (
        '<div class="plan_div">' +
        '<div class="header">' +
            '<div class="label">{text}</div>' +
            '<div class="survival">survival rate: {survival}%</div>' +
        '</div>').replace(
        '{text}', plan_name).replace('{survival}', survival_rate)
    for(var i = 0; i < graph_names.length; i++) {
        var graph_id = 'graph_{set}_{name}'.replace(
            '{set}', plan_name).replace('{name}', graph_names[i])
        plan_div += (
            '<div class="graph_container">{label}' + 
            '<div id="{id}" class="graph"></div>'.replace('{id}', graph_id) +
            '</div>').replace(
            '{label}', graph_names.length > 1 ? 
                '<p>{text}</p>'.replace('{text}', graph_names[i]) : '')
    }
    plan_div += '</div>'
    $(selector).replaceWith(plan_div)

    // Plot the data for each new graph.

    for(var i = 0; i < graph_names.length; i++) {
        var graph_id = 'graph_{set}_{name}'.replace(
            '{set}', plan_name).replace('{name}', graph_names[i])    
        var graph_data = all_graph_data[plan_name][graph_names[i]]
        plot_data(graph_data, graph_id)
    }
}

var all_graph_data = {}
