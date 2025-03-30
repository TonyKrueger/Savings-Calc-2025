import decreasedHeatLoss from '../assets/arrow-decreased-heat-loss.png';
import increasedHeatLoss from '../assets/arrow-increased-heat-loss.png';

export function FuelBurnRate() {
  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-xl font-semibold text-center mb-6">Factors that affect your fuel burn rate</h2>
      
      <div className="flex justify-between gap-4 mb-8">
        <img 
          src={decreasedHeatLoss} 
          alt="Factors leading to lower fuel consumption" 
          className="w-1/2"
        />
        <img 
          src={increasedHeatLoss} 
          alt="Factors leading to higher fuel consumption" 
          className="w-1/2"
        />
      </div>

      <div className="text-sm text-gray-600 space-y-4">
        <p>
          Be sure to consult a dealer when sizing. Previous heating efficiences, and heat loss need to be considered when sizing a furnace. 
          This is only a guideline. The sizing calculation estimates the existing fossil fuel (heating oil, propane, natural gas) heating 
          equipment performing at 75% efficiency.
        </p>
        <p>
          This calculator estimates your cost savings based on the assumption that you obtain your own firewood at no cost to you. 
          In addition, the calculation is based on the alternate energy costs and units of energy that you supply. If the costs or 
          units of energy vary over time the actual cost savings could be more or less. The results that you obtain from the calculator 
          are therefore not a guarantee of annual cost savings that you can expect to realize.
        </p>
      </div>
    </div>
  );
} 