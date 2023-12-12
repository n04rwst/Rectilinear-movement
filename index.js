function ParseFunction(input) {
    input = input.replaceAll("^", "**");
    input = input.replaceAll("pi", "Math.PI");
    input = input.replaceAll("e", "Math.E");
    input = input.replaceAll("sin", "Math.sin");
    input = input.replaceAll("cos", "Math.cos");
    input = input.replaceAll("tan", "Math.tan");
    input = input.replaceAll("sqrt", "Math.sqrt");
    input = input.replaceAll("log", "Math.log");

    return new Function("t", "return " + input);
}

function drawGraphsFromX() {
    let x = document.getElementById("x-field").value;

    if (x === "") {
        window.alert("Введите функцию!")
        return;
    }

    let t = [];
    let xValues = [];
    let vValues = [];
    let aValues = [];
    let funcV = math.derivative(x, 't');
    let funcA = math.derivative(funcV.toString(), 't');
    for (let i = 0; i <= 50; i += 0.1) {
        t.push(i);
        let f = ParseFunction(x);
        xValues.push(f(i));

        let f1 = ParseFunction(funcV.toString());
        vValues.push(f1(i));

        let f2 = ParseFunction(funcA.toString());
        aValues.push(f2(i));
    }

    let graphsDiv= document.getElementById("graphs");
    graphsDiv.innerHTML = "";
    let xTrace = {
        x: t,
        y: xValues,
        type: "scatter",
        name: x
    }

    let vTrace = {
        x: t,
        y: vValues,
        type: "scatter",
        name: "Скорость"
    }

    let aTrace = {
        x: t,
        y: aValues,
        type: "scatter",
        name: "Ускорение",
    }

    let xLayout = {
        title: x,

        xaxis: {
            title: "Время, с",
            range: [0, 10]
        },

        yaxis: {
            title: "Путь, м",
            range: [-10, 10]
        }
    }

    let vLayout = {
        title: funcV.toString(),

        xaxis: {
            header: funcV.toString(),
            title: "Время, с",
            range: [0, 10]
        },

        yaxis: {
            title: "Скорость, м/c",
            range: [-10, 10]
        }
    }

    let aLayout = {
        title: funcA.toString(),

        xaxis: {
            title: "Время, с",
            range: [0, 10]
        },

        yaxis: {
            title: "Ускорение, м/c²",
            range: [-10, 10]
        }
    }

    let xGraphDiv = document.createElement("div");
    xGraphDiv.classList.add("graph");
    graphsDiv.appendChild(xGraphDiv);
    Plotly.newPlot(xGraphDiv, [xTrace], xLayout);

    let vGraphDiv = document.createElement("div");
    vGraphDiv.classList.add("graph");
    graphsDiv.appendChild(vGraphDiv);
    Plotly.newPlot(vGraphDiv, [vTrace], vLayout);

    let aGraphDiv = document.createElement("div");
    aGraphDiv.classList.add("graph");
    graphsDiv.appendChild(aGraphDiv);
    Plotly.newPlot(aGraphDiv, [aTrace], aLayout);
}

