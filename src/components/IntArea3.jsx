import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const evaluateExpression = (expr, x) => {
  try {
    let processedExpr = expr
      .replace(/\^/g, '**')
      .replace(/(^|\D)-/g, '$1-1*')
      .replace(/Math\./g, '')
      .replace(/[^0-9x+\-*/(). \s]/g, '')
      .replace(/x/g, `(${x})`)
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/abs/g, 'Math.abs')
      .replace(/exp/g, 'Math.exp')
      .replace(/log/g, 'Math.log');

    const result = Function('Math', `return ${processedExpr}`)(Math);
    return isFinite(result) ? result : NaN;
  } catch (error) {
    console.error('Erro ao avaliar expressão:', error);
    return NaN;
  }
};

const calculateArea = (func, start, end, steps = 5000) => {
  const dx = (end - start) / steps;
  let area = 0;
  
  for (let i = 0; i < steps; i++) {
    const x1 = start + i * dx;
    const x2 = x1 + dx;
    const y1 = evaluateExpression(func, x1);
    const y2 = evaluateExpression(func, x2);
    
    if (!isNaN(y1) && !isNaN(y2)) {
      area += (y1 + y2) * dx / 2;
    }
  }
  
  return Math.abs(area);
};

const predefinedExamples = [
  { name: 'Triângulo', functions: [{ expr: 'x', start: '0', end: '2' }] },
  { name: 'Parábola', functions: [{ expr: 'x^2', start: '0', end: '2' }] },
  { name: 'Senoidal', functions: [{ expr: 'sin(x)', start: '0', end: '3.14159' }] },
  { name: 'Entre Curvas', functions: [
    { expr: 'x^2', start: '0', end: '2' },
    { expr: '2*x', start: '0', end: '2' }
  ]},
  { name: 'Exponencial', functions: [{ expr: 'exp(x)', start: '0', end: '2' }] }
];

const FunctionAreaCalculator = () => {
  const [functions, setFunctions] = useState([{ expr: '', start: '', end: '' }]);
  const [graphData, setGraphData] = useState([]);
  const [totalArea, setTotalArea] = useState(null);
  const [error, setError] = useState('');

  const generatePoints = (functions, points = 500) => {
    if (functions.length === 0) return [];

    const data = [];
    const [start, end] = functions.reduce(
      ([min, max], func) => [
        Math.min(min, parseFloat(func.start)),
        Math.max(max, parseFloat(func.end))
      ],
      [Infinity, -Infinity]
    );

    for (let i = 0; i <= points; i++) {
      const x = start + (i / points) * (end - start);
      const point = { x };
      
      functions.forEach((func, index) => {
        if (x >= parseFloat(func.start) && x <= parseFloat(func.end)) {
          point[`y${index}`] = evaluateExpression(func.expr, x);
        }
      });
      
      data.push(point);
    }

    return data;
  };

  useEffect(() => {
    try {
      const validFunctions = functions.filter(
        func => func.expr && func.start !== '' && func.end !== ''
      );
      
      const graphData = generatePoints(validFunctions);
      setGraphData(graphData);

      const totalAreaSum = validFunctions.reduce((sum, func) => {
        return sum + calculateArea(func.expr, parseFloat(func.start), parseFloat(func.end));
      }, 0);

      setTotalArea(totalAreaSum);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Erro ao calcular: verifique as entradas');
    }
  }, [functions]);

  const addFunction = () => {
    setFunctions([...functions, { expr: '', start: '', end: '' }]);
  };

  const removeFunction = (index) => {
    const newFunctions = functions.filter((_, i) => i !== index);
    setFunctions(newFunctions);
  };

  const updateFunction = (index, field, value) => {
    const newFunctions = [...functions];
    newFunctions[index] = { ...newFunctions[index], [field]: value };
    setFunctions(newFunctions);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Calculadora de Área entre Funções
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-6">
        {functions.map((func, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              placeholder="Função f(x)"
              value={func.expr}
              onChange={(e) => updateFunction(index, 'expr', e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Início"
              value={func.start}
              onChange={(e) => updateFunction(index, 'start', e.target.value)}
              className="w-24 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Fim"
              value={func.end}
              onChange={(e) => updateFunction(index, 'end', e.target.value)}
              className="w-24 p-2 border rounded"
            />
            {functions.length > 1 && (
              <button
                onClick={() => removeFunction(index)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Remover
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mb-6">
        <button
          onClick={addFunction}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          <p>
          Adicionar Função
          </p>
        </button>

        <div className="space-x-2">
          {predefinedExamples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setFunctions(example.functions)}
              className="bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300"
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>

      {totalArea !== null && (
        <div className="bg-green-100 p-4 rounded text-center mb-6">
          <p className="text-lg font-semibold text-black">
            Área Total: {totalArea.toFixed(4)} unidades quadradas
          </p>
        </div>
      )}

      <div className="w-full h-96">
        <ResponsiveContainer>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x" 
              type="number"
              domain={['auto', 'auto']}
              label={{ value: 'x', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis 
              type="number"
              domain={['auto', 'auto']}
              label={{ value: 'f(x)', angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip />
            <Legend />
            {functions.map((func, idx) => (
              <Line
                key={idx}
                type="monotone"
                dataKey={`y${idx}`}
                stroke={COLORS[idx % COLORS.length]}
                dot={false}
                strokeWidth={2}
                name={`f${idx + 1}(x) = ${func.expr}`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FunctionAreaCalculator;