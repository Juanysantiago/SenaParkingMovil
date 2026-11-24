import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Button from '../../views/components/Button';

describe('Nivel 1: Pruebas Unitarias - Frontend', () => {

  test('UT-01: Button debe mostrar el texto recibido', async () => {
    await render(<Button title="Iniciar sesión" onPress={() => {}} />);
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
  });

  test('UT-02: Button debe ejecutar onPress al pulsarlo', async () => {
    const funcionPress = jest.fn();
    await render(<Button title="Ingresar" onPress={funcionPress} />);
    await fireEvent.press(screen.getByText('Ingresar'));
    expect(funcionPress).toHaveBeenCalledTimes(1);
  });

  test('UT-03: Button debe deshabilitarse cuando está cargando', async () => {
    await render(<Button title="Cargando" onPress={() => {}} loading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

});