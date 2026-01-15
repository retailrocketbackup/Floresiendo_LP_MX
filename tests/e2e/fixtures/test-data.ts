/**
 * Conekta Test Card Numbers
 * @see https://developers.conekta.com/docs/pruebas
 */
export const TEST_CARDS = {
  SUCCESS: {
    number: '4242424242424242',
    month: '12',
    year: '26',
    cvc: '123',
  },
  DECLINED: {
    number: '4000000000000002',
    month: '12',
    year: '26',
    cvc: '123',
  },
  INSUFFICIENT_FUNDS: {
    number: '4000000000000069',
    month: '12',
    year: '26',
    cvc: '123',
  },
} as const;

export const TEST_CUSTOMER = {
  name: 'Juan Prueba Garcia',
  email: 'test@floresiendo.test',
  phone: '+521234567890',
};

export const PAYMENT_PRODUCTS = {
  DEPOSIT: {
    id: 'DEPOSIT',
    name: 'Anticipo - Encuentro Febrero 2026',
    amount: 300000,
    buttonText: 'Reservar Ahora',
  },
  TWO_NIGHTS: {
    id: 'TWO_NIGHTS_EARLY',
    name: 'Retiro 2 Noches - Precio Especial',
    amount: 710000,
    buttonText: 'Invertir $7,100',
  },
  THREE_NIGHTS: {
    id: 'THREE_NIGHTS_EARLY',
    name: 'Retiro 3 Noches - Precio Especial',
    amount: 1020000,
    buttonText: 'Invertir $10,200',
  },
} as const;
