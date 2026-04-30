import { describe, it, expect } from 'vitest';
import { calculateTotalPrice, calculateInstallment, formatPrice, CarConfiguration } from './configuratorStore';

describe('configuratorStore pure functions', () => {
  describe('calculateTotalPrice', () => {
    it('should return the base price when no optionals are selected and wheel is aero', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: []
      };
      
      const total = calculateTotalPrice(config);
      expect(total).toBe(40000); // Preço base
    });

    it('should add sport wheels price to the total', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: []
      };
      
      const total = calculateTotalPrice(config);
      expect(total).toBe(42000); // 40000 (base) + 2000 (sport wheels)
    });

    it('should add optionals price to the total', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: ['precision-park', 'flux-capacitor']
      };
      
      const total = calculateTotalPrice(config);
      expect(total).toBe(50500); // 40000 (base) + 5500 (precision-park) + 5000 (flux-capacitor)
    });

    it('should correctly sum sport wheels and optionals', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: ['precision-park']
      };
      
      const total = calculateTotalPrice(config);
      expect(total).toBe(47500); // 40000 (base) + 2000 (sport) + 5500 (precision-park)
    });
  });

  describe('calculateInstallment', () => {
    it('should calculate installment correctly for 12 months with 2% interest rate', () => {
      const total = 40000;
      const installment = calculateInstallment(total);
      
      // Validação do valor da parcela simulada em 12x com juros compostos.
      expect(installment).toBe(3782.38); 
    });
  });

  describe('formatPrice', () => {
    it('should format a number to BRL currency string', () => {
      const formatted = formatPrice(40000);
      
      // Removemos espaços irregulares (non-breaking spaces) p/ garantir validação universal
      const normalizedString = formatted.replace(/\u00A0/g, ' '); 
      
      expect(normalizedString).toContain('40.000,00');
      expect(normalizedString).toContain('R$');
    });
  });
});
