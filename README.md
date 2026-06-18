# TODO-LIST

Proyecto Ionic/Cordova para la aplicación TODO-LIST.

## Repositorio

El código está alojado en GitHub en:

`https://github.com/mgonzalez0889/todo_seti.git`

## Requisitos previos

- Node.js (versión moderna)
- npm
- Cordova CLI instalado globalmente:
  ```bash
  npm install -g cordova
  ```
- Java JDK instalado
- Android SDK instalado y configurado:
  - `ANDROID_HOME` apuntando a tu SDK
  - `ANDROID_SDK_ROOT` opcional
- Android Studio instalado para emuladores y depuración
- Xcode instalado para compilación en iOS (macOS solamente)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/mgonzalez0889/todo_seti.git
   cd todo_app_seti
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

## Android

### Compilar

En la raíz del proyecto:

```bash
npx cordova build android
```

O usando el script ya preparado:

```bash
.\build.bat
```

### Ejecutar en emulador o dispositivo

Si ya tienes un emulador Android activo o un dispositivo conectado:

```bash
adb install -r platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### Abrir en Android Studio

1. Abre Android Studio.
2. Selecciona **Open** o **Open existing project**.
3. Navega a `platforms/android` y abre esa carpeta.
4. Espera a que Gradle sincronice.
5. Ejecuta el proyecto con **Run > Run 'app'** seleccionando un emulador o dispositivo.

## iOS

> Nota: Solo disponible en macOS con Xcode instalado.

### Compilar

```bash
npx cordova build ios
```

### Ejecutar en Xcode

1. Abre `platforms/ios` en Xcode.
2. Selecciona el esquema `App` o el objetivo correcto.
3. Elige un simulador o dispositivo.
4. Presiona el botón de ejecutar.

## Firmar APK de release

Para entregar un build de producción necesitas generar la versión release y firmarla.

```bash
npx cordova build android --release
```

El APK resultante estará en:

```text
platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```

Para publicar en Google Play, firma y alinea el APK con tu keystore.

## Versionado de código

Debes subir al repositorio:

- `src/`
- `resources/`
- `config.xml`
- `package.json`
- `angular.json`
- `tsconfig.json`
- `.gitignore`

No es necesario subir:

- `node_modules/`
- `platforms/`
- `plugins/`
- `www/`
- `.gradle/`
- `build/`

## Notas

- La carpeta `resources/` contiene iconos y splash screens necesarios para Android e iOS.
- Si haces cambios en el código, vuelve a compilar con `npx cordova build android` antes de ejecutar.
- Para Android Studio usa siempre la carpeta `platforms/android`.
