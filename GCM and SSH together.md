Para que Git Credential Manager (GCM) y SSH coexistan sin conflictos en la misma máquina, la clave es entender el protocolo de la URL de tus repositorios. GCM solo maneja conexiones HTTP/HTTPS (donde se usan los Tokens de Acceso Personal o PAT), mientras que SSH maneja exclusivamente URLs que empiezan con git@github.com:.Git detectará automáticamente cuál usar según la URL del repositorio. Aquí tienes los pasos para configurarlos de forma que no interfieran entre sí.Paso 1: Asegurar que GCM ignore las conexiones SSHPor defecto, GCM no interfiere con las conexiones SSH, pero es una buena práctica asegurarte de que Git sepa exactamente qué manejador usar para cada protocolo.Configura tu almacén de credenciales global en GCM (usando secretservice que elegimos antes):bashgit config --global credential.helper manager
Usa el código con precaución.Especifica que use el almacén correcto:bashgit config --global credential.credentialStore secretservice
Usa el código con precaución.Con esto, cualquier repositorio clonado mediante HTTPS (https://github.com...) llamará automáticamente a GCM para pedir tu PAT.Paso 2: Organizar tus repositorios en carpetas (Estrategia recomendada)Para evitar tener que cambiar manualmente el nombre y correo de Git (git config user.name) cada vez que clonas un repositorio nuevo, lo ideal es separar tus cuentas por carpetas en tu máquina. Por ejemplo:~/proyectos/personales/ (Usa tu Cuenta Principal con GCM / HTTPS)~/proyectos/trabajo/ (Usa tu Segunda Cuenta con SSH)Paso 3: Automatizar el comportamiento con "IncludeIf"Puedes configurar Git para que cambie de usuario y método de autenticación automáticamente según la carpeta en la que estés trabajando.Abre tu configuración global de Git:bashnano ~/.gitconfig
Usa el código con precaución.Al final del archivo, agrega estas reglas condicionales:ini# Configuración por defecto para tu cuenta personal (HTTPS / GCM)
[user]
    name = Tu Nombre Personal
    email = tu_correo_personal@example.com

# Si estás dentro de la carpeta de trabajo, aplica esto automáticamente:
[includeIf "gitdir:~/proyectos/trabajo/"]
    path = ~/.gitconfig-trabajo
Usa el código con precaución.Guarda y cierra (Ctrl + O, Enter, Ctrl + X).Paso 4: Crear la configuración exclusiva para la segunda cuenta (SSH)Ahora crearemos el archivo específico para la carpeta de trabajo que anulará la configuración de GCM y aplicará tus datos de SSH de forma transparente.Crea el nuevo archivo de configuración:bashnano ~/.gitconfig-trabajo
Usa el código con precaución.Pega lo siguiente (esto fuerza a Git a usar tu correo de trabajo y el alias SSH que creamos en el paso anterior):ini[user]
    name = Tu Nombre Trabajo
    email = correo_segundo_usuario@example.com

[url "git@github-secundario:"]
    insteadOf = https://github.com
Usa el código con precaución.¿Qué hace la línea insteadOf? Es la magia de la coexistencia. Si estás dentro de la carpeta ~/proyectos/trabajo/ e intentas clonar un repositorio usando una URL HTTPS (por ejemplo, copiándola directamente de la web de GitHub), Git la convertirá automáticamente a una URL SSH usando tu alias seguro. Así no tendrás que recordar modificar la URL a mano y evitarás que GCM intente meterse en esa cuenta.Paso 5: Verificar que todo funcioneEntra a tu carpeta de cuenta principal:bashcd ~/proyectos/personales/
git config user.email
# Debería mostrar tu correo personal
Usa el código con precaución.Entra a tu carpeta de trabajo:bashcd ~/proyectos/trabajo/
git config user.email
# Debería mostrar tu correo de trabajo automáticamente
Usa el código con precaución.A partir de este momento, tus dos entornos convivirán en armonía sin pisarse las credenciales.
