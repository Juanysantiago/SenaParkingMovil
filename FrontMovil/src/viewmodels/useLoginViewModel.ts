import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, messageOf } from '../models/api/api';

export const useLoginViewModel = (
  onLoginSuccess: () => void
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('aprendiz');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      setError('El correo y la contraseña son obligatorios');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const r = await auth.login(email.trim(), password, rol);

      console.log('LOGIN RESPUESTA:', r.data);

      if (!r.data?.accessToken) {
        setError(
          r.data?.message ||
            'El servidor no devolvió el token de acceso'
        );
        return;
      }

      await AsyncStorage.setItem('accessToken', r.data.accessToken);

      if (r.data.user) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify(r.data.user)
        );
      }

      onLoginSuccess();
    } catch (e: any) {
      console.log(
        'ERROR LOGIN:',
        e?.response?.data || e?.message || e
      );
      setError(messageOf(e));
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rol,
    setRol,
    loading,
    error,
    login,
  };
};