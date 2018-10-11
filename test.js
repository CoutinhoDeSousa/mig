var legend_width = 120;

var margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 860 - margin.left - margin.right+legend_width,
    height = 500 - margin.top - margin.bottom;
d3.csv("daten.csv", function(error, data) {
    // color.domain(d3.keys(data[1]).filter(function(key){return key != 'type'}))
    if (error) throw error;
    let ages = [];

    // format the data
    data.forEach(function (d) {
        d.year = +d.year;
        d.type = d.type;
        d.gender = d.gender;
        d.ages = [];
        d.mixType = d.type + ";" + d.gender;
        for (let i = 0; i < 100; i++) {
            let age = i.toString();
            //d.ages.concat(d[age]);
            d.ages.push(parseFloat(d[age]));
        }
        d.amount = 0;
        for (let i = 0; i < d.ages.length; i++) {
            d.amount += +d.ages[i];
        }
        //for(let i=0; i < d.)
    });


    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right+legend_width)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);
    /*
    var xScale = d3.scaleLinear()
        .domain(
            [d3.min([0,d3.min(data,function(d){return d.year;})]),
                d3.max([0,d3.max(data,function(d){return d.year;})])]
        )
        .range([0,width]);

    var yScale = d3.scaleLinear()
        .domain(
        [d3.min([0,d3.min(data,function(d){return d.amount;})]),
            d3.max([0,d3.max(data,function(d){return d.amount;})])]
        )
        .range([height,0]);
    */
    //x.domain(data.map(function(d){return d.type;}));
    x.domain(data.map(function(d){return d.mixType;}));
    y.domain([0,d3.max(data,function(d){return d.amount;})]);

    var svg = d3.select('body').append('svg')
        .attr('height',height+margin.top + margin.bottom)
        .attr('width',width+margin.left +margin.right)
        .append('g')
        .attr('transform','translate('+margin.left + ','+margin.top+')');

    var bars = svg.selectAll('rect').data(data)
        .enter()
        .append('rect')
        .attr("class","bar")
        //.attr("x",function(d) {return x(d.type);})
        .attr("x",function(d) {return x(d.mixType);})
        .attr("width",x.bandwidth())
        .attr("y",function(d){return y(d.amount)})
        .attr("height",function(d){return height - y(d.amount);});

    svg.append("g").attr("transform","translate(0,"+height+")")
        .call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));
});
