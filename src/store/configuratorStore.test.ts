import { describe, it, expect, beforeEach } from 'vitest';
import { calculateTotalPrice, calculateInstallment, formatPrice, CarConfiguration, useConfiguratorStore } from './configuratorStore';

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

describe('configuratorStore actions', () => {
  beforeEach(() => {
    // Reset store before each test
    useConfiguratorStore.setState({
      configuration: { exteriorColor: 'glacier-blue', interiorColor: 'carbon-black', wheelType: 'aero', optionals: [] },
      orders: [],
      currentUserEmail: null,
    });
  });

  describe('toggleOptional', () => {
    it('should add an optional feature if it is not present', () => {
      const store = useConfiguratorStore.getState();
      expect(store.configuration.optionals).not.toContain('precision-park');
      
      store.toggleOptional('precision-park');
      
      const updatedStore = useConfiguratorStore.getState();
      expect(updatedStore.configuration.optionals).toContain('precision-park');
    });

    it('should remove an optional feature if it is already present', () => {
      // Setup initial state
      useConfiguratorStore.setState({
        configuration: { 
          exteriorColor: 'glacier-blue', 
          interiorColor: 'carbon-black', 
          wheelType: 'aero', 
          optionals: ['flux-capacitor'] 
        }
      });
      
      const store = useConfiguratorStore.getState();
      expect(store.configuration.optionals).toContain('flux-capacitor');
      
      store.toggleOptional('flux-capacitor');
      
      const updatedStore = useConfiguratorStore.getState();
      expect(updatedStore.configuration.optionals).not.toContain('flux-capacitor');
    });
  });

  describe('login', () => {
    const mockOrder = {
      id: 'VLO-123',
      configuration: { exteriorColor: 'glacier-blue', interiorColor: 'carbon-black', wheelType: 'aero', optionals: [] },
      totalPrice: 40000,
      customer: { name: 'John', lastname: 'Doe', email: 'john@example.com', phone: '123', cpf: '123', store: 'A' },
      paymentMethod: 'avista',
      status: 'APROVADO',
      createdAt: '2023-01-01T00:00:00Z'
    } as any;

    it('should return true and set currentUserEmail if orders with that email exist', () => {
      useConfiguratorStore.setState({
        orders: [mockOrder]
      });

      const store = useConfiguratorStore.getState();
      const loginSuccess = store.login('john@example.com');

      expect(loginSuccess).toBe(true);
      expect(useConfiguratorStore.getState().currentUserEmail).toBe('john@example.com');
    });

    it('should return false and not set currentUserEmail if no orders with that email exist', () => {
      useConfiguratorStore.setState({
        orders: [mockOrder]
      });

      const store = useConfiguratorStore.getState();
      const loginSuccess = store.login('nope@example.com');

      expect(loginSuccess).toBe(false);
      expect(useConfiguratorStore.getState().currentUserEmail).toBe(null);
    });
  });
});
