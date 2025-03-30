import './App.css'
import { Calculator } from './components/Calculator'
import { CalculatorProvider } from './contexts/CalculatorContext'
import { Header } from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    </div>
  );
}

export default App
