import './App.css'
import { Calculator } from './components/Calculator'
import { CalculatorProvider } from './contexts/CalculatorContext'
import { Header } from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CalculatorProvider>
          <Calculator />
        </CalculatorProvider>
      </main>
    </div>
  );
}

export default App
