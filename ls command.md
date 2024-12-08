`ls -l` -> Listado largo
`ls -lr` -> Ordena alfabeticamente al revés
`ls -ls` -> Organiza por tamaño
`ls -lh` -> Organiza y permite leerse en formato común humano
`ls -lt` -> Ordena por fecha
`ls b*` -> Que muestre todos los ficheros que inicien con `b`
`ls *b` -> Que muestre todos los ficheros que terminen con `b`
`ls *hg*` -> Que muestre todos los ficheros que contengan las letras `hg` en cualquier posición de su nombre
`ls *n*a*` -> Que muestre todos los ficheros que contengan una `n` y una `a` en su nombre
`ls g?` -> Que muestre todos los ficheros que empiecen con una `g` y luego contengan cualquier otro caracter, por cada signo de interrogación más es un caracter
`ls ?p` -> Que muestre todos los ficheros que inicien con cualquier caracter y seguido de una `p`
`ls [afg]*` -> Que muestre todo los ficheros que empiecen con `a f o g` los corchetes significa el operador OR
`ls *[tb]` -> Que muestre todos los ficheros que terminen con `t` o `b`
`ls g*[0-9]` -> Que muestre todo lo que empiece con `g` seguido de cualquier caracter y un número al final del `0` al `9`