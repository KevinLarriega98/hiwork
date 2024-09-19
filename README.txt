- Se implementa la navegación del login y la pagina de registro, Non-style.

-Se ha eliminado expo-router y sus carpetas

-Se transfiere el código de inicio de sesión a la carpeta screen/profile y se renombra como LoginScreen.tsx.

-En la pagina de registro se propone dividir en dos formularios uno para voluntarios y otro para ONG, se crean dos screens para tal fin. OngRegisterScreen.tsx y UserRegisterScreen.tsx

-El componente AuthComponent.tsx se creo como un screen por lo que este documento debe ser borrado.

-Se crea ejecuta el prebuilt para realizar configuración de dispositivos ANDROID y IOS, 

-Se integra el inicio de sesión con google, dicho servicio se debe configurar con una cuenta que debería estar con una cuenta del proyecto donde todos tengamos acceso.

-Para completar el inicio de sesión se debe ejecutar el proyecto en modo producción con https para que google no bloquee la solicitud:
Command: npx start run:ios
        npx start run:android

-se crea un componente RegisterInput.tsx con varios props necesarios para poder funcionar, en llamada del componente se puede hacer (ctrl + space) para mostrar esos props

--PROPUESTA--

-Redefinir el safe-area-view para la nueva navegación


## MARC

--CurrentUser información de la db del usuario logged auth store--
-- User es el auth de firebase --
-- UserType es el tipo de usuario (Voluntario o ONG) --

-- Mirar de poner gifted chat para el chat --