import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../../App';
import { colors, common } from '../../theme';
import Field from '../../components/Field';
import Button from '../../components/Button';
import { useLoginViewModel } from '../../../viewmodels/useLoginViewModel';

type P = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: P) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rol,
    setRol,
    loading,
    error,
    login,
  } = useLoginViewModel(() => navigation.replace('Dashboard'));

  return (
    <SafeAreaView style={common.screen}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: 'center',
        }}
      >
        <View style={[common.card, { padding: 24 }]}>
          <Image
            source={require('../../../../assets/logo-sena-parking.png')}
            style={{
              width: 120,
              height: 120,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />

          <Text
            style={{
              fontSize: 25,
              fontWeight: '900',
              textAlign: 'center',
              color: colors.dark,
              marginBottom: 20,
            }}
          >
            SENA PARKING
          </Text>

          <Text style={[common.label, { marginTop: 0 }]}>
            ROL
          </Text>

          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              marginBottom: 5,
            }}
          >
            {['aprendiz', 'guarda', 'administrador'].map((x) => (
              <TouchableOpacity
                key={x}
                onPress={() => setRol(x)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 9,
                  borderWidth: 1,
                  borderColor:
                    rol === x ? colors.primary : colors.border,
                  backgroundColor:
                    rol === x ? colors.light : '#fff',
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    textAlign: 'center',
                    fontWeight: '700',
                    color:
                      rol === x ? colors.dark : colors.text,
                  }}
                >
                  {x}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Field
            label="CORREO"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Field
            label="CONTRASEÑA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={{ marginTop: 20 }}>
            <Button
              title="INICIAR SESIÓN"
              onPress={login}
              loading={loading}
            />
          </View>

          {error ? (
            <Text
              style={[
                common.error,
                { marginTop: 12, textAlign: 'center' },
              ]}
            >
              {error}
            </Text>
          ) : null}

          <View
            style={{
              marginTop: 18,
              alignItems: 'center',
              gap: 14,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text
                style={{
                  color: colors.dark,
                  fontWeight: '700',
                }}
              >
                ¿No tienes una cuenta? Regístrate
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Recovery')}
            >
              <Text
                style={{
                  color: colors.dark,
                  fontWeight: '700',
                }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{
                marginTop: 4,
                paddingVertical: 8,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: '800',
                  fontSize: 15,
                }}
              >
                ← Volver al inicio
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}