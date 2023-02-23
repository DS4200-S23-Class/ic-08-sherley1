/*
D3 Class Demo 2 
Xiaoli Fang 
Modified: 02/15/2023
*/

// First, we need a frame  
// First, we need a frame  
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// Use d3.csv() to load data from a CSV file
d3.csv("data/data.csv").then(data => {

  // Log the loaded data to the console
  console.log(data);

  // Define the chart dimensions
const chartWidth = 500;
const chartHeight = 300;

// Define the bar dimensions
const barPadding = 10;
const barWidth = (chartWidth - MARGINS.left - MARGINS.right) / data.length - barPadding;


  // Create the chart
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);


  // Create x and y scales
const xScale = d3.scaleBand()
  .domain(data.map(d => d.Category))
  .range([MARGINS.left, chartWidth - MARGINS.right])
  .padding(0.1);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.Value)])
  .range([chartHeight - MARGINS.bottom, MARGINS.top]);

// Create x and y axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Append the x and y axes
svg.append("g")
  .attr("transform", `translate(0, ${chartHeight - MARGINS.bottom})`)
  .call(xAxis);

svg.append("g")
  .attr("transform", `translate(${MARGINS.left}, 0)`)
  .call(yAxis);

// Create the bars
svg.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => xScale(d.Category))
  .attr("y", d => yScale(d.Value))
  .attr("width", xScale.bandwidth() - barPadding)
  .attr("height", d => chartHeight - MARGINS.bottom - yScale(d.Value))
  .attr("fill", "steelblue");


});
