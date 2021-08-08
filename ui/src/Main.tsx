import * as React from "react";
import * as ReactDOM from "react-dom";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@material-ui/core";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import serverInfo from './serverInfo.json'; 

let ip = serverInfo["server"];

interface SpectraProps {
  spectra: {}
}

export const Main: React.FC = () => {
  const [spectra, setSpectra] = React.useState({})

  React.useEffect(() => {
    fetch("http://"+ip+"/spectool/api/get_spectra")
    .then(resp => resp.json())
    .then(resp => formatScatterData(resp))
    .then(resp => setSpectra(resp))
  }, []);

  const formatScatterData = (data: {}) => {
    let newData = {};
    for (const compound in data) {
      newData[compound] = [];
      data[compound].forEach((elem: Array<number>) => {
        newData[compound].push({"x": elem[0], "y": elem[1]})
      })
    }
    return newData;
  }

  return (
    <Vis 
      spectra={spectra}
    />
  );
};

export const Vis: React.FC<SpectraProps> = ({spectra}) => {

  const [selection, setSelection] = React.useState(["select", "select", "select", "select"]);
  const [amounts, setAmounts] = React.useState([]);
  const [result, setResult] = React.useState([]);

  const compounds = Object.keys(spectra);
  const colors = ["blue", "green", "red", "cyan", "magenta", "lime", "purple", "brown"];

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>, i: number) => {
    let newSelection = selection.slice()
    let newItem = event.target.value as string;
    newSelection[i] = newItem
    setSelection(newSelection);
  };

  const handleAmount = (event: React.ChangeEvent<{ value: unknown }>, i: number) => {
    let newAmounts = amounts.slice();
    newAmounts[i] = event.target.value as number;
    setAmounts(newAmounts);
  };

  const handleCalculate = () => {
    let composition = {};
    selection.forEach((elem, indx) => {
      if (elem !== "select") {
        composition[elem] = amounts[indx];
      }
    })
    fetch("http://"+ip+"/spectool/api/calc_prob", {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(composition),
    })
    .then(response => response.json())
    .then(data => data.map((e) => {return {"x": e[0], "y": e[1]};}))
    .then(data => setResult(data))
  };

  return (
    <div style={{width: "70vw", height: "70vh", margin: "100px", display: "flex", flexDirection: "row"}}>
      <div style={{width: "50%", height: "100%"}}>
        {
          selection.map((itm, indx) => {
            return (
              <div style={{display: "flex", flexDirection: "row"}}>
                <FormControl style={{width: "200px"}}>
                  <InputLabel id={"spectra-input-label"+String(indx)}>Spectra</InputLabel>
                  <Select
                    labelId={"spectra-select-label"+String(indx)}
                    id={"spectra-select"+String(indx)}
                    value={selection[indx]}
                    onChange={(e) => handleChange(e, indx)}
                  >
                    {compounds.map((elem) => {
                      return <MenuItem value={elem}>{elem}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <TextField
                  style={{marginLeft: "20px", width: "120px"}}
                  required
                  id={"filled-required"+String(indx)}
                  label="amount (%)"
                  type="number"
                  value={amounts[indx]}
                  onChange={(e) => handleAmount(e, indx)}
                />
              </div>
            );
          })
        }
        <div>
          <Button variant="contained" color="primary" style={{marginTop: "10px"}} onClick={handleCalculate} >
            Calc
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
            width={500}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="wavelength" unit="nm" domain={[1000, 2000]} />
            <YAxis type="number" dataKey="y" name="Abs" unit="a.u." />
            <ZAxis type="number" range={[1]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            {selection.map((elem, indx) => {
              if (elem !== "select") {
                return (
                  <Scatter name={elem} data={spectra[elem]} fill={colors[indx]} line  />
                )
              }
            })}
            <Scatter name="result" data={result} fill="black" line  />
          </ScatterChart>
        </ResponsiveContainer>
    </div>
  );
}
