- Se implementa la navegacion del login y la pagina de registro, Non-style.

-Se ha eliminado expo-router y sus carpetas

-Se transfiere el codigo de inicio de sesion a la carpeta screen/profile y se renombra como LoginScreen.tsx.

-En la pagina de registro se propone dividir en dos formularios uno para voluntarios y otro para ONG, se crean dos screens para tal fin. OngRegisterScreen.tsx y UserRegisterScreen.tsx

-El componente AuthComponent.tsx se creo como un screen por lo que este documento debe ser borrado.

-Se crea ejecuta el prebuil para realizar configuracion de dispositivos ANDROID y IOS, 

-Se integra el inicio de sesion con google, dicho servicio se debe configurar con una cuenta que deberia estar con una cuenta del proyecto donde todos tengamos acceso.

-Para completar el inicio de sesion se debe ejecutar el proyecto en modo produccion con https para que google no bloquee la solicitud:
Comand: npx start run:ios
        npx start run:android


--PROPUESTA--

-Redefinir el safe-area-view para la nueva navegacion