function drawGraphsFromV() {
    let v = document.getElementById("v-field").value;

    if (v === "") {
        window.alert("Введите функцию!")
        return;
    }

    let t = [];
    let xValues = [];
    let vValues = [];
    let aValues = [];
    let funcX = nerdamer("integrate(" + v +", t)");
    let funcA = math.derivative(v, 't');
    for (let i = 0; i <= 50; i += 0.1) {
        t.push(i);
        let f = ParseFunction(funcX.toString());
        xValues.push(f(i));

        let f1 = ParseFunction(v);
        vValues.push(f1(i));

        let f2 = ParseFunction(funcA.toString());
        aValues.push(f2(i));
    }

    let graphsDiv= document.getElementById("graphs");
    graphsDiv.innerHTML = "";
    let xTrace = {
        x: t,
        y: xValues,
        type: "scatter",
        name: "Путь"
    }

    let vTrace = {
        x: t,
        y: vValues,
        type: "scatter",
        name: "Скорость"
    }

    let aTrace = {
        x: t,
        y: aValues,
        type: "scatter",
        name: "Ускорение",
    }

    let xLayout = {
        title: funcX.toString(),

        xaxis: {
            title: "Время, с",
            range: [0, 10]
        },

        yaxis: {
            title: "Путь, м",
            range: [-10, 10]
        },
    }

    let vLayout = {
        title: v,

        xaxis: {
            title: "Время, с",
            range: [0, 10]
        },

        yaxis: {
            title: "Скорость, м/c",
            range: [-10, 10]
        }
    }

    let aLayout = {
        title: funcA.toString(),

        xaxis: {
            title: "Время, с",
            range: [0, 10]
        },

        yaxis: {
            title: "Ускорение, м/c²",
            range: [-10, 10]
        }
    }

    let xGraphDiv = document.createElement("div");
    xGraphDiv.classList.add("graph");
    graphsDiv.appendChild(xGraphDiv);
    Plotly.newPlot(xGraphDiv, [xTrace], xLayout);

    let vGraphDiv = document.createElement("div");
    vGraphDiv.classList.add("graph");
    graphsDiv.appendChild(vGraphDiv);
    Plotly.newPlot(vGraphDiv, [vTrace], vLayout);

    let aGraphDiv = document.createElement("div");
    aGraphDiv.classList.add("graph");
    graphsDiv.appendChild(aGraphDiv);
    Plotly.newPlot(aGraphDiv, [aTrace], aLayout);
}

function drawGraphsFromA() {
    let a = document.getElementById("a-field").value;

    if (a === "") {
        window.alert("Введите функцию!")
        return;
    }

    let t = [];
    let xValues = [];
    let vValues = [];
    let aValues = [];
    let funcV = nerdamer("integrate(" + a + ", t)");
    let funcX = nerdamer("integrate(" + funcV.toString() + ", t)");
    for (let i = 0; i <= 50; i += 0.1) {
        t.push(i);
        let f = ParseFunction(funcX.toString());
        xValues.push(f(i));

        let f1 = ParseFunction(funcV.toString());
        vValues.push(f1(i));

        let f2 = ParseFunction(a);
        aValues.push(f2(i));
    }

    let graphsDiv = document.getElementById("graphs");
    graphsDiv.innerHTML = "";
    let xTrace = {
        x: t,
        y: xValues,
        type: "scatter",
        name: "Путь"
    }

    let vTrace = {
        x: t,
        y: vValues,
        type: "scatter",
        name: "Скорость"
    }

    let aTrace = {
        x: t,
        y: aValues,
        type: "scatter",
        name: "Ускорение",
    }

    let xLayout = {
        title: funcX.toString(),

        xaxis: {
            title: "Время, с",
            range: [0, 10]
        },

        yaxis: {
            title: "Путь, м",
            range: [-10, 10]
        }
    }

    let vLayout = {
        title: funcV.toString(),

        xaxis: {
            title: "Время, с",
            range: [0, 10]
        },

        yaxis: {
            title: "Скорость, м/c",
            range: [-10, 10]
        }
    }

    let aLayout = {
        title: a,

        xaxis: {
            title: "Время, с",
            range: [0, 10]
        },

        yaxis: {
            title: "Ускорение, м/c²",
            range: [-10, 10]
        }
    }

    let xGraphDiv= document.createElement("div");
    xGraphDiv.classList.add("graph");
    graphsDiv.appendChild(xGraphDiv);
    Plotly.newPlot(xGraphDiv, [xTrace], xLayout);

    let vGraphDiv = document.createElement("div");
    vGraphDiv.classList.add("graph");
    graphsDiv.appendChild(vGraphDiv);
    Plotly.newPlot(vGraphDiv, [vTrace], vLayout);

    let aGraphDiv = document.createElement("div");
    aGraphDiv.classList.add("graph");
    graphsDiv.appendChild(aGraphDiv);
    Plotly.newPlot(aGraphDiv, [aTrace], aLayout);
}

function clearGraphs() {
    document.getElementById("x-field").value = "";
    document.getElementById("v-field").value = "";
    document.getElementById("a-field").value = "";
    document.getElementById("graphs").innerHTML = "";
}