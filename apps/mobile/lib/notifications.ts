import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const KEY_ENABLED = "manna:reminder:enabled";
const KEY_HOUR = "manna:reminder:hour";
const KEY_MIN = "manna:reminder:min";
const IDENTIFIER = "manna:daily-reminder";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function getReminderState(): Promise<{
  enabled: boolean;
  hour: number;
  minute: number;
}> {
  const [e, h, m] = await Promise.all([
    AsyncStorage.getItem(KEY_ENABLED),
    AsyncStorage.getItem(KEY_HOUR),
    AsyncStorage.getItem(KEY_MIN),
  ]);
  return {
    enabled: e === "1",
    hour: h ? Number(h) : 8,
    minute: m ? Number(m) : 0,
  };
}

export async function scheduleDailyReminder(args: {
  hour: number;
  minute: number;
  title: string;
  body: string;
  persistOnly?: boolean;
}): Promise<boolean> {
  await AsyncStorage.setItem(KEY_HOUR, String(args.hour));
  await AsyncStorage.setItem(KEY_MIN, String(args.minute));

  if (args.persistOnly) return true;

  const perm = await Notifications.getPermissionsAsync();
  let granted = perm.granted;
  if (!granted) {
    const req = await Notifications.requestPermissionsAsync();
    granted = req.granted;
  }
  if (!granted) {
    await AsyncStorage.setItem(KEY_ENABLED, "0");
    return false;
  }

  await Notifications.cancelScheduledNotificationAsync(IDENTIFIER).catch(() => {});

  await Notifications.scheduleNotificationAsync({
    identifier: IDENTIFIER,
    content: { title: args.title, body: args.body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: args.hour,
      minute: args.minute,
    },
  });
  await AsyncStorage.setItem(KEY_ENABLED, "1");
  return true;
}

export async function cancelDailyReminder(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(IDENTIFIER).catch(() => {});
  await AsyncStorage.setItem(KEY_ENABLED, "0");
}
