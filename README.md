# TODO-LIST

Aplicación TODO-LIST desarrollada con **Ionic + Cordova + Angular**.

Repositorio:
https://github.com/mgonzalez0889/todo_seti.git

---

# 📦 Requisitos

- Node.js LTS
- npm
- Cordova CLI (opcional global)

```bash
npm install -g cordova
```

- Java JDK 11 o superior
- Android SDK configurado (`ANDROID_HOME`)
- Android Studio (opcional para emuladores)
- Xcode (solo macOS para iOS)

---

# 📥 Instalación

```bash
git clone https://github.com/mgonzalez0889/todo_seti.git
cd todo_seti
npm install
```

---

# ⚙️ Configuración inicial de Cordova

## Opción 1: usando npx (sin instalación global)

```bash
npx cordova platform add android
```

## Opción 2: usando Cordova global

```bash
cordova platform add android
```

---

# 📱 Ejecutar en Android (modo debug)

## Con npx

```bash
npx cordova run android
```

## Con Cordova global

```bash
cordova run android
```

---

# ⚡ Live Reload (desarrollo)

## Con npx

```bash
npx cordova run android -l --external
```

## Con Cordova global

```bash
cordova run android -l --external
```

---

# 📦 Build APK (debug)

## Con npx

```bash
npx cordova build android
```

## Con Cordova global

```bash
cordova build android
```

---

# 🚀 Build APK (release)

## Con npx

```bash
npx cordova build android --release
```

## Con Cordova global

```bash
cordova build android --release
```

---

# 🔐 Ubicación del APK generado

platforms/android/app/build/outputs/apk/

---

# 📱 Ejecutar APK manual (opcional)

adb install -r platforms/android/app/build/outputs/apk/debug/app-debug.apk

---

# 🧠 Abrir en Android Studio

1. Abrir Android Studio
2. Open Project
3. Seleccionar:
   platforms/android
4. Esperar Gradle sync
5. Run

---

# 📌 Estructura del proyecto (versionado)

Se debe subir:

- src/
- resources/
- config.xml
- package.json
- angular.json
- tsconfig.json
- .gitignore

No subir:

- node_modules/
- platforms/
- plugins/
- www/
- build/

---

# ⚠️ Notas

- Ejecutar `cordova platform add android` la primera vez.
- Ejecutar `cordova build` después de cambios.
- No modificar `platforms/` manualmente.
- Proyecto reproducible desde cero.
