import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Text, View } from "react-native";

describe("Configuración de Jest en Frontend", () => {
  test("Jest funciona con JSX", () => {
    const elemento = <Text>Hola Profe Albeiro ¿como esta?</Text>;

    expect(elemento).toBeTruthy();
  });

  test("React Native Testing Library renderiza componentes", async () => {
    await render(
      <View>
        <Text>Hola Profe Albeiro</Text>
      </View>,
    );

    expect(screen.getByText("Hola Profe Albeiro")).toBeTruthy();
  });
});
