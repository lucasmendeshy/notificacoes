import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
/* Manipulador de eventos de notificações */
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    /* Necessário para IOS */
    async function permissoesIos() {
      return Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
          allowAnnouncements: true,
        },
      });
    }
    permissoesIos();

    /* Ouvinte de evento para as notificações recebidas, ou seja, quando a notificação aparece no topo da tela do dispositivo. */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    /* Ouvinte de evento para as respostas dada às notificações, ou seja, quando o usuário interage (toca) na notificação. */
    Notifications.addNotificationReceivedListener((resposta) => {
      console.log(resposta);
    });
  }, []);

  const enviarMensagem = async () => {
    const mensagem = {
      title: "Lembrete!",
      body: "Não se esqueça de tomar água!",
      sound: "default", // necessário pro ios
    };

    /* Função de agendamento de notificações */
    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: { seconds: 1 },
    });
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={estilos.container}>
        <Text style={estilos.titulo}>
          Exemplo de sistema de notificação local
        </Text>

        <Pressable style={estilos.botao} onPress={enviarMensagem}>
          <Text style={estilos.textoBotao}>disparar notificação</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 20,
    marginVertical: 15,
  },
  botao: {
    padding: 12,
    borderRadius: 2,
    backgroundColor: "blue",
    width: "90%",
  },
  textoBotao: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
