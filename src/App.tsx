import './App.css'
import { Calculator } from './components/Calculator'
import { CalculatorProvider } from './contexts/CalculatorContext'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    </div>
  );
}

export default App
