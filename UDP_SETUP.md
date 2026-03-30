# Direct UDP Telemetry (Phone)

This app can listen to F1 telemetry packets directly on your phone via UDP.

## Important

- `react-native-udp` is a native module.
- It will **not** work in Expo Go.
- Use a native development build (`expo run:android` / `expo run:ios`).

## 1) Build and run native app

```bash
npm install
npm run prebuild
npm run run:android
```

For iOS:

```bash
npm run prebuild
npm run run:ios
```

## 2) Connect game telemetry to phone

In F1 game telemetry settings:

- UDP Telemetry: `On`
- UDP Port: `20777`
- UDP IP: your phone's local IP (same Wi-Fi/LAN)

## 3) Verify in app

On dashboard header:

- `UDP ON | CONNECTED | PORT 20777` means live packets are arriving.
- If it shows `WAITING`, check phone IP and game UDP target IP.

## Notes

- Current parser reads live `speed`, `rpm`, `gear`, `throttle`, `brake`.
- Other fields continue with simulation fallback for now.
