import { describe, it, expect, vi } from 'vitest';
import { dbOrderToOrder, generateOrderNumber, DbOrder } from './useOrders';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('useOrders', () => {
  describe('generateOrderNumber', () => {
    it('should generate an order number with the correct prefix and length', () => {
      const orderNumber = generateOrderNumber();
      expect(orderNumber).toMatch(/^VLO-[A-Z0-9]{6}$/);
      expect(orderNumber.length).toBe(10);
    });

    it('should generate unique order numbers', () => {
      const order1 = generateOrderNumber();
      const order2 = generateOrderNumber();
      expect(order1).not.toBe(order2);
    });
  });

  describe('dbOrderToOrder', () => {
    it('should correctly format a DbOrder into an Order object', () => {
      const mockDbOrder: DbOrder = {
        id: '1',
        order_number: 'VLO-123456',
        color: 'glacier-blue',
        wheel_type: 'sport',
        optionals: ['precision-park'],
        customer_name: 'John Doe Silva',
        customer_email: 'john@example.com',
        customer_phone: '999999999',
        customer_cpf: '12345678901',
        payment_method: 'avista',
        total_price: 45500,
        status: 'APROVADO',
        created_at: '2023-10-10T10:00:00Z',
        updated_at: '2023-10-10T10:00:00Z',
      };

      const order = dbOrderToOrder(mockDbOrder);

      expect(order.id).toBe('VLO-123456');
      expect(order.configuration.exteriorColor).toBe('glacier-blue');
      expect(order.configuration.wheelType).toBe('sport');
      expect(order.configuration.optionals).toEqual(['precision-park']);
      
      // Test firstName and lastName splitting
      expect(order.customer.name).toBe('John');
      expect(order.customer.lastname).toBe('Doe Silva');
      
      expect(order.customer.email).toBe('john@example.com');
      expect(order.totalPrice).toBe(45500);
      expect(order.status).toBe('APROVADO');
      expect(order.paymentMethod).toBe('avista');
    });

    it('should handle DbOrder without optionals (null array)', () => {
      const mockDbOrder: DbOrder = {
        id: '2',
        order_number: 'VLO-654321',
        color: 'midnight-black',
        wheel_type: 'aero',
        optionals: null,
        customer_name: 'Maria',
        customer_email: 'maria@example.com',
        customer_phone: '888888888',
        customer_cpf: '10987654321',
        payment_method: 'financiamento',
        total_price: 40000,
        status: 'EM_ANALISE',
        created_at: '2023-10-11T10:00:00Z',
        updated_at: '2023-10-11T10:00:00Z',
      };

      const order = dbOrderToOrder(mockDbOrder);

      expect(order.configuration.optionals).toEqual([]); // Fallbacks to empty array
      expect(order.customer.name).toBe('Maria');
      expect(order.customer.lastname).toBe(''); // No lastname case
    });
  });
});